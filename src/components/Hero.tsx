import { site } from '../data';
import { Text } from './Text';

// Untrusted inputs arrive at the boundary around the name and stop there.
const LANES = [
  { at: '14%', delay: '0s' },
  { at: '38%', delay: '2.3s' },
  { at: '61%', delay: '4.1s' },
  { at: '83%', delay: '1.2s' },
  { at: '50%', delay: '5.3s' },
];

export function Hero() {
  return (
    <header className="hero">
      <div className="hero-meta">
        {site.meta.map((m) => <span key={m}>{m}</span>)}
      </div>
      <div className="hero-main">
        <div className="fence">
          <span className="fence-label">evanli.org</span>
          <h1>{site.name}</h1>
          <div className="lanes" aria-hidden="true">
            {LANES.map((l) => (
              <span key={l.at} className="lane" style={{ '--at': l.at, '--delay': l.delay } as React.CSSProperties}>
                <span className="pkt" />
                <span className="stop" />
              </span>
            ))}
          </div>
        </div>
        <p className="line"><Text>{site.line}</Text></p>
      </div>
    </header>
  );
}
