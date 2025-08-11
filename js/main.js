// Theme toggle (dark/light) persisted in localStorage
(function initThemeToggle() {
  var THEME_KEY = 'portfolio.theme';
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (_) {}
  }

  function getPref() {
    try {
      var saved = localStorage.getItem(THEME_KEY);
      if (saved) return saved;
    } catch (_) {}
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
      ? 'dark' : 'light';
  }

  // Create a minimal toggle button if one not present
  function ensureToggle() {
    var existing = document.querySelector('[data-action="toggle-theme"]');
    if (existing) return existing;
    var btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Toggle color theme');
    btn.setAttribute('data-action', 'toggle-theme');
    btn.style.position = 'fixed';
    btn.style.right = '14px';
    btn.style.bottom = '14px';
    btn.style.zIndex = '10000';
    btn.style.padding = '10px 12px';
    btn.style.borderRadius = '999px';
    btn.style.border = '1px solid rgba(0,0,0,0.1)';
    btn.style.background = 'var(--btn-bg, #fff)';
    btn.style.boxShadow = '0 2px 8px rgba(0,0,0,0.12)';
    btn.style.cursor = 'pointer';
    btn.textContent = '🌓';
    document.body.appendChild(btn);
    return btn;
  }

  function init() {
    var current = getPref();
    applyTheme(current);
    var toggle = ensureToggle();
    toggle.addEventListener('click', function () {
      current = (current === 'dark') ? 'light' : 'dark';
      applyTheme(current);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();


