// 그림 자리표. 새 그림이 오면 이 표만 바꾼다.
export interface Slot { src: string; mobileSrc?: string; alt: string; width: number; height: number; mobileWidth?: number; mobileHeight?: number }

export const IMAGES: Record<string, Slot> = {
  'home-hero': { src: '/image/main-banner.webp', mobileSrc: '/image/main-banner-mobile.webp', alt: '', width: 1600, height: 1067, mobileWidth: 900, mobileHeight: 1200 },
  'home-compare': { src: '/image/problem-comparison.webp', alt: '조명 아래에서 본 도장면의 잔흠집 전과 후 비교', width: 1400, height: 934 },
  'step-1': { src: '/image/process-step1.webp', alt: '광택 전에 차를 씻는 모습', width: 900, height: 675 },
  'step-2': { src: '/image/process-step2.webp', alt: '광택기로 도장면을 다듬는 모습', width: 721, height: 900 },
  'step-3': { src: '/image/process-step3.webp', alt: '광택 뒤 표면을 살펴보는 모습', width: 900, height: 672 },
  'polish-hero': { src: '/image/master-working.webp', alt: '광택기로 도장면을 다듬는 장면', width: 736, height: 920 },
  'wash-hero': { src: '/image/process-step1.webp', alt: '차를 씻는 모습', width: 900, height: 675 },
  'diagnosis-bg': { src: '/image/footer-interior.webp', alt: '', width: 1400, height: 933 },
  og: { src: '/image/og-garage40.png', alt: '검은 차량과 폴리시40 도장면 복원 메시지', width: 1200, height: 630 },
  icon: { src: '/image/badge-icon.webp', alt: '', width: 240, height: 240 },
};
