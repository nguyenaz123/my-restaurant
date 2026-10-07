/**
 * Rising embers over the hero. Pure CSS (transform + opacity only), so it costs
 * no JS and stops entirely under prefers-reduced-motion via globals.css.
 * Values are deterministic to keep server and client markup identical.
 */
const embers = Array.from({ length: 22 }, (_, i) => {
  const seed = (i * 9301 + 49297) % 233280;
  const r = seed / 233280;
  return {
    left: `${(i * 37 + 11) % 100}%`,
    size: 1.5 + ((i * 7) % 4) * 0.75,
    duration: `${8 + r * 9}s`,
    delay: `${-r * 14}s`,
    drift: `${Math.round((r - 0.5) * 120)}px`,
  };
});

export function Embers() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-full overflow-hidden">
      {embers.map((e, i) => (
        <span
          key={i}
          // Every other ember is hidden on phones to halve the animated layers over the hero.
          className={`ember absolute bottom-[-2%] rounded-full bg-gold-bright ${i % 2 ? "hidden md:block" : ""}`}
          style={
            {
              left: e.left,
              width: e.size,
              height: e.size,
              boxShadow: "0 0 6px 1px rgba(229,193,88,0.55)",
              "--ember-duration": e.duration,
              "--ember-delay": e.delay,
              "--ember-drift": e.drift,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
