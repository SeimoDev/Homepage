import { fetchLatestRepositories } from './github.js';

const FRESH_TTL = 15 * 60 * 1000;
const STALE_TTL = 24 * 60 * 60 * 1000;

function json(body, status = 200, headers = {}) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store', ...headers },
  });
}

export function createRepositoryHandler({ load = fetchLatestRepositories, now = Date.now } = {}) {
  // The edge cache is shared by visitors in a Cloudflare data center. Memory also
  // supports Vite locally and keeps serving data if cache storage is unavailable.
  let memory;
  let cooldown;

  return async function handleRepositories(request, env = {}, context = {}) {
    if (request.method !== 'GET') return json({ code: 'METHOD_NOT_ALLOWED' }, 405, { Allow: 'GET' });
    const cache = globalThis.caches?.default;
    const cacheUrl = new URL('/api/github-repos', request.url);
    // Adding a server token must not inherit an anonymous request's cooldown.
    cacheUrl.search = `?cache=v2&auth=${env.GITHUB_TOKEN ? '1' : '0'}`;
    const cacheKey = new Request(cacheUrl);
    const cooldownKey = new Request(`${cacheUrl}&cooldown=1`);
    let snapshot = memory;
    try {
      const stored = await cache?.match(cacheKey);
      if (stored) snapshot = await stored.json();
      const limited = await cache?.match(cooldownKey);
      if (limited) cooldown = await limited.json();
    } catch {}

    if (snapshot && now() - snapshot.updatedAt > STALE_TTL) snapshot = null;
    function success(stale) {
      return json({ ...snapshot, stale }, 200, {
        'Cache-Control': stale ? 'no-store' : 'public, max-age=60',
        'X-Repository-Cache': stale ? 'STALE' : 'HIT',
      });
    }
    if (snapshot && now() - snapshot.updatedAt < FRESH_TTL) return success(false);
    if (cooldown?.until > now()) {
      if (snapshot) return success(true);
      return json({ code: cooldown.code, retryAt: cooldown.until }, 503, {
        'Retry-After': String(Math.ceil((cooldown.until - now()) / 1000)),
      });
    }

    function store(key, value, ttl) {
      if (!cache) return;
      const operation = cache.put(key, json(value, 200, { 'Cache-Control': `public, max-age=${ttl}` })).catch(() => {});
      if (context.waitUntil) context.waitUntil(operation);
      return operation;
    }

    try {
      const repositories = await load({ token: env.GITHUB_TOKEN });
      snapshot = { repositories, updatedAt: now() };
      memory = snapshot;
      cooldown = null;
      await store(cacheKey, snapshot, STALE_TTL / 1000);
      return json({ ...snapshot, stale: false }, 200, {
        'Cache-Control': 'public, max-age=60',
        'X-Repository-Cache': 'MISS',
      });
    } catch (error) {
      const delay = Math.max(60, Math.min(3600, Number(error.retryAfter) || 60));
      const code = ['GITHUB_RATE_LIMITED', 'GITHUB_AUTH_ERROR', 'GITHUB_TIMEOUT'].includes(error.code)
        ? error.code : 'GITHUB_UNAVAILABLE';
      cooldown = { code, until: now() + delay * 1000 };
      await store(cooldownKey, cooldown, delay);
      if (snapshot) return success(true);
      return json({ code, retryAt: cooldown.until }, 503, { 'Retry-After': String(delay) });
    }
  };
}

export const handleRepositories = createRepositoryHandler();
