const themeToggle = document.querySelector('.theme-toggle');
const themeColor = document.querySelector('meta[name="theme-color"]');
const savedTheme = localStorage.getItem('portfolio-theme');

if (savedTheme === 'dark') {
  document.documentElement.dataset.theme = 'dark';
}

if (themeToggle) {
  const updateThemeControl = () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    const action = isDark ? 'Ativar modo claro' : 'Ativar modo escuro';

    themeToggle.setAttribute('aria-label', action);
    themeToggle.setAttribute('title', action);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeColor?.setAttribute('content', isDark ? '#0c0f14' : '#e8edf5');
  };

  updateThemeControl();

  themeToggle.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme !== 'dark';

    if (isDark) {
      document.documentElement.dataset.theme = 'dark';
    } else {
      delete document.documentElement.dataset.theme;
    }

    localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light');
    updateThemeControl();
  });
}
