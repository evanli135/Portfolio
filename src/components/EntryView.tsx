import { useState } from 'react';
import type { Entry } from '../data';
import { Diagram } from '../diagrams/Diagram';
import * as specs from '../diagrams/specs';
import { Text } from './Text';

/** One entry. With a diagram, hovering or tapping a phase highlights its words, and back. */
export function EntryView({ entry, uid }: { entry: Entry; uid: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const shown = active ?? pinned;
  const phases = new Set(entry.body?.flat().map((s) => s.phase).filter(Boolean));

  const phaseAt = (target: EventTarget) => {
    const id = (target as Element).closest?.('[data-phase]')?.getAttribute('data-phase');
    return id && phases.has(id) ? id : null;
  };

  return (
    <article className="entry">
      <div className="entry-head">
        <h3>{entry.title}</h3>
        {entry.aside && <span className="aside">{entry.aside}</span>}
      </div>
      {entry.org && <p className="org">{entry.org}</p>}
      {entry.meta && <p className="meta">{entry.meta}</p>}

      {entry.diagram && (
        <div
          className="entry-dia"
          onPointerOver={(e) => e.pointerType === 'mouse' && setActive(phaseAt(e.target))}
          onPointerLeave={() => setActive(null)}
          onClick={(e) => { const id = phaseAt(e.target); setPinned(id === pinned ? null : id); }}
        >
          <Diagram spec={specs[entry.diagram]} active={shown} uid={uid} />
        </div>
      )}

      {entry.body?.map((segs, i) => (
        <p key={i} className="body">
          {segs.map((s, j) =>
            s.phase ? (
              <span
                key={j}
                className={`seg${shown === s.phase ? ' on' : ''}`}
                tabIndex={0}
                onPointerEnter={() => setActive(s.phase!)}
                onPointerLeave={() => setActive(null)}
                onFocus={() => setActive(s.phase!)}
                onBlur={() => setActive(null)}
              >
                {s.text}
              </span>
            ) : (
              <Text key={j}>{s.text}</Text>
            ),
          )}
        </p>
      ))}

      {entry.bullets && (
        <dl className="bullets">
          {entry.bullets.map(([k, v]) => (
            <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
          ))}
        </dl>
      )}
      {entry.code && <code className="code">{entry.code}</code>}
      {entry.links && (
        <p className="entry-links">
          {entry.links.map((l) => <a key={l.href} href={l.href}>{l.label} ↗</a>)}
        </p>
      )}
    </article>
  );
}
