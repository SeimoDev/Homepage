import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { createRepositoryHandler } from './server/github-repos.js';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const handleRepositories = createRepositoryHandler();
  const api = (server) => {
    server.middlewares.use(async (req, res, next) => {
      if (new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '') !== '/api/github-repos') return next();
      try {
        const request = new Request(new URL(req.url, 'http://localhost'), { method: req.method });
        const response = await handleRepositories(request, { GITHUB_TOKEN: env.GITHUB_TOKEN });
        res.statusCode = response.status;
        response.headers.forEach((value, key) => res.setHeader(key, value));
        res.end(Buffer.from(await response.arrayBuffer()));
      } catch (error) { next(error); }
    });
  };
  return {
    plugins: [react(), { name: 'github-api', configureServer: api, configurePreviewServer: api }],
    server: { port: 5173, host: true },
    build: { target: 'es2020', assetsInlineLimit: 2048 },
  };
});
