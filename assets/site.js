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

// 견적 문의: 입력 내용을 문자/카톡 본문으로 조립 (서버 전송 없음)
const PHONE = '01046848838';
const TITLE = '[게러지40 광택 견적 문의]';

function buildMessage(values = {}) {
  const line = (label, value) => `${label}: ${value ? value.trim() : ''}`;
  return [
    TITLE,
    line('차종·연식', values.car),
    line('희망 프로그램', values.program),
    line('신경 쓰이는 부분', values.concern),
    line('희망 일정', values.when),
    '사진 2장 첨부 (전체 1장, 신경 쓰이는 부위 1장)',
  ].join('\n');
}

const quoteForm = document.querySelector('[data-inquiry]');
if (quoteForm) {
  const smsLink = quoteForm.querySelector('[data-inquiry-sms]');
  const kakaoLink = quoteForm.querySelector('[data-inquiry-kakao]');
  const note = quoteForm.querySelector('[data-inquiry-note]');
  const currentMessage = () => buildMessage(Object.fromEntries(new FormData(quoteForm)));
  const sync = () => smsLink?.setAttribute('href', `sms:${PHONE}?&body=${encodeURIComponent(currentMessage())}`);

  quoteForm.addEventListener('input', sync);
  quoteForm.addEventListener('change', sync);
  quoteForm.addEventListener('submit', (event) => event.preventDefault());
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

// 문의 클릭 측정 (GA4 contact_click). 링크 이동은 막지 않고, gtag가 없으면 조용히 무시한다.
function trackContact(method, anchor) {
  try {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'contact_click', {
      method,
      page_type: document.body.dataset.pageType || 'unknown',
      page_path: location.pathname,
      cta_position: anchor?.dataset.track || 'unknown',
    });
  } catch {
    // 측정 실패가 사이트 동작에 영향을 주지 않도록 무시
  }
}

document.addEventListener('click', (event) => {
  const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
  if (!link) return;
  const href = link.getAttribute('href') || '';
  if (href.startsWith('tel:')) trackContact('tel', link);
  else if (href.startsWith('sms:')) trackContact('sms', link);
  else if (href.includes('kakao.com')) trackContact('kakao', link);
});

document.addEventListener('submit', (event) => {
  const form = event.target;
  if (form instanceof Element && form.matches('[data-inquiry]')) {
    trackContact('form', form.querySelector('[data-track]') || { dataset: { track: 'form_submit' } });
  }
});
