import test from 'node:test';
import assert from 'node:assert/strict';
import { createRepositoryHandler } from './github-repos.js';
import { GitHubError } from './github.js';

const repositories = [{ id: 1, name: 'Homepage' }];
const request = (suffix = '') => new Request(`https://seimo.cn/api/github-repos${suffix}`);

function edge(t) {
  let time = Date.now();
  const storage = new Map();
  const previous = Object.getOwnPropertyDescriptor(globalThis, 'caches');
  Object.defineProperty(globalThis, 'caches', {
    configurable: true,
    value: { default: {
      async match(key) {
        const entry = storage.get(key.url);
        return entry && entry.expires > time ? entry.response.clone() : undefined;
      },
      async put(key, response) {
        const ttl = Number(response.headers.get('cache-control').match(/max-age=(\d+)/)[1]);
        storage.set(key.url, { response: response.clone(), expires: time + ttl * 1000 });
      },
    } },
  });
  t.after(() => {
    if (previous) Object.defineProperty(globalThis, 'caches', previous);
    else delete globalThis.caches;
  });
  return { now: () => time, advance: (milliseconds) => { time += milliseconds; } };
}

test('shares successful data through the edge cache across Function instances', async (t) => {
  const clock = edge(t);
  let calls = 0;
  const load = async ({ token }) => {
    calls += 1;
    assert.equal(token, 'server-only-secret');
    return repositories;
  };
  const first = createRepositoryHandler({ load, now: clock.now });
  const response = await first(request(), { GITHUB_TOKEN: 'server-only-secret' });
  assert.equal(response.headers.get('X-Repository-Cache'), 'MISS');
  assert.ok(!(await response.text()).includes('server-only-secret'));
  const second = createRepositoryHandler({ load, now: clock.now });
  const cached = await second(request('?refresh=random'), { GITHUB_TOKEN: 'server-only-secret' });
  assert.equal(cached.headers.get('X-Repository-Cache'), 'HIT');
  assert.deepEqual((await cached.json()).repositories, repositories);
  assert.equal(calls, 1);
});

test('serves cached data when GitHub fails after the freshness window', async (t) => {
  const clock = edge(t);
  const warm = createRepositoryHandler({ load: async () => repositories, now: clock.now });
  await warm(request());
  clock.advance(16 * 60 * 1000);
  let calls = 0;
  const load = async () => { calls += 1; throw new GitHubError('GITHUB_RATE_LIMITED', 300); };
  const cold = createRepositoryHandler({ load, now: clock.now });
  const response = await cold(request());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('X-Repository-Cache'), 'STALE');
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  const data = await response.json();
  assert.equal(data.stale, true);
  assert.deepEqual(data.repositories, repositories);
  const another = createRepositoryHandler({ load, now: clock.now });
  assert.equal((await another(request())).status, 200);
  assert.equal(calls, 1);
});

test('backs off rate-limited requests across cold instances and recovers after reset', async (t) => {
  const clock = edge(t);
  let calls = 0;
  let limited = true;
  const load = async () => {
    calls += 1;
    if (limited) throw new GitHubError('GITHUB_RATE_LIMITED', 300);
    return repositories;
  };
  const first = createRepositoryHandler({ load, now: clock.now });
  const response = await first(request());
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('Retry-After'), '300');
  assert.equal((await response.json()).code, 'GITHUB_RATE_LIMITED');
  const second = createRepositoryHandler({ load, now: clock.now });
  assert.equal((await second(request('?retry=1'))).status, 503);
  assert.equal(calls, 1);
  clock.advance(301000);
  limited = false;
  assert.equal((await second(request())).status, 200);
  assert.equal(calls, 2);
});

test('never serves snapshots older than the retention window', async (t) => {
  const clock = edge(t);
  let failed = false;
  const handle = createRepositoryHandler({ now: clock.now, load: async () => {
    if (failed) throw new GitHubError('GITHUB_UNAVAILABLE');
    return repositories;
  } });
  await handle(request());
  clock.advance(25 * 60 * 60 * 1000);
  failed = true;
  assert.equal((await handle(request())).status, 503);
});

test('a deployment with a token does not inherit an anonymous rate-limit cooldown', async (t) => {
  const clock = edge(t);
  const load = async ({ token }) => {
    if (!token) throw new GitHubError('GITHUB_RATE_LIMITED', 3600);
    return repositories;
  };
  const anonymous = createRepositoryHandler({ load, now: clock.now });
  assert.equal((await anonymous(request())).status, 503);
  const authenticated = createRepositoryHandler({ load, now: clock.now });
  assert.equal((await authenticated(request(), { GITHUB_TOKEN: 'server-only-secret' })).status, 200);
});

test('rejects other methods without calling GitHub', async () => {
  const handle = createRepositoryHandler({ load: async () => { assert.fail('Must not call GitHub'); } });
  const response = await handle(new Request(request().url, { method: 'POST' }));
  assert.equal(response.status, 405);
  assert.equal(response.headers.get('Allow'), 'GET');
});
