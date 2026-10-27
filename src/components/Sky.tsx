// A distant constellation behind everything: small stars, a few faint lines.
// Deterministic so it never shifts between loads. Only some stars twinkle, slowly.
const rand = (i: number) => ((Math.sin(i * 78.233 + 1.7) * 43758.5453) % 1 + 1) % 1;

const STARS = Array.from({ length: 150 }, (_, i) => ({
  x: rand(i) * 1000,
  y: rand(i + 300) * 1000,
  r: 0.5 + rand(i + 600) * 1.1,
  o: 0.22 + rand(i + 900) * 0.45,
  teal: rand(i + 1200) < 0.14,
  twinkle: rand(i + 1500) < 0.2 ? 6 + rand(i + 1800) * 9 : 0,
}));

// Each constellation is a handful of stars near a seed point, joined in order of angle.
const SEEDS: [number, number][] = [[180, 220], [760, 160], [620, 760]];
const CONSTELLATIONS = SEEDS.map(([cx, cy]) =>
  STARS.map((s, i) => ({ ...s, i, d: Math.hypot(s.x - cx, s.y - cy) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 6)
    .sort((a, b) => Math.atan2(a.y - cy, a.x - cx) - Math.atan2(b.y - cy, b.x - cx)),
);

export function Sky() {
  return (
    <svg className="sky" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {CONSTELLATIONS.map((c, k) => (
        <polyline key={k} className="sky-line" points={c.map((s) => `${s.x},${s.y}`).join(' ')} />
      ))}
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          className={`${s.teal ? 'sky-teal' : 'sky-star'}${s.twinkle ? ' tw' : ''}`}
          style={{ opacity: s.o, ...(s.twinkle ? { animationDuration: `${s.twinkle}s`, animationDelay: `${-s.twinkle * rand(i + 2100)}s` } : {}) }}
        />
      ))}
    </svg>
  );
}
