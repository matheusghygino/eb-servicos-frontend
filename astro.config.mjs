import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://ebservicos.com.br',
  output: 'static',
  integrations: [sitemap()],
});
