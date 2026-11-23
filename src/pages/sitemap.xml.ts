import type { APIRoute } from 'astro';
import { abs } from '../data/site';
import { PAGES, CASES_PATH } from '../data/pages';
import { getPosts, getCases, postPath, casePath, modified } from '../data/content';

// 한 파일(urlset)로 만든다. sitemap-index 방식은 쓰지 않는다.
export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const cases = await getCases();
  const latest = (dates: string[]) => dates.sort().at(-1)!;
  const urls: { loc: string; lastmod: string }[] = Object.entries(PAGES).map(([path, meta]) => ({
    loc: abs(path),
    lastmod: path === '/blog/' && posts.length ? latest([meta.lastmod, ...posts.map((p) => modified(p.data))]) : meta.lastmod,
  }));
  posts.forEach((p) => urls.push({ loc: abs(postPath(p.id)), lastmod: modified(p.data) }));
  if (cases.length) {
    urls.push({ loc: abs(CASES_PATH), lastmod: latest(cases.map((c) => modified(c.data))) });
    cases.forEach((c) => urls.push({ loc: abs(casePath(c.id)), lastmod: modified(c.data) }));
  }
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
