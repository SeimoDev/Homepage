export function parseRepositoryUrl(value) {
  let url;
  try { url = new URL(value); } catch { throw new Error(`Invalid GitHub repository URL: ${value}`); }
  const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
  if (url.protocol !== 'https:' || url.hostname !== 'github.com' || url.port || url.username || url.password ||
      parts.length !== 2 || !/^[a-z\d-]+$/i.test(parts[0]) || !/^[a-z\d_.-]+$/i.test(parts[1])) {
    throw new Error(`Expected https://github.com/owner/repository: ${value}`);
  }
  const [owner, originalName] = parts;
  const name = originalName.replace(/\.git$/i, '');
  if (!name || name === '.' || name === '..') throw new Error(`Invalid GitHub repository name: ${value}`);
  const canonicalUrl = `https://github.com/${owner}/${name}`;
  return { owner, name, url: canonicalUrl, key: `${owner}/${name}`.toLowerCase() };
}

export function configuredRepositories(urls) {
  if (!Array.isArray(urls)) throw new Error('projects.config.json must contain a repositories array');
  const seen = new Set();
  return urls.map(parseRepositoryUrl).filter(({ key }) => {
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function selectProjects(urls, cached = []) {
  const metadata = new Map();
  for (const repo of cached) {
    try { metadata.set(parseRepositoryUrl(repo.sourceUrl || repo.url).key, repo); } catch {}
  }
  return configuredRepositories(urls).map((repo) => {
    const data = metadata.get(repo.key);
    return data ? { ...data, sourceUrl: repo.url } : {
      id: repo.key,
      name: repo.name,
      owner: repo.owner,
      url: repo.url,
      sourceUrl: repo.url,
      description: null,
      language: null,
      stars: null,
      pushedAt: null,
      organization: null,
      metadataUnavailable: true,
    };
  });
}
