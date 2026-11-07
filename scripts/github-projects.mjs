import { configuredRepositories, selectProjects } from '../src/lib/projects.js';

export async function syncProjects({ urls, cached = [], token, request = fetch }) {
  const selected = configuredRepositories(urls);
  const previous = selectProjects(urls, cached);
  const warnings = [];
  const repositories = await Promise.all(selected.map(async (repo, index) => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'Seimo-Homepage' };
      if (token) headers.Authorization = `Bearer ${token}`;
      const response = await request(`https://api.github.com/repos/${repo.owner}/${repo.name}`, {
        headers, signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      if (data.private !== false || !data.owner?.login || !data.name || !data.html_url) {
        throw new Error('Repository metadata is unavailable or not public');
      }
      return {
        id: data.id,
        name: data.name,
        owner: data.owner.login,
        organization: data.owner.type === 'Organization',
        url: data.html_url,
        sourceUrl: repo.url,
        description: data.description,
        language: data.language,
        stars: data.stargazers_count,
        pushedAt: data.pushed_at || data.created_at,
        fetchedAt: Date.now(),
      };
    } catch (error) {
      const reason = error.name === 'AbortError' ? 'timeout'
        : /^HTTP \d{3}$/.test(error.message) ? error.message : 'metadata unavailable';
      warnings.push(`${repo.owner}/${repo.name}: ${reason}`);
      return previous[index];
    } finally {
      clearTimeout(timeout);
    }
  }));
  return { repositories, warnings };
}
