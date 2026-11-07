import test from 'node:test';
import assert from 'node:assert/strict';
import { fetchLatestRepositories } from './github.js';

async function setup(t, respond) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    const path = String(url).replace('https://api.github.com', '');
    calls.push(path);
    assert.equal(options.headers['User-Agent'], 'Seimo-Homepage');
    return respond(path, options);
  });
  return { fetchLatestRepositories, calls };
}

const json = (data, headers = {}) => new Response(JSON.stringify(data), { headers });
const repo = (id, day, organization = false) => ({
  id,
  name: `project-${id}`,
  private: false,
  owner: { login: organization ? 'OwnedOrg' : 'SeimoDev', type: organization ? 'Organization' : 'User' },
  html_url: `https://github.com/${organization ? 'OwnedOrg' : 'SeimoDev'}/project-${id}`,
  description: null,
  language: 'JavaScript',
  stargazers_count: id,
  pushed_at: `2026-01-${String(day).padStart(2, '0')}T00:00:00Z`,
});

test('merges the global latest five public repos and verifies organization ownership across pages', async (t) => {
  const api = await setup(t, (path) => {
    if (path === '/users/SeimoDev/orgs?per_page=100&page=1') {
      return json([{ login: 'MemberOrg' }], { link: '<https://api.github.com/users/SeimoDev/orgs?per_page=100&page=2>; rel="next"' });
    }
    if (path === '/users/SeimoDev/orgs?per_page=100&page=2') return json([{ login: 'OwnedOrg' }]);
    if (path === '/orgs/MemberOrg/members?role=admin&per_page=100&page=1') return json([{ login: 'SomeoneElse' }]);
    if (path === '/orgs/OwnedOrg/members?role=admin&per_page=100&page=1') {
      return json([{ login: 'OtherOwner' }], { link: '<https://api.github.com/orgs/OwnedOrg/members?role=admin&per_page=100&page=2>; rel="next"' });
    }
    if (path === '/orgs/OwnedOrg/members?role=admin&per_page=100&page=2') return json([{ login: 'seimodev' }]);
    if (path === '/users/SeimoDev/repos?type=owner&sort=pushed&direction=desc&per_page=5') {
      return json([repo(5, 9), repo(4, 7), repo(3, 5), repo(2, 3), repo(1, 1)]);
    }
    if (path === '/orgs/ownedorg/repos?type=public&sort=pushed&direction=desc&per_page=5') {
      return json([repo(10, 10, true), repo(9, 8, true), repo(8, 6, true), repo(7, 4, true), repo(6, 2, true)]);
    }
    assert.fail(`Unexpected GitHub request: ${path}`);
  });
  const repositories = await api.fetchLatestRepositories();
  assert.deepEqual(repositories.map((item) => item.id), [10, 5, 9, 4, 8]);
  assert.equal(repositories[0].organization, true);
  assert.equal(repositories[1].organization, false);
  assert.ok(!api.calls.some((path) => path.startsWith('/orgs/memberorg/repos')));
});

test('filters private results, deduplicates repositories, and keeps public forks', async (t) => {
  const api = await setup(t, (path) => path.includes('/orgs?') ? json([]) : json([
    { ...repo(1, 1), fork: true }, repo(1, 1), { ...repo(2, 2), private: true }, repo(3, 3),
  ]));
  assert.deepEqual((await api.fetchLatestRepositories()).map((item) => item.id), [3, 1]);
});

test('uses the server token only for GitHub requests and returns public fields', async (t) => {
  const secret = 'test-server-only-credential';
  const api = await setup(t, (path, options) => {
    assert.equal(options.headers.Authorization, 'Bearer ' + secret);
    return path.includes('/orgs?') ? json([]) : json([repo(1, 1)]);
  });
  const repositories = await api.fetchLatestRepositories({ token: secret });
  assert.equal(repositories.length, 1);
  assert.ok(!JSON.stringify(repositories).includes(secret));
});

test('distinguishes GitHub rate limits from invalid credentials', async (t) => {
  let status = 403;
  const api = await setup(t, () => new Response(JSON.stringify({ message: 'API rate limit exceeded' }), {
    status,
    headers: status === 403 ? { 'x-ratelimit-remaining': '0', 'retry-after': '300' } : {},
  }));
  await assert.rejects(api.fetchLatestRepositories(), error => error.code === 'GITHUB_RATE_LIMITED' && error.retryAfter === 300);
  status = 401;
  await assert.rejects(api.fetchLatestRepositories(), error => error.code === 'GITHUB_AUTH_ERROR');
});
