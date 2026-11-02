const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const languageSelect = document.querySelector('#language-select');
const fontSizeSelect = document.querySelector('#font-size-select');
const menuToggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#site-nav');
const accountToggle = document.querySelector('.account-toggle');
const accountMenu = document.querySelector('.account-menu');

function applyTheme(theme) {
  root.dataset.theme = theme;
  const dark = theme === 'dark';
  themeToggle?.setAttribute('aria-pressed', String(dark));
  themeToggle?.setAttribute('aria-label', dark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
}

applyTheme(root.dataset.theme || 'light');

themeToggle?.addEventListener('click', () => {
  const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  localStorage.setItem('soschain-theme', next);
});

languageSelect?.addEventListener('change', event => {
  window.location.href = event.target.value;
});

if (fontSizeSelect) {
  fontSizeSelect.value = root.dataset.fontSize || 'm';
  fontSizeSelect.addEventListener('change', event => {
    const size = event.target.value;
    root.dataset.fontSize = size;
    localStorage.setItem('soschain-font-size', size);
  });
}

menuToggle?.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  navigation?.classList.toggle('open', open);
});

navigation?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menuToggle?.setAttribute('aria-expanded', 'false');
  navigation.classList.remove('open');
}));

function setAccountMenu(open) {
  accountToggle?.setAttribute('aria-expanded', String(open));
  if (accountMenu) accountMenu.hidden = !open;
}

accountToggle?.addEventListener('click', event => {
  event.stopPropagation();
  setAccountMenu(accountToggle.getAttribute('aria-expanded') !== 'true');
});

accountMenu?.addEventListener('click', event => event.stopPropagation());
document.addEventListener('click', () => setAccountMenu(false));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    setAccountMenu(false);
    accountToggle?.focus();
  }
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
const year = document.querySelector('[data-year]');
if (year) year.textContent = new Date().getFullYear();
