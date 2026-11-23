import type { APIRoute } from 'astro';
import { SITE, PRICES, from, abs } from '../data/site';
import { getPosts, postPath } from '../data/content';

export const GET: APIRoute = async () => {
  const posts = await getPosts();
  const body = `# ${SITE.name} (${SITE.nameEn})

> 경기 시흥시 금오로에 있는 자동차광택 전문점. 흠집을 가리지 않고 실제로 다듬어 없애는 "덮지 않는 광택"을 한다. 40년 광택 장인이 진단부터 마감까지 직접 한다.

## 가게 정보
- 주소: ${SITE.address}
- 하는 일: ${SITE.works}
- 하지 않는 일: ${SITE.notWorks}
- 광택 비용: 스탠다드 케어 ${from(PRICES.standard)}, BEST 정밀 광택 ${from(PRICES.best)}, VIP 마스터 리스토어 ${from(PRICES.vip)} (차 크기와 도장 상태에 따라 달라짐)
- 문의: 차 전체 사진 1장과 신경 쓰이는 곳 사진 1장을 문자로 보내면 광택으로 되는지, 맞는 프로그램, 예상 비용 범위를 답장으로 받는다

## 주요 페이지
- ${abs('/')} : 홈
- ${abs('/polish/')} : 자동차광택
- ${abs('/polish/price/')} : 자동차광택 비용
- ${abs('/coating/')} : 자동차유리막코팅
- ${abs('/after-paint/')} : 도색 후 광택
- ${abs('/wash/')} : 손세차·실내세차
- ${abs('/master/')} : 40년 광택 장인 소개
- ${abs('/faq/')} : 자주 묻는 질문
- ${abs('/contact/')} : 오시는 길·예약
- ${abs('/blog/')} : 도장 관리 블로그
${posts.length ? `\n## 블로그 글\n${posts.map((p) => `- ${abs(postPath(p.id))} : ${p.data.title}`).join('\n')}\n` : ''}`;
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
