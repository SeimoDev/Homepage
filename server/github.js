import { GITHUB_USERNAME, GITHUB_OWNED_ORGANIZATIONS } from '../src/lib/github-config.js';

const API = 'https://api.github.com';
const LIMIT = 5;

export class GitHubError extends Error {
  constructor(code, retryAfter = 60) {
    super(code);
    this.code = code;
    this.retryAfter = retryAfter;
  }
}

async function request(path, token) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  try {
    const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'Seimo-Homepage' };
    if (token) headers.Authorization = `Bearer ${token}`;
    const response = await fetch(`${API}${path}`, { headers, signal: controller.signal });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const rateLimited = response.status === 429 || (response.status === 403 && (
        response.headers.get('x-ratelimit-remaining') === '0' ||
        response.headers.has('retry-after') || /rate limit/i.test(body.message || '')
      ));
      if (rateLimited) {
        const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000;
        const delay = Number(response.headers.get('retry-after')) || Math.ceil((reset - Date.now()) / 1000);
        throw new GitHubError('GITHUB_RATE_LIMITED', Math.max(60, Number.isFinite(delay) ? delay : 60));
      }
      throw new GitHubError(response.status === 401 ? 'GITHUB_AUTH_ERROR' : 'GITHUB_UNAVAILABLE');
    }
    const data = await response.json();
    if (!Array.isArray(data)) throw new GitHubError('GITHUB_UNAVAILABLE');
    return { data, hasNext: /rel="next"/.test(response.headers.get('link') || '') };
  } catch (error) {
    if (error instanceof GitHubError) throw error;
    throw new GitHubError(error.name === 'AbortError' ? 'GITHUB_TIMEOUT' : 'GITHUB_UNAVAILABLE');
  } finally {
    clearTimeout(timeout);
  }
}

async function listAll(path, token) {
  const items = [];
  for (let page = 1; ; page += 1) {
    const { data, hasNext } = await request(`${path}${path.includes('?') ? '&' : '?'}per_page=100&page=${page}`, token);
    items.push(...data);
    if (!hasNext) return items;
  }
}

export async function fetchLatestRepositories({ token } = {}) {
  const username = encodeURIComponent(GITHUB_USERNAME);
  const organizations = await listAll(`/users/${username}/orgs`, token);
  // Public membership alone does not imply ownership. GitHub calls owners "admin".
  const owned = await Promise.all(organizations.map(async ({ login }) => {
    const owners = await listAll(`/orgs/${encodeURIComponent(login)}/members?role=admin`, token);
    return owners.some((owner) => owner.login.toLowerCase() === GITHUB_USERNAME.toLowerCase()) ? login : null;
  }));
  const orgs = [...new Set([...owned.filter(Boolean), ...GITHUB_OWNED_ORGANIZATIONS].map((org) => org.toLowerCase()))];
  const query = `sort=pushed&direction=desc&per_page=${LIMIT}`;
  const sources = await Promise.all([
    request(`/users/${username}/repos?type=owner&${query}`, token),
    ...orgs.map((org) => request(`/orgs/${encodeURIComponent(org)}/repos?type=public&${query}`, token)),
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
