'use strict';
// Load external players only as their sections approach the viewport.
const players = document.querySelectorAll('iframe[data-src]');
function loadPlayer(player) {
  const source = player.dataset.src;
  if (source) { player.src = source; delete player.dataset.src; }
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.isIntersecting) { loadPlayer(entry.target); observer.unobserve(entry.target); }
    }
  }, { rootMargin: '300px' });
  players.forEach(player => observer.observe(player));
} else {
  players.forEach(loadPlayer);
}
