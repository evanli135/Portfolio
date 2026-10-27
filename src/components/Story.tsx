import { useEffect, useRef, useState } from 'react';
import { categories, type Entry } from '../data';
import { Diagram } from '../diagrams/Diagram';
import * as specs from '../diagrams/specs';
import { Text } from './Text';

// The work, oldest first, one chapter per screen. On wide screens the stage pins
// and chapters crossfade as you scroll; on phones they simply stack.
const chapters = categories.find((c) => c.id === 'work')!.entries.filter((e) => e.diagram);

function Chapter({ entry, index, on }: { entry: Entry; index: number; on: boolean }) {
  const [hover, setHover] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const shown = hover ?? pinned;
  const phases = new Set(entry.body?.flat().map((s) => s.phase).filter(Boolean));
  const phaseAt = (target: EventTarget) => {
    const id = (target as Element).closest?.('[data-phase]')?.getAttribute('data-phase');
    return id && phases.has(id) ? id : null;
  };
  const [when, ...rest] = (entry.meta ?? '').split(' · ');
  const year = when.match(/\d{4}/)?.[0] ?? '';

  return (
    <article className={`chapter${on ? ' on' : ''}`} aria-hidden={!on || undefined} aria-label={`${entry.org}, ${when}`}>
      <div className="ch-read">
        <p className="ch-year" aria-hidden="true">{year}</p>
        <p className="ch-when">{String(index + 1).padStart(2, '0')} · {when}</p>
        <h2 className="ch-org">{entry.org}</h2>
        <p className="ch-role">{entry.title}{rest.length ? ` · ${rest.join(' · ')}` : ''}</p>
        <div className="ch-text" data-prov="trusted" data-prov-label="authored">
          {entry.body?.map((segs, i) => (
            <p key={i}>
              {segs.map((s, j) =>
                s.phase ? (
                  <span
                    key={j}
                    className={`seg${shown === s.phase ? ' on' : ''}`}
                    tabIndex={on ? 0 : -1}
                    onPointerEnter={() => setHover(s.phase!)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(s.phase!)}
                    onBlur={() => setHover(null)}
                  >
                    {s.text}
                  </span>
                ) : (
                  <Text key={j}>{s.text}</Text>
                ),
              )}
            </p>
          ))}
          {entry.links?.map((l) => (
            <a key={l.href} className="ch-link" href={l.href} tabIndex={on ? 0 : -1} data-prov="untrusted" data-prov-label="leaves the site">{l.label} ↗</a>
          ))}
        </div>
      </div>
      <div
        className="ch-dia"
        data-prov="trusted"
        data-prov-label={specs[entry.diagram!].illustrative ? 'illustrative' : 'from the paper'}
        onPointerOver={(e) => e.pointerType === 'mouse' && setHover(phaseAt(e.target))}
        onPointerLeave={() => setHover(null)}
        onClick={(e) => { const id = phaseAt(e.target); setPinned(id === pinned ? null : id); }}
      >
        <Diagram spec={specs[entry.diagram!]} active={shown} uid={`ch${index}`} />
      </div>
    </article>
  );
}

export function Story() {
  const [active, setActive] = useState(0);
  const steps = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <section className="story" aria-label="Work, in order" style={{ '--n': chapters.length } as React.CSSProperties}>
      <div className="stage">
        {chapters.map((c, i) => <Chapter key={c.org} entry={c} index={i} on={i === active} />)}
        <ol className="rail" aria-hidden="true">
          {chapters.map((c, i) => <li key={c.org} className={i === active ? 'on' : i < active ? 'past' : ''} />)}
        </ol>
      </div>
      <div className="steps" aria-hidden="true">
        {chapters.map((c, i) => <div key={c.org} className="step" data-i={i} ref={(el) => { steps.current[i] = el; }} />)}
      </div>
    </section>
  );
}
