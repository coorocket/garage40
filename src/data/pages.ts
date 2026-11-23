import { SITE } from './site';

// 주소·제목·설명 표 (요청서 2번 표와 원고의 "설명" 줄이 기준. 요청서 없이 바꾸지 않는다)
export interface PageMeta { title: string; description: string; pageType: string; label: string; lastmod: string }

export const PAGES: Record<string, PageMeta> = {
  '/': {
    title: '폴리시40 | 시흥 자동차광택·유리막코팅 - 40년 광택 장인',
    description: '시흥 금오로 폴리시40. 흠집을 가리지 않고 실제로 다듬어 없애는 자동차광택. 40년 광택 장인이 처음부터 끝까지 직접 합니다. 광택 15만원부터, 사진 2장으로 먼저 진단 받으세요.',
    pageType: 'home', label: '홈', lastmod: '2026-11-23',
  },
  '/polish/': {
    title: '자동차광택, 덮지 않고 되살리는 정밀 광택 | 폴리시40',
    description: '자동세차 기스와 스월마크를 가리지 않고 실제로 다듬어 없애는 자동차광택. 시흥 금오로 폴리시40에서 40년 광택 장인이 직접 합니다. 15만원부터, 사진 2장으로 먼저 진단 받으세요.',
    pageType: 'service', label: '자동차광택', lastmod: '2026-11-23',
  },
  '/polish/price/': {
    title: '자동차광택 비용 15만원부터, 프로그램별 가격표 | 폴리시40',
    description: '자동차광택 비용은 스탠다드 15만원부터, BEST 정밀 광택 30만원부터, VIP 50만원부터입니다. 차 크기와 도장 상태에 따라 달라지며, 사진 2장을 보내 주시면 예상 범위를 먼저 알려 드립니다. 시흥 금오로 폴리시40.',
    pageType: 'price', label: '광택 비용', lastmod: '2026-11-23',
  },
  '/coating/': {
    title: '자동차유리막코팅, 광택으로 면을 고른 뒤 올립니다 | 폴리시40',
    description: '자동차유리막코팅은 도장 위에 얇은 보호막을 올리는 작업입니다. 폴리시40은 광택으로 면을 먼저 고른 뒤 올립니다. 시흥 금오로, 40년 광택 장인이 직접. 사진 2장으로 먼저 상담 받으세요.',
    pageType: 'service', label: '유리막코팅', lastmod: '2026-11-23',
  },
  '/after-paint/': {
    title: '도색 후 광택, 오렌지필과 표면 결 정리 | 폴리시40',
    description: '수리·도색 뒤 표면이 귤껍질처럼 울퉁불퉁하거나 주변과 광이 달라 보일 때, 도색 후 광택으로 결을 정리합니다. 판금·도색은 하지 않고 마무리 광택만 합니다. 시흥 금오로 폴리시40.',
    pageType: 'service', label: '도색 후 광택', lastmod: '2026-11-23',
  },
  '/wash/': {
    title: '시흥 손세차·실내세차 | 폴리시40',
    description: '시흥 금오로 폴리시40의 손세차와 실내세차. 광택 전문점이 도장에 흠집을 덜 내는 순서로 씻습니다. 예약과 비용은 문자로 문의해 주세요.',
    pageType: 'service', label: '손세차 · 실내세차', lastmod: '2026-11-23',
  },
  '/master/': {
    title: '40년 광택 장인 소개 | 폴리시40',
    description: '폴리시40 대표는 을지로 오장동에서 광택을 시작해 장안동을 거쳐 지금은 시흥 금오로에서 일합니다. 40년 동안 광택 한 가지만 해 온 장인의 고집과 하지 않는 것을 소개합니다.',
    pageType: 'master', label: '40년 장인', lastmod: '2026-11-23',
  },
  '/faq/': {
    title: '자동차광택 자주 묻는 질문 | 폴리시40',
    description: '자동차광택을 맡기기 전에 가장 많이 하는 질문과 답. 도장이 얇아지지 않는지, 비용은 어떻게 정해지는지, 광택으로 안 되는 흠집은 무엇인지 폴리시40이 답합니다.',
    pageType: 'faq', label: '자주 묻는 질문', lastmod: '2026-11-23',
  },
  '/contact/': {
    title: '오시는 길·예약, 시흥 금오로 | 폴리시40',
    description: `폴리시40은 ${SITE.address}에 있습니다. 광명·부천·안산·안양·인천에서 가깝습니다. 오시기 전에 사진 2장을 먼저 보내 주시면 걸리는 시간과 비용 범위를 알려 드립니다.`,
    pageType: 'contact', label: '오시는 길', lastmod: '2026-11-23',
  },
  '/blog/': {
    title: '자동차 도장 관리 블로그 | 폴리시40',
    description: '스월마크, 오렌지필, 컴파운드 사용법처럼 차 도장을 관리할 때 궁금한 것을 폴리시40이 쉽게 풀어 씁니다. 혼자 해도 되는 것과 맡겨야 하는 것을 나눠 알려 드립니다.',
    pageType: 'blog_index', label: '블로그', lastmod: '2026-11-23',
  },
  '/terms/': {
    title: '이용약관 | 폴리시40',
    description: '폴리시40 사이트 이용약관입니다.',
    pageType: 'legal', label: '이용약관', lastmod: '2026-11-23',
  },
  '/privacy/': {
    title: '개인정보처리방침 | 폴리시40',
    description: '폴리시40 개인정보처리방침입니다.',
    pageType: 'legal', label: '개인정보처리방침', lastmod: '2026-11-23',
  },
};

export const CASES_PATH = '/cases/';
export const CASES_LABEL = '시공 사례';
