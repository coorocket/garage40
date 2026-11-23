// 폴리시40 공통 동작: 메뉴, 사진 2장 진단 버튼, 진단 폼(문자·카톡 본문 조립), 문의 클릭 측정.
// 폼에 적은 내용은 서버로 가지 않는다.
const body = document.body;
const PHONE = body.dataset.phone || '';
const TITLE = '[폴리시40 사진 2장 진단]';
const PHOTO_LINE = '사진 2장 첨부 (전체 1장, 신경 쓰이는 부위 1장)';
const smsHref = (text) => `sms:${PHONE}?&body=${encodeURIComponent(text)}`;

// 메뉴
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const menuLabel = menuToggle?.querySelector('.sr-only');
function setMenu(open) {
  if (!menuToggle || !menu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
  if (menuLabel) menuLabel.textContent = open ? '메뉴 닫기' : '메뉴 열기';
}
menuToggle?.addEventListener('click', () => setMenu(menuToggle.getAttribute('aria-expanded') !== 'true'));
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

// 주 버튼: 넓은 화면은 같은 페이지의 #diagnosis, 휴대폰 폭(720px 이하)은 문자 창을 바로 연다.
const phoneWidth = window.matchMedia('(max-width: 720px)');
function quickMessage() {
  const heading = document.querySelector('h1')?.textContent.replace(/\s+/g, ' ').trim() || '';
  return [TITLE, `누른 페이지: ${heading} (${location.pathname})`, PHOTO_LINE].join('\n');
}
function syncDiagButtons() {
  document.querySelectorAll('[data-diag]').forEach((link) => {
    const direct = link.dataset.diag === 'sms' || phoneWidth.matches;
    link.setAttribute('href', direct ? smsHref(quickMessage()) : '#diagnosis');
  });
}
syncDiagButtons();
phoneWidth.addEventListener?.('change', syncDiagButtons);

// 진단 폼
function buildMessage(values = {}) {
  const line = (label, value) => `${label}: ${value ? String(value).trim() : ''}`;
  return [
    TITLE,
    line('차종·연식', values.car),
    line('신경 쓰이는 부분', values.concern),
    line('원하는 날', values.when),
    PHOTO_LINE,
  ].join('\n');
}

const form = document.querySelector('[data-inquiry]');
if (form) {
  const smsLink = form.querySelector('[data-inquiry-sms]');
  const kakaoLink = form.querySelector('[data-inquiry-kakao]');
  const status = form.querySelector('[data-inquiry-status]');
  const car = form.querySelector('[name="car"]');
  const currentMessage = () => buildMessage(Object.fromEntries(new FormData(form)));
  const sync = () => smsLink?.setAttribute('href', smsHref(currentMessage()));
  const say = (text) => { if (status) status.textContent = text; };
  // 차종 칸이 비어 있으면 보내기 전에 알린다.
  const carMissing = (event) => {
    if (car && car.value.trim()) return false;
    event.preventDefault();
    say('차종을 적어 주세요');
    car?.focus();
    return true;
  };

  form.addEventListener('input', () => { sync(); if (car?.value.trim()) say(''); });
  form.addEventListener('change', sync);
  form.addEventListener('submit', (event) => event.preventDefault());
  sync();

  smsLink?.addEventListener('click', (event) => { if (!carMissing(event)) sync(); });
  kakaoLink?.addEventListener('click', async (event) => {
    if (carMissing(event)) return;
    let copied = false;
    try {
      await navigator.clipboard.writeText(currentMessage());
      copied = true;
    } catch {
      copied = false;
    }
    say(copied
      ? '적은 내용이 복사됐습니다. 카톡 대화창에 붙여 넣어 주세요.'
      : '복사에 실패했습니다. 대화창에 차종·연식과 사진 2장을 보내주세요.');
  });
}

// 문의 클릭 측정 (GA4 contact_click). 링크 이동은 막지 않고, gtag가 없으면 조용히 무시한다.
function trackContact(method, anchor) {
  try {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'contact_click', {
      method,
      page_type: body.dataset.pageType || 'unknown',
      page_path: location.pathname,
      cta_position: anchor?.dataset.track || 'unknown',
    });
  } catch {
    // 측정 실패가 사이트 동작에 영향을 주지 않도록 무시
  }
}

document.addEventListener('click', (event) => {
  if (event.defaultPrevented) return; // 차종이 비어 보내지 않은 경우는 세지 않는다
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) trackContact('tel', link);
  else if (href.startsWith('sms:')) trackContact('sms', link);
  else if (href.includes('kakao.com')) trackContact('kakao', link);
});
