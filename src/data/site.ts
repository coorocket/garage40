// 사이트 공통 값. 주소(SITE_URL)는 이 파일 한 곳에만 적는다.
export const SITE_URL = 'https://garage40.netlify.app';

export const SITE = {
  name: '폴리시40',
  nameEn: 'POLISH40',
  formerName: 'GARAGE40',
  tagline: '덮지 않고 도장을 되살립니다',
  business: '넘버원카클리닉 (K광택)',
  businessAlt: '넘버원카클리닉 K광택',
  owner: '이성구',
  bizNo: '306-27-29085',
  phone: '010-4684-8838',
  phoneTel: '01046848838',
  phoneIntl: '+82-10-4684-8838',
  email: 'garage40@gmail.com',
  kakao: 'https://open.kakao.com/o/sWRmKFji',
  ga4: 'G-589M5B6Q71',
  address: '경기 시흥시 금오로 499 1층',
  addressParts: {
    street: '금오로 499 1층',
    locality: '시흥시',
    region: '경기도',
    country: 'KR',
  },
  hours: ['월–토 09:00–19:00', '일요일 휴무'],
  hoursSpec: {
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    opens: '09:00',
    closes: '19:00',
  },
  mapUrl: 'https://map.naver.com/p/entry/place/2093840287',
  areaServed: ['시흥', '광명', '부천', '안산', '안양', '인천'],
  priceRange: '₩₩',
  works: '자동차광택, 유리막코팅, 도색 후 광택, 손세차, 실내세차',
  notWorks: '덴트, 판금도색',
  privacyOfficer: { name: '김용화', email: 'qoorocket@gmail.com' },
} as const;

// 가격(시작가, 만원 단위). 사장님 확정값.
export const PRICES = { standard: 15, best: 30, vip: 50 } as const;
export const from = (manwon: number) => `${manwon}만원부터`;

export const PROGRAMS = [
  {
    name: '스탠다드 케어',
    badge: '',
    forWhom: '출고 1~3년, 생활 흠집과 줄어든 광이 신경 쓰일 때',
    price: PRICES.standard,
    includes: '도장을 덜 다듬는 세미 폴리싱, 스월마크 정리와 광 회복, 왁스·실란트 마감',
  },
  {
    name: 'BEST 정밀 광택',
    badge: '가장 많이 찾는 프로그램',
    forWhom: '출고 3년 이상, 자동세차 기스와 묵은 자국을 정리하고 싶을 때',
    price: PRICES.best,
    includes: '차마다 맞춘 약품, 여러 단계 정밀 폴리싱, 도장면 보호 코팅 마감',
  },
  {
    name: 'VIP 마스터 리스토어',
    badge: '',
    forWhom: '소장용 차, 수입차. 하루 1대만 받습니다',
    price: PRICES.vip,
    includes: '하루 1대 전담 시공, 오렌지필 평탄화를 포함한 맞춤 공정, 실내·엔진룸 관리는 협의',
  },
] as const;

export const abs = (path: string) => `${SITE_URL}${path}`;
