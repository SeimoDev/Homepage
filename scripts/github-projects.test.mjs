import test from 'node:test';
import assert from 'node:assert/strict';
import { syncProjects } from './github-projects.mjs';

const metadata = (owner, name, organization = false) => ({
  id: `${owner}/${name}`,
  owner: { login: owner, type: organization ? 'Organization' : 'User' },
  name,
  html_url: `https://github.com/${owner}/${name}`,
  private: false,
  description: 'Public project',
  language: 'JavaScript',
  stargazers_count: 12,
  pushed_at: '2026-11-07T00:00:00Z',
});

test('fetches only configured URLs and embeds public metadata in the configured order', async () => {
  const calls = [];
  const result = await syncProjects({
    urls: ['https://github.com/org/second', 'https://github.com/user/first'],
    token: 'test-build-only-secret',
    request: async (url, options) => {
      calls.push(url);
      assert.equal(options.headers.Authorization, 'Bearer test-build-only-secret');
      assert.equal(options.headers['User-Agent'], 'Seimo-Homepage');
      const [owner, name] = new URL(url).pathname.split('/').slice(2);
      return Response.json(metadata(owner, name, owner === 'org'));
    },
  });
  assert.deepEqual(calls, ['https://api.github.com/repos/org/second', 'https://api.github.com/repos/user/first']);
  assert.deepEqual(result.repositories.map((repo) => repo.name), ['second', 'first']);
  assert.equal(result.repositories[0].organization, true);
  assert.deepEqual(result.warnings, []);
  assert.ok(!JSON.stringify(result).includes('test-build-only-secret'));
});

test('a GitHub rate limit preserves saved metadata and does not fail the static build', async () => {
  const saved = { id: 1, url: 'https://github.com/user/project', description: 'Saved description', stars: 8 };
  const result = await syncProjects({
    urls: [saved.url], cached: [saved], request: async () => new Response('{}', { status: 403 }),
  });
  assert.equal(result.repositories[0].description, saved.description);
  assert.equal(result.repositories[0].stars, 8);
  assert.equal(result.warnings.length, 1);
});

test('a new configured URL stays usable when GitHub cannot be reached', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/new'], request: async () => { throw new TypeError('fetch failed'); },
  });
  assert.equal(result.repositories[0].url, 'https://github.com/owner/new');
  assert.equal(result.repositories[0].metadataUnavailable, true);
  assert.equal(result.repositories[0].stars, null);
});

test('never embeds private repository details even when the build token can read them', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/private'],
    request: async () => Response.json({ ...metadata('owner', 'private'), private: true, description: 'private details' }),
  });
  assert.ok(!JSON.stringify(result.repositories).includes('private details'));
  assert.equal(result.repositories[0].metadataUnavailable, true);
});

test('invalid configuration fails before any network request', async () => {
  await assert.rejects(syncProjects({
    urls: ['https://example.com/owner/project'], request: () => { assert.fail('No network request expected'); },
  }), /Expected https:\/\/github.com/);
});

test('network diagnostics never expose the build credential', async () => {
  const secret = 'test-only-build-secret';
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'], token: secret,
    request: async () => { throw new Error(`Invalid header: Bearer ${secret}`); },
  });
  assert.ok(!JSON.stringify(result).includes(secret));
});
