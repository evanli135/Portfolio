import { useEffect, useState } from 'react';
import { site } from '../data';
import { useLayer } from '../layer';
import { AgentOnly, Text } from './Text';
import portrait from '../assets/portrait.jpg';

// A field of untrusted inputs. Every one of them stops at the boundary around the name.
// Deterministic, so both layers draw the same field.
const rand = (i: number) => ((Math.sin(i * 12.9898) * 43758.5453) % 1 + 1) % 1;
const SHAPES = [[16, 16], [34, 12], [10, 10], [22, 22], [52, 12], [12, 28]];
const lanes = (side: 'r' | 't', n: number) =>
  Array.from({ length: n }, (_, i) => {
    const k = i + (side === 't' ? 50 : 0);
    const [w, h] = SHAPES[Math.floor(rand(k) * SHAPES.length)];
    return {
      key: `${side}${i}`,
      side,
      style: {
        '--at': `${side === 't' ? 26 + ((i + 0.5) / n) * 74 : ((i + 0.5) / n) * 100}%`,
        '--delay': `${-(rand(k + 7) * 8).toFixed(2)}s`,
        '--dur': `${(3.6 + rand(k + 3) * 3.6).toFixed(2)}s`,
        '--w': `${side === 't' ? h : w}px`,
        '--h': `${side === 't' ? w : h}px`,
      } as React.CSSProperties,
    };
  });
const FIELD = [...lanes('r', 22), ...lanes('t', 14)];

/** What an agent reading this page would tally. Counted from the human layer, never typed in. */
function PageFacts() {
  const [facts, setFacts] = useState('');
  useEffect(() => {
    const page = document.querySelector('.human-layer');
    if (!page) return;
    const words = (page.textContent ?? '').trim().split(/\s+/).length;
    const linksAll = page.querySelectorAll('a[href]');
    const out = Array.from(linksAll).filter((a) => /^https?:/.test(a.getAttribute('href') ?? '')).length;
    setFacts(`${words.toLocaleString()} words · ${linksAll.length} links, ${out} leave the site · ${Math.max(1, Math.round(words / 230))} min read`);
  }, []);
  return <AgentOnly className="facts">{facts}</AgentOnly>;
}

export function Hero() {
  const agent = useLayer() === 'agent';

  return (
    <header className="hero">
      {agent && <PageFacts />}
      <p className="line" data-prov="trusted" data-prov-label="the one line that explains itself"><Text>{site.line}</Text></p>
      <div className="fence" data-prov="trusted" data-prov-label="enforcement point">
        <div className="name-wrap">
          <h1>
            <span>Evan</span>
            <span>Li</span>
          </h1>
          <span className="portrait-wrap" data-prov="trusted" data-prov-label="first-party photo">
            <img className="portrait" src={portrait} alt="Evan Li" width={640} height={640} />
            <AgentOnly className="note-photo">640 × 640 · 1 face · no hidden text</AgentOnly>
          </span>
        </div>
        <p className="hero-meta" data-prov="trusted" data-prov-label="where he's from">
          {site.meta.map((m) => <span key={m}><Text>{m}</Text></span>)}
        </p>
        <AgentOnly className="note-h1">h1 · 2 tokens · 1 of 1</AgentOnly>
        <div className="field" aria-hidden="true" data-prov="untrusted" data-prov-label="untrusted input, drawn and never written">
          {FIELD.map((l) => (
            <span key={l.key} className={`lane ${l.side}`} style={l.style}>
              <span className="pkt" />
              <span className="stop" />
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
