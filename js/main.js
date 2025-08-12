// Disable dark mode: always use light theme and remove toggle if present
(function enforceLightTheme(){
  function init(){
    var root = document.documentElement;
    root.removeAttribute('data-theme');
    try { localStorage.removeItem('portfolio.theme'); } catch (_) {}
    var btn = document.querySelector('[data-action="toggle-theme"]');
    if (btn && btn.parentNode) btn.parentNode.removeChild(btn);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();


