import { useState } from 'react';
import type { Work } from '../data';
import { Diagram } from '../diagrams/Diagram';
import * as specs from '../diagrams/specs';
import { Text } from './Text';

/** One project: name, diagram, three sentences. Hovering or tapping a phase highlights its words, and back. */
export function WorkItem({ item, index }: { item: Work; index: number }) {
  const [active, setActive] = useState<string | null>(null);
  const [pinned, setPinned] = useState<string | null>(null);
  const shown = active ?? pinned;
  const phases = new Set(item.sentences.flat().map((s) => s.phase).filter(Boolean));

  const phaseAt = (target: EventTarget) => {
    const id = (target as Element).closest?.('[data-phase]')?.getAttribute('data-phase');
    return id && phases.has(id) ? id : null;
  };

  return (
    <article className="work" id={item.id} aria-labelledby={`${item.id}-h`}>
      <header className="work-head">
        <span className="work-num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
        <h2 id={`${item.id}-h`}>{item.name}</h2>
        <p className="work-meta"><Text>{item.meta}</Text></p>
      </header>
      <div
        className="work-dia"
        onPointerOver={(e) => e.pointerType === 'mouse' && setActive(phaseAt(e.target))}
        onPointerLeave={() => setActive(null)}
        onClick={(e) => { const id = phaseAt(e.target); setPinned(id === pinned ? null : id); }}
      >
        <Diagram spec={specs[item.diagram]} active={shown} uid={item.id} />
      </div>
      <div className="work-text">
        {item.sentences.map((segs, i) => (
          <p key={i}>
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
        {item.link && <a className="work-link" href={item.link.href}>{item.link.label}</a>}
      </div>
    </article>
  );
}
