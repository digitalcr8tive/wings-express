import { defineConfig } from 'astro/config';
import node from '@astrojs/node';

export default defineConfig({
  site: process.env.PUBLIC_SITE_URL || 'https://thewingsexpress.com',
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  security: { checkOrigin: true },
  devToolbar: { enabled: false },
  vite: { server: { host: '127.0.0.1' } }
});
