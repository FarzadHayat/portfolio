// Fallback for browsers without CSS scroll-driven animations.
// Moves each landscape layer up by its data-travel (in vh) over the first
// screen of scroll, the same as the CSS in theme.css. Transforms only.
// Skipped when the browser supports the CSS version or the user prefers
// reduced motion.
export function mount(): void | (() => void) {
  if (CSS.supports("(animation-timeline: view()) and (animation-range: entry)")) return;
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const layers = Array.from(
    document.querySelectorAll<HTMLElement>('[data-decor="parallax"] [data-travel]'),
  );
  if (!layers.length) return;

  let frame = 0;
  const update = () => {
    frame = 0;
    const progress = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
    for (const layer of layers) {
      const travel = Number(layer.dataset.travel) || 0;
      layer.style.transform = `translate3d(0, ${(-progress * travel).toFixed(3)}vh, 0)`;
    }
  };
  const onScroll = () => {
    if (!frame) frame = requestAnimationFrame(update);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();

  return () => {
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onScroll);
    cancelAnimationFrame(frame);
    for (const layer of layers) layer.style.transform = "";
  };
}
