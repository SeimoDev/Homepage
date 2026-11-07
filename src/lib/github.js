import { GITHUB_USERNAME, GITHUB_OWNED_ORGANIZATIONS } from './github-config.js';

export { GITHUB_USERNAME, GITHUB_OWNED_ORGANIZATIONS };

const API = `${import.meta.env?.BASE_URL || '/'}api/github-repos`;
const CACHE_TTL = 15 * 60 * 1000;
const CACHE_KEY = `seimo.github-repos.v2:${GITHUB_USERNAME}:${GITHUB_OWNED_ORGANIZATIONS.join(',')}`;
let pending;

export function readRepositoryCache() {
  try {
    const cache = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (Number.isFinite(cache?.savedAt) && Array.isArray(cache.repositories)) return cache;
  } catch {}
  return null;
}

async function fetchRepositories() {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000);
  try {
    const response = await fetch(API, { signal: controller.signal });
    // Pages' SPA fallback returns index.html with status 200 if Functions are missing.
    if (!response.headers.get('content-type')?.includes('application/json')) {
      throw Object.assign(new Error('Repository endpoint is not deployed'), { code: 'ENDPOINT_UNAVAILABLE' });
    }
    const data = await response.json();
    if (!response.ok) throw Object.assign(new Error(data.code || 'Repository service unavailable'), { code: data.code });
    if (!Array.isArray(data.repositories)) throw new Error('Invalid repository response');
    return data;
  } catch (error) {
    if (error.code) throw error;
    throw Object.assign(error, { code: 'NETWORK_ERROR' });
  } finally {
    clearTimeout(timeout);
  }
}

export async function loadLatestRepositories(force = false) {
  const cache = readRepositoryCache();
  if (!force && cache && Date.now() - cache.savedAt < CACHE_TTL) return cache.repositories;
  // Share the request across React StrictMode's effect replay.
  if (!pending) {
    pending = fetchRepositories().then(({ repositories, stale, updatedAt }) => {
      try {
        // A stale server snapshot stays stale locally so a later visit can refresh it.
        const savedAt = stale ? Math.min(updatedAt || 0, Date.now() - CACHE_TTL) : Date.now();
        localStorage.setItem(CACHE_KEY, JSON.stringify({ repositories, savedAt }));
      } catch {}
      return repositories;
    }).finally(() => { pending = null; });
  }
  return pending;
}
