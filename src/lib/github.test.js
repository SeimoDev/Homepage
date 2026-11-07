import test from 'node:test';
import assert from 'node:assert/strict';

let moduleId = 0;

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
  t.mock.method(globalThis, 'fetch', async (url) => {
    const path = String(url).replace('https://api.github.com', '');
    calls.push(path);
    return respond(path);
  });
  const github = await import(`./github.js?test=${++moduleId}`);
  return { ...github, storage, calls };
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
  const repositories = await api.loadLatestRepositories();
  assert.deepEqual(repositories.map((item) => item.id), [10, 5, 9, 4, 8]);
  assert.equal(repositories[0].organization, true);
  assert.equal(repositories[1].organization, false);
  assert.ok(!api.calls.some((path) => path.startsWith('/orgs/memberorg/repos')));
  assert.deepEqual(api.readRepositoryCache().repositories, repositories);
});

test('filters private results, deduplicates repositories, and keeps public forks', async (t) => {
  const api = await setup(t, (path) => path.includes('/orgs?') ? json([]) : json([
    { ...repo(1, 1), fork: true }, repo(1, 1), { ...repo(2, 2), private: true }, repo(3, 3),
  ]));
  assert.deepEqual((await api.loadLatestRepositories()).map((item) => item.id), [3, 1]);
});

test('shares concurrent loads, uses fresh cache, and refreshes expired cache', async (t) => {
  const api = await setup(t, (path) => path.includes('/orgs?') ? json([]) : json([repo(1, 1)]));
  const [first, second] = await Promise.all([api.loadLatestRepositories(), api.loadLatestRepositories()]);
  assert.deepEqual(first, second);
  assert.equal(api.calls.length, 2);
  await api.loadLatestRepositories();
  assert.equal(api.calls.length, 2);
  const [key, value] = [...api.storage.entries()][0];
  api.storage.set(key, JSON.stringify({ ...JSON.parse(value), savedAt: Date.now() - 16 * 60 * 1000 }));
  await api.loadLatestRepositories();
  assert.equal(api.calls.length, 4);
});

test('keeps the last successful cache on rate limits and allows retry', async (t) => {
  let limited = false;
  const api = await setup(t, (path) => limited
    ? new Response('{}', { status: 403 })
    : path.includes('/orgs?') ? json([]) : json([repo(1, 1)]));
  const repositories = await api.loadLatestRepositories();
  limited = true;
  await assert.rejects(api.loadLatestRepositories(true), /GitHub API: 403/);
  assert.deepEqual(api.readRepositoryCache().repositories, repositories);
  limited = false;
  assert.deepEqual(await api.loadLatestRepositories(true), repositories);
});

test('still loads repositories when browser storage is unavailable', async (t) => {
  const api = await setup(t, (path) => path.includes('/orgs?') ? json([]) : json([repo(1, 1)]));
  globalThis.localStorage.getItem = () => { throw new Error('Storage blocked'); };
  globalThis.localStorage.setItem = () => { throw new Error('Storage blocked'); };
  assert.deepEqual((await api.loadLatestRepositories()).map((item) => item.id), [1]);
});
