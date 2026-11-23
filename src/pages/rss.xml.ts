import type { APIRoute } from 'astro';
import { abs } from '../data/site';
import { PAGES } from '../data/pages';
import { getPosts, getCases, postPath, casePath } from '../data/content';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const rfc822 = (day: string) => new Date(`${day}T00:00:00+09:00`).toUTCString();

// 블로그와 사례의 새 글
export const GET: APIRoute = async () => {
  const blog = PAGES['/blog/'];
  const items = [
    ...(await getPosts()).map((p) => ({ link: abs(postPath(p.id)), title: p.data.title, description: p.data.description, date: p.data.pubDate })),
    ...(await getCases()).map((c) => ({ link: abs(casePath(c.id)), title: c.data.title, description: c.data.description ?? '', date: c.data.pubDate })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(blog.title)}</title>
    <link>${abs('/blog/')}</link>
    <description>${esc(blog.description)}</description>
    <language>ko</language>
    <atom:link href="${abs('/rss.xml')}" rel="self" type="application/rss+xml" />
${items.map((i) => `    <item>
      <title>${esc(i.title)}</title>
      <link>${i.link}</link>
      <guid isPermaLink="true">${i.link}</guid>
      <description>${esc(i.description)}</description>
      <pubDate>${rfc822(i.date)}</pubDate>
    </item>`).join('\n')}
  </channel>
</rss>
`;
  return new Response(body, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
