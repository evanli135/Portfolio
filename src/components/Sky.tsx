import { useEffect, useState } from 'react';
import { LINES, STARS } from '../sky-data';

// The real sky over Westchester, NY, right now: stars and constellation lines above
// the horizon, projected from the zenith (north up, east on the left, as seen
// looking up). Recomputed once a minute; the sky turns about a quarter degree in that time.
const LAT = 41.12;
const LON = -73.79;
const R = 640; // horizon radius in viewBox units; the corners fall below the horizon
const rad = Math.PI / 180;
// Real star colors, in the old site's palette.
const TONES = ['blue', 'teal', 'magenta'] as const;

function siderealDeg(now: number) {
  const d = now / 86400000 + 2440587.5 - 2451545.0;
  return (((280.46061837 + 360.98564736629 * d + LON) % 360) + 360) % 360;
}

/** Right ascension and declination to a point on screen, or null below the horizon. */
function project(raDeg: number, decDeg: number, lst: number): [number, number] | null {
  const ha = (lst - raDeg) * rad;
  const dec = decDeg * rad;
  const lat = LAT * rad;
  const sinAlt = Math.sin(dec) * Math.sin(lat) + Math.cos(dec) * Math.cos(lat) * Math.cos(ha);
  const alt = Math.asin(sinAlt);
  if (alt <= 0) return null;
  const cosAz = (Math.sin(dec) - sinAlt * Math.sin(lat)) / (Math.cos(alt) * Math.cos(lat));
  let az = Math.acos(Math.max(-1, Math.min(1, cosAz)));
  if (Math.sin(ha) > 0) az = 2 * Math.PI - az;
  const r = Math.tan((Math.PI / 2 - alt) / 2) * R;
  return [500 - r * Math.sin(az), 500 - r * Math.cos(az)];
}

function useSiderealTime() {
  const [lst, setLst] = useState(() => siderealDeg(Date.now()));
  useEffect(() => {
    const id = setInterval(() => setLst(siderealDeg(Date.now())), 60000);
    return () => clearInterval(id);
  }, []);
  return lst;
}

export function Sky() {
  const lst = useSiderealTime();

  const lines = LINES.map((seg) => {
    let d = '';
    let pen = false;
    for (const [ra, dec] of seg) {
      const p = project(ra, dec, lst);
      if (!p) { pen = false; continue; }
      d += `${pen ? 'L' : 'M'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`;
      pen = true;
    }
    return d;
  }).filter((d) => d.includes('L'));

  return (
    <svg className="sky" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <filter id="sky-glow" x="-200%" y="-200%" width="500%" height="500%">
          <feGaussianBlur stdDeviation="2.2" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>
      {lines.map((d, i) => <path key={i} className="sky-line" d={d} />)}
      {STARS.map(([ra, dec, mag, tone], i) => {
        const p = project(ra, dec, lst);
        if (!p) return null;
        const twinkle = mag < 3 && i % 5 === 0;
        return (
          <circle
            key={i}
            cx={p[0].toFixed(1)}
            cy={p[1].toFixed(1)}
            r={Math.min(2.6, Math.max(0.55, 2.3 - 0.42 * mag)).toFixed(2)}
            className={`sky-${TONES[tone]}${mag < 2 ? ' glow' : ''}${twinkle ? ' tw' : ''}`}
            style={{
              opacity: Math.min(0.95, Math.max(0.25, 0.9 - 0.13 * mag)),
              ...(twinkle ? { animationDuration: `${6 + (i % 7) * 1.3}s`, animationDelay: `${-(i % 11)}s` } : {}),
            }}
          />
        );
      })}
    </svg>
  );
}
