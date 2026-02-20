// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://washerarchitecture.com',
  output: 'static',
  server: { host: '0.0.0.0', port: 5000, allowedHosts: true },
  vite: { server: { allowedHosts: true } },
  integrations: [tailwind(), sitemap()],
});
