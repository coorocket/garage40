import { getCollection } from 'astro:content';
import { PAGES, CASES_LABEL } from './pages';

const newest = (a: { data: { pubDate: string } }, b: { data: { pubDate: string } }) =>
  a.data.pubDate < b.data.pubDate ? 1 : a.data.pubDate > b.data.pubDate ? -1 : 0;

// draft: true 인 글은 어디에도 나오지 않는다.
export async function getPosts() {
  return (await getCollection('blog', ({ data }) => !data.draft)).sort(newest);
}
export async function getCases() {
  return (await getCollection('cases', ({ data }) => !data.draft)).sort(newest);
}
export const postPath = (id: string) => `/blog/${id}/`;
export const casePath = (id: string) => `/cases/${id}/`;
export const modified = (d: { pubDate: string; updatedDate?: string }) => d.updatedDate ?? d.pubDate;

// 주소 → 화면에 보일 이름 (관련 글·페이지 링크용)
export async function labelFor(path: string) {
  if (PAGES[path]) return PAGES[path].label;
  const post = (await getPosts()).find((p) => postPath(p.id) === path);
  if (post) return post.data.title;
  const item = (await getCases()).find((c) => casePath(c.id) === path);
  if (item) return item.data.title;
  if (path === '/cases/') return CASES_LABEL;
  return path;
}
