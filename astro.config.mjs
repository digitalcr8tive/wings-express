import { defineConfig } from 'astro/config';

// Static build for GitHub Pages (project page served from /wings-express/).
export default defineConfig({
  site: 'https://digitalcr8tive.github.io',
  base: '/wings-express',
  output: 'static',
  devToolbar: { enabled: false },
  vite: { server: { host: '127.0.0.1' } }
});
