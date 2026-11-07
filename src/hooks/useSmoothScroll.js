function behavior() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth';
}

export function scrollToId(id) {
  const section = document.getElementById(id);
  const target = section?.querySelector('h2') || section;
  target?.scrollIntoView({ behavior: behavior(), block: 'start' });
  target?.focus({ preventScroll: true });
}

export function scrollToTop() {
  window.scrollTo({ top: 0, behavior: behavior() });
}
