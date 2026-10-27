import { useRef } from 'react';
import { categories, type Entry } from '../data';
import { Diagram } from '../diagrams/Diagram';
import * as specs from '../diagrams/specs';
import { useId, useLayer, useShared } from '../layer';
import { Text } from './Text';

// A pinned index on the side; the open section's entries scroll as a normal page.

function Chapter({ catId, entry, index }: { catId: string; entry: Entry; index: number }) {
  const layer = useLayer();
  const { phase, setHover, togglePin } = useShared();
  // Phases are scoped to this entry, since two diagrams can share a phase name.
  const key = `${catId}${index}:`;
  const shown = phase?.startsWith(key) ? phase.slice(key.length) : null;
  const hover = (p: string | null) => setHover(p && key + p);
  const pin = (p: string | null) => togglePin(p && key + p);
  const order = [...new Set(entry.body?.flat().map((s) => s.phase).filter((p): p is string => !!p))];
  const phases = new Set(order);
  const marks = Object.fromEntries(order.map((p, i) => [p, i + 1]));
  const phaseAt = (target: EventTarget) => {
    const id = (target as Element).closest?.('[data-phase]')?.getAttribute('data-phase');
    return id && phases.has(id) ? id : null;
  };
  const when = entry.meta;
  const spec = entry.diagram ? specs[entry.diagram] : null;
  const tab = layer === 'human' ? 0 : -1;
  const work = catId === 'work';
  const sub = work ? entry.title : entry.org;

  return (
    <article className={`chapter${spec ? ' has-dia' : ''}`}>
      <div className="ch-read">
        {when && <p className="ch-num">{when}</p>}
        <h2 className="ch-title">{work ? entry.org : entry.title}</h2>
        {sub && <p className="ch-sub">{sub}</p>}
        <div className="ch-text" data-prov="trusted" data-prov-label="authored by Evan">

          {entry.body?.map((segs, i) => (
            <p key={i}>
              {segs.map((s, j) =>
                s.phase ? (
                  <span
                    key={j}
                    className={`seg${shown === s.phase ? ' on' : ''}`}
                    tabIndex={tab}
                    onPointerEnter={() => hover(s.phase!)}
                    onPointerLeave={() => hover(null)}
                    onFocus={() => hover(s.phase!)}
                    onBlur={() => hover(null)}
                    onClick={() => pin(s.phase!)}
                  >
                    <Text>{s.text}</Text>
                    <sup className="mark" aria-hidden="true">{marks[s.phase]}</sup>
                  </span>
                ) : (
                  <Text key={j}>{s.text}</Text>
                ),
              )}
            </p>
          ))}
          {entry.bullets && (
            <dl className="bullets">
              {entry.bullets.map(([k, v]) => <div key={k}><dt>{k}</dt><dd><Text>{v}</Text></dd></div>)}
            </dl>
          )}
          {entry.list && <p className="ch-list"><Text>{entry.list}</Text></p>}
          {entry.code && <code className="code">{entry.code}</code>}
          {entry.paper && (
            <a className="paper" href={entry.paper.href} tabIndex={tab} data-prov="untrusted" data-prov-label="peer-reviewed, leaves the site">
              <span className="paper-venue">{entry.paper.venue}</span>
              <span className="paper-title">{entry.paper.title}</span>
              <span className="paper-by">{entry.paper.byline}</span>
              <span className="paper-go">Read the paper ↗</span>
            </a>
          )}
          {entry.links && (
            <p className="ch-links">
              {entry.links.map((l) => (
                <a key={l.href} href={l.href} tabIndex={tab} data-prov={l.href.startsWith('/') ? 'trusted' : 'untrusted'} data-prov-label={l.href.startsWith('/') ? 'first-party file' : 'leaves the site'}>
                  {l.label} ↗
                </a>
              ))}
            </p>
          )}
        </div>
      </div>
      {spec && (
        <div
          className="ch-dia"
          data-prov="trusted"
          data-prov-label={entry.paper ? 'drawn from the paper' : 'generic, nothing confidential'}
          onPointerOver={(e) => e.pointerType === 'mouse' && hover(phaseAt(e.target))}
          onPointerLeave={() => hover(null)}
          onClick={(e) => pin(phaseAt(e.target))}
        >
          <Diagram spec={spec} active={shown} uid={`${layer}-${catId}-${index}`} marks={marks} />
        </div>
      )}
    </article>
  );
}

export function Journey() {
  const layer = useLayer();
  const id = useId();
  const { tab, setTab } = useShared();
  const cat = categories.find((c) => c.id === tab) ?? categories[0];
  const section = useRef<HTMLElement>(null);
  const focusable = layer === 'human' ? 0 : -1;

  const pick = (next: string) => {
    setTab(next);
    const top = section.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > innerHeight * 0.5) section.current?.scrollIntoView();
  };

  return (
    <section className="journey" ref={section} aria-label="Sections">
      <aside className="j-side">
        <nav className="index" role="tablist" aria-label="Sections">
          {categories.map((c) => (
            <button
              key={c.id}
              role="tab"
              id={id(`tab-${c.id}`)}
              aria-selected={c.id === cat.id}
              aria-controls={id('j-panel')}
              tabIndex={focusable}
              onClick={() => pick(c.id)}
            >
              <span className="ix-word">{c.label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="j-main" id={id('j-panel')} role="tabpanel" aria-labelledby={id(`tab-${cat.id}`)}>
        <div className="entries" key={cat.id}>
          {cat.entries.map((e, i) => <Chapter key={`${cat.id}-${e.title}`} catId={cat.id} entry={e} index={i} />)}
        </div>
      </div>

    </section>
  );
}
