import test from 'node:test';
import assert from 'node:assert/strict';

let moduleId = 0;
const repository = { id: 1, name: 'Homepage' };
const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status, headers: { 'Content-Type': 'application/json' },
});

async function setup(t, respond) {
  const storage = new Map();
  const previousStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key) => storage.get(key) ?? null,
      setItem: (key, value) => storage.set(key, value),
    },
  });
  t.after(() => {
    if (previousStorage) Object.defineProperty(globalThis, 'localStorage', previousStorage);
    else delete globalThis.localStorage;
  });
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push(url);
    assert.equal(url, '/api/github-repos');
    assert.equal(options.headers, undefined);
    return respond(url);
  });
  const github = await import(`./github.js?test=${++moduleId}`);
  return { ...github, storage, calls };
}

test('requests only the same-origin endpoint and shares concurrent browser loads', async (t) => {
  const api = await setup(t, () => json({ repositories: [repository], stale: false }));
  const [first, second] = await Promise.all([api.loadLatestRepositories(), api.loadLatestRepositories()]);
  assert.deepEqual(first, [repository]);
  assert.deepEqual(second, first);
  assert.equal(api.calls.length, 1);
  await api.loadLatestRepositories();
  assert.equal(api.calls.length, 1);
  const [key, value] = [...api.storage.entries()][0];
  api.storage.set(key, JSON.stringify({ ...JSON.parse(value), savedAt: Date.now() - 16 * 60 * 1000 }));
  await api.loadLatestRepositories();
  assert.equal(api.calls.length, 2);
});

test('keeps the browser cache on rate limits and propagates the reason for the UI', async (t) => {
  let limited = false;
  const api = await setup(t, () => limited ? json({ code: 'GITHUB_RATE_LIMITED' }, 503)
    : json({ repositories: [repository] }));
  const repositories = await api.loadLatestRepositories();
  limited = true;
  await assert.rejects(api.loadLatestRepositories(true), error => error.code === 'GITHUB_RATE_LIMITED');
  assert.deepEqual(api.readRepositoryCache().repositories, repositories);
  limited = false;
  assert.deepEqual(await api.loadLatestRepositories(true), repositories);
});

test('detects Pages returning the SPA HTML when the Function is missing', async (t) => {
  const api = await setup(t, () => new Response('<html>Homepage</html>', { headers: { 'Content-Type': 'text/html' } }));
  await assert.rejects(api.loadLatestRepositories(), error => error.code === 'ENDPOINT_UNAVAILABLE');
});

test('does not turn a stale server snapshot into fresh browser data', async (t) => {
  const api = await setup(t, () => json({ repositories: [repository], stale: true, updatedAt: Date.now() - 3600000 }));
  await api.loadLatestRepositories();
  assert.ok(Date.now() - api.readRepositoryCache().savedAt >= 3600000);
  await api.loadLatestRepositories();
  assert.equal(api.calls.length, 2);
});

test('still loads when browser storage is unavailable', async (t) => {
  const api = await setup(t, () => json({ repositories: [repository] }));
  globalThis.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  globalThis.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  assert.deepEqual(await api.loadLatestRepositories(), [repository]);
});
