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

test('an empty repository description falls back to the first README paragraph as plain text', async () => {
  const calls = [];
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'], token: 'readme-test-secret',
    request: async (url, options) => {
      calls.push(url);
      assert.equal(options.headers.Authorization, 'Bearer readme-test-secret');
      if (url.endsWith('/readme')) {
        assert.equal(options.headers.Accept, 'application/vnd.github.raw+json');
        return new Response('# Project\n\n![Build](badge.svg)\n\nA **useful** [project](https://example.com).\n\nSecond paragraph.');
      }
      return Response.json({ ...metadata('owner', 'project'), description: '  \n ' });
    },
  });
  assert.equal(calls.length, 2);
  assert.equal(result.repositories[0].description, 'A useful project.');
  assert.equal(result.repositories[0].descriptionSource, 'readme');
  assert.deepEqual(result.warnings, []);
});

test('a repository introduction takes priority and does not fetch its README', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'],
    request: async (url) => {
      assert.ok(!url.endsWith('/readme'));
      return Response.json({ ...metadata('owner', 'project'), description: '**Repository** <b>introduction</b> &amp; details.' });
    },
  });
  assert.equal(result.repositories[0].description, 'Repository introduction & details.');
  assert.equal(result.repositories[0].descriptionSource, 'repository');
});

test('README failures keep the saved introduction and the newly fetched repository metadata', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'],
    cached: [{ url: 'https://github.com/owner/project', description: '**Saved** introduction', stars: 8 }],
    request: async (url) => url.endsWith('/readme') || url.startsWith('https://raw.githubusercontent.com/') ? new Response('{}', { status: 403 })
      : Response.json({ ...metadata('owner', 'project'), description: null }),
  });
  assert.equal(result.repositories[0].description, 'Saved introduction');
  assert.equal(result.repositories[0].stars, 12);
  assert.equal(result.warnings.length, 1);
});

test('a missing README still embeds the project and its metadata', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'],
    request: async (url) => url.endsWith('/readme') || url.startsWith('https://raw.githubusercontent.com/') ? new Response('{}', { status: 404 })
      : Response.json({ ...metadata('owner', 'project'), description: null }),
  });
  assert.equal(result.repositories[0].name, 'project');
  assert.equal(result.repositories[0].description, null);
  assert.equal(result.repositories[0].stars, 12);
});

test('a rate-limited metadata API can still embed a public README introduction', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'], token: 'build-only-secret',
    request: async (url, options) => {
      if (url.startsWith('https://api.github.com/')) return new Response('{}', { status: 403 });
      assert.equal(options.headers.Authorization, undefined);
      assert.equal(url, 'https://raw.githubusercontent.com/owner/project/HEAD/README.md');
      return new Response('# Project\n\nPublic **README** introduction.');
    },
  });
  assert.equal(result.repositories[0].description, 'Public README introduction.');
  assert.equal(result.repositories[0].descriptionSource, 'readme');
});

test('the public README fallback handles lowercase filenames without forwarding credentials', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'], token: 'build-only-secret',
    request: async (url, options) => {
      if (url.endsWith('/readme')) return new Response('{}', { status: 403 });
      if (url.endsWith('/README.md')) return new Response('Not Found', { status: 404 });
      if (url.endsWith('/readme.md')) {
        assert.equal(options.headers.Authorization, undefined);
        return new Response('# Project\n\nThe lowercase README.');
      }
      return Response.json({ ...metadata('owner', 'project'), description: null });
    },
  });
  assert.equal(result.repositories[0].description, 'The lowercase README.');
});

test('a saved README introduction can refresh even while the metadata API is limited', async () => {
  const result = await syncProjects({
    urls: ['https://github.com/owner/project'],
    cached: [{ url: 'https://github.com/owner/project', description: 'Old introduction', descriptionSource: 'readme' }],
    request: async (url) => url.startsWith('https://api.github.com/') ? new Response('{}', { status: 403 })
      : new Response('# Project\n\nUpdated **README** introduction.'),
  });
  assert.equal(result.repositories[0].description, 'Updated README introduction.');
});
