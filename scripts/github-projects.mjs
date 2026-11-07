import { configuredRepositories, selectProjects } from '../src/lib/projects.js';
import { plainDescription, firstReadmeParagraph } from './project-description.mjs';

function failureReason(error) {
  return error.name === 'AbortError' ? 'timeout'
    : /^HTTP \d{3}$/.test(error.message) ? error.message : 'metadata unavailable';
}

async function readmeDescription(repo, headers, request, useApi = true) {
  const raw = `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/HEAD/`;
  const sources = [
    ...(useApi ? [`https://api.github.com/repos/${repo.owner}/${repo.name}/readme`] : []),
    `${raw}README.md`, `${raw}readme.md`, `${raw}README`,
  ];
  let failure;
  for (const url of sources) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);
    try {
      const response = await request(url, {
        // Raw fallback is public-only and never receives the build credential.
        headers: url.startsWith('https://api.github.com/')
          ? { ...headers, Accept: 'application/vnd.github.raw+json' }
          : { Accept: 'text/plain', 'User-Agent': 'Seimo-Homepage' },
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return firstReadmeParagraph(await response.text());
    } catch (error) {
      failure = error;
    } finally {
      clearTimeout(timeout);
    }
  }
  throw failure;
}

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
        throw Object.assign(new Error('Repository metadata is unavailable or not public'), { code: 'NOT_PUBLIC' });
      }
      let description = plainDescription(data.description);
      let descriptionSource = description ? 'repository' : null;
      if (!description) {
        try {
          description = await readmeDescription(repo, headers, request);
          if (description) descriptionSource = 'readme';
        } catch (error) {
          warnings.push(`${repo.owner}/${repo.name} README: ${failureReason(error)}`);
          description = plainDescription(previous[index].description);
          if (description) descriptionSource = previous[index].descriptionSource || 'cached';
        }
      }
      return {
        id: data.id,
        name: data.name,
        owner: data.owner.login,
        organization: data.owner.type === 'Organization',
        url: data.html_url,
        sourceUrl: repo.url,
        description: description || null,
        descriptionSource,
        language: data.language,
        stars: data.stargazers_count,
        pushedAt: data.pushed_at || data.created_at,
        fetchedAt: Date.now(),
      };
    } catch (error) {
      warnings.push(`${repo.owner}/${repo.name}: ${failureReason(error)}`);
      const fallback = { ...previous[index], description: plainDescription(previous[index].description) || null };
      if ((!fallback.description || fallback.descriptionSource === 'readme') && error.code !== 'NOT_PUBLIC') {
        try {
          fallback.description = await readmeDescription(repo, {}, request, false) || null;
          if (fallback.description) fallback.descriptionSource = 'readme';
        } catch (readmeError) {
          warnings.push(`${repo.owner}/${repo.name} README: ${failureReason(readmeError)}`);
        }
      }
      return fallback;
    } finally {
      clearTimeout(timeout);
    }
  }));
  return { repositories, warnings };
}
