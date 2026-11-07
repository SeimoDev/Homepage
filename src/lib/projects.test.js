import test from 'node:test';
import assert from 'node:assert/strict';
import { configuredRepositories, parseRepositoryUrl, selectProjects } from './projects.js';

test('keeps configured order and all configured projects, without a latest-five limit', () => {
  const urls = Array.from({ length: 7 }, (_, index) => `https://github.com/owner/repo-${7 - index}`);
  const saved = [...urls].reverse().map((url, id) => ({ id, url, description: `Saved ${id}` }));
  saved.push({ id: 100, url: 'https://github.com/owner/unselected' });
  const projects = selectProjects(urls, saved);
  assert.equal(projects.length, 7);
  assert.deepEqual(projects.map((repo) => repo.url), urls);
  assert.ok(projects.every((repo) => repo.description.startsWith('Saved')));
});

test('normalizes clone URLs and deduplicates repository names case-insensitively', () => {
  const repos = configuredRepositories([
    'https://github.com/SeimoDev/Homepage.git/',
    'https://github.com/seimodev/homepage?tab=readme-ov-file',
    'https://github.com/WorkWorkLabs/another-project',
  ]);
  assert.equal(repos.length, 2);
  assert.equal(repos[0].url, 'https://github.com/SeimoDev/Homepage');
  assert.equal(repos[1].owner, 'WorkWorkLabs');
});

test('rejects non-repository URLs before fetching or rendering', () => {
  for (const url of ['javascript:alert(1)', 'https://example.com/a/b', 'https://github.com/owner',
    'https://github.com/owner/repo/tree/main', 'https://token@github.com/owner/repo']) {
    assert.throws(() => parseRepositoryUrl(url));
  }
  assert.throws(() => configuredRepositories(null));
});

test('an uncached URL still renders a usable link without invented metadata', () => {
  const [repo] = selectProjects(['https://github.com/WorkWorkLabs/example']);
  assert.equal(repo.name, 'example');
  assert.equal(repo.owner, 'WorkWorkLabs');
  assert.equal(repo.url, 'https://github.com/WorkWorkLabs/example');
  assert.equal(repo.metadataUnavailable, true);
  assert.equal(repo.stars, null);
  assert.equal(repo.pushedAt, null);
  assert.equal(repo.organization, null);
});

test('an empty configuration produces no project cards', () => {
  assert.deepEqual(selectProjects([], [{ url: 'https://github.com/owner/old' }]), []);
});
