import { readFile, writeFile } from 'node:fs/promises';
import { loadEnv } from 'vite';
import config from '../projects.config.json' with { type: 'json' };
import { syncProjects } from './github-projects.mjs';

const destination = new URL('../src/data/projects.json', import.meta.url);
let cached = [];
try { cached = JSON.parse(await readFile(destination, 'utf8')).repositories || []; } catch {}
const env = loadEnv('production', process.cwd(), '');
const { repositories, warnings } = await syncProjects({
  urls: config.repositories,
  cached,
  token: process.env.GITHUB_TOKEN || env.GITHUB_TOKEN,
});
await writeFile(destination, `${JSON.stringify({ updatedAt: Date.now(), repositories }, null, 2)}\n`);
console.log(`Embedded ${repositories.length} configured GitHub repositories into static project data.`);
for (const warning of warnings) console.warn(`Using saved metadata or the repository link: ${warning}`);
