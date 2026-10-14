const PHONE = '01046848838';
const TITLE = '[게러지40 광택 문의]';

const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
const menuLabel = menuToggle?.querySelector('.sr-only');

function setMenu(open) {
  if (!menuToggle || !menu) return;
  menuToggle.setAttribute('aria-expanded', String(open));
  menu.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
  if (menuLabel) menuLabel.textContent = open ? '메뉴 닫기' : '메뉴 열기';
}

menuToggle?.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true');
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') setMenu(false);
});

const updateHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 24);
updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

// 숫자 카운트업 (모션 감소 설정이면 최종값 그대로 표시)
const counters = document.querySelectorAll('[data-count]');
if ('IntersectionObserver' in window && !reduceMotion) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      const el = entry.target;
      const end = Number(el.dataset.count);
      const duration = 1200;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(end * eased).toLocaleString('ko-KR');
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });
  counters.forEach((el) => {
    el.textContent = '0';
    countObserver.observe(el);
  });
}

// 문의 문자 작성: 입력 내용을 문자/카톡 본문으로 조립 (서버 전송 없음)
function buildMessage(values = {}) {
  const line = (label, value) => `${label}: ${value ? value.trim() : ''}`;
  return [
    TITLE,
    line('차종·연식', values.car),
    line('차량 색상', values.color),
    line('신경 쓰이는 점', values.concern),
    line('원하는 결과', values.goal),
    line('방문 희망 시기', values.when),
    '',
    '※ 사진 2장을 함께 보내드립니다. (전체 1장, 신경 쓰이는 부위 1장)',
  ].join('\n');
}

const smsHref = (body) => `sms:${PHONE}?&body=${encodeURIComponent(body)}`;

// 페이지 곳곳의 문자 버튼은 입력 양식이 들어간 기본 본문을 사용
document.querySelectorAll('[data-sms]').forEach((link) => {
  link.setAttribute('href', smsHref(buildMessage()));
});

const form = document.querySelector('[data-inquiry]');
if (form) {
  const smsLink = form.querySelector('[data-inquiry-sms]');
  const kakaoLink = form.querySelector('[data-inquiry-kakao]');
  const note = form.querySelector('[data-inquiry-note]');
  const currentMessage = () => buildMessage(Object.fromEntries(new FormData(form)));
  const sync = () => smsLink?.setAttribute('href', smsHref(currentMessage()));

  form.addEventListener('input', sync);
  form.addEventListener('change', sync);
  form.addEventListener('submit', (event) => event.preventDefault());
  sync();

  kakaoLink?.addEventListener('click', async () => {
    let copied = false;
    try {
      await navigator.clipboard.writeText(currentMessage());
      copied = true;
    } catch {
      copied = false;
    }
    if (note) {
      note.textContent = copied
        ? '문의 내용이 복사되었습니다. 카톡 대화창에 붙여넣기 해 주세요.'
        : '복사에 실패했습니다. 대화창에 차종·연식과 사진 2장을 보내주세요.';
    }
  });
}

document.querySelectorAll('[data-dialog-open]').forEach((button) => {
  button.addEventListener('click', () => {
    const dialog = document.getElementById(button.dataset.dialogOpen);
    if (dialog instanceof HTMLDialogElement) dialog.showModal();
  });
});

document.querySelectorAll('.legal-dialog').forEach((dialog) => {
  dialog.querySelector('[data-dialog-close]')?.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });
});

const year = document.querySelector('[data-year]');
if (year) year.textContent = String(new Date().getFullYear());
