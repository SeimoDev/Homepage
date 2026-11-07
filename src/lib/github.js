export const GITHUB_USERNAME = 'SeimoDev';

// Add owned organizations here if your membership is hidden on GitHub.
export const GITHUB_OWNED_ORGANIZATIONS = [];

const API = 'https://api.github.com';
const LIMIT = 5;
const CACHE_TTL = 15 * 60 * 1000;
const CACHE_KEY = `seimo.github-repos.v1:${GITHUB_USERNAME}:${GITHUB_OWNED_ORGANIZATIONS.join(',')}`;
let pending;

async function request(path) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`${API}${path}`, {
      headers: { Accept: 'application/vnd.github+json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`GitHub API: ${response.status}`);
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error('Invalid GitHub response');
    return { data, hasNext: /rel="next"/.test(response.headers.get('link') || '') };
  } finally {
    clearTimeout(timeout);
  }
}

async function listAll(path) {
  const items = [];
  for (let page = 1; ; page += 1) {
    const { data, hasNext } = await request(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`);
    items.push(...data);
    if (!hasNext) return items;
  }
}

export function readRepositoryCache() {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (Number.isFinite(cache?.savedAt) && Array.isArray(cache.repositories)) return cache;
  } catch {}
  return null;
}

async function fetchRepositories() {
  const username = encodeURIComponent(GITHUB_USERNAME);
  const organizations = await listAll(`/users/${username}/orgs`);
  // Public membership alone does not imply ownership. GitHub calls owners "admin".
  const owned = await Promise.all(organizations.map(async ({ login }) => {
    const owners = await listAll(`/orgs/${encodeURIComponent(login)}/members?role=admin`);
    return owners.some((owner) => owner.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()) ? login : null;
  }));
  const orgs = [...new Set([...owned.filter(Boolean), ...GITHUB_OWNED_ORGANIZATIONS].map((org) => org.toLowerCase()))];
  const query = `sort=pushed&direction=desc&per_page=${LIMIT}`;
  const sources = await Promise.all([
    request(`/users/${username}/repos?type=owner&${query}`),
    ...orgs.map((org) => request(`/orgs/${encodeURIComponent(org)}/repos?type=public&${query}`)),
  ]);
  const unique = new Map();
  for (const repo of sources.flatMap(({ data }) => data)) {
    if (repo.private !== false) continue;
    unique.set(repo.id, {
      id: repo.id,
      name: repo.name,
      owner: repo.owner.login,
      organization: repo.owner.type === 'Organization',
      url: repo.html_url,
      description: repo.description,
      language: repo.language,
      stars: repo.stargazers_count,
      pushedAt: repo.pushed_at || repo.created_at,
    });
  }
  return [...unique.values()]
    .sort((a, b) => Date.parse(b.pushedAt) - Date.parse(a.pushedAt) || a.id - b.id)
    .slice(0, LIMIT);
}

export async function loadLatestRepositories(force = false) {
  const cache = readRepositoryCache();
  if (!force && cache && Date.now() - cache.savedAt < CACHE_TTL) return cache.repositories;
  // Share the request across React StrictMode's effect replay.
  if (!pending) {
    pending = fetchRepositories().then((repositories) => {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ repositories, savedAt: Date.now() }));
      } catch {}
      return repositories;
    }).finally(() => { pending = null; });
  }
  return pending;
}
