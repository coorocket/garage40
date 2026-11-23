import type { APIRoute } from 'astro';
import { abs } from '../data/site';

// 전체 허용. 검색·AI 로봇은 이름으로도 적어 허용한다.
const BOTS = ['Yeti', 'Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'];

export const GET: APIRoute = () => {
  const blocks = ['*', ...BOTS].map((bot) => `User-agent: ${bot}\nAllow: /`);
  return new Response(`${blocks.join('\n\n')}\n\nSitemap: ${abs('/sitemap.xml')}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
