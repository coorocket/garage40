import { defineConfig } from 'astro/config';
import { SITE_URL } from './src/data/site.ts';

// 주소는 src/data/site.ts 의 SITE_URL 한 곳에서만 정한다.
export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'never',
  },
});
