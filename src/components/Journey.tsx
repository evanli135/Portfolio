import { useEffect, useRef } from 'react';
import { categories, links, site, type Entry } from '../data';
import { Diagram } from '../diagrams/Diagram';
import * as specs from '../diagrams/specs';
import { useId, useLayer, useShared } from '../layer';
import { AgentOnly, Text } from './Text';
import portrait from '../assets/portrait.jpg';

// Every section is its own scroll journey: one entry per screen. Wide screens pin
// the stage and crossfade entries as you scroll; phones stack them.

const STEP: Record<string, string> = { work: '100vh', coursework: '55vh' };

/** The big outlined readout: a year, a course number, or the entry's place in line. */
function readout(catId: string, e: Entry, i: number) {
  if (catId === 'coursework') return (e.org ?? '').split(' · ')[0];
  const years = (e.meta ?? '').split(' · ')[0].match(/\d{4}/g);
  return years ? years[years.length - 1] : String(i + 1).padStart(2, '0');
}

function Chapter({ catId, entry, index, total, on }: { catId: string; entry: Entry; index: number; total: number; on: boolean }) {
  const layer = useLayer();
  const { phase, setHover, togglePin } = useShared();
  const shown = on ? phase : null;
  const phases = new Set(entry.body?.flat().map((s) => s.phase).filter(Boolean));
  const phaseAt = (target: EventTarget) => {
    const id = (target as Element).closest?.('[data-phase]')?.getAttribute('data-phase');
    return id && phases.has(id) ? id : null;
  };
  const [when, ...rest] = (entry.meta ?? '').split(' · ');
  const spec = entry.diagram ? specs[entry.diagram] : null;
  const words = entry.body?.flat().map((s) => s.text).join('').split(/\s+/).length ?? 0;
  const tab = on && layer === 'human' ? 0 : -1;
  const work = catId === 'work';
  const sub = work ? entry.title : entry.org;

  return (
    <article className={`chapter${on ? ' on' : ''}${spec ? ' has-dia' : ' no-dia'}`} aria-hidden={!on || undefined}>
      <div className="ch-read">
        <p className="ch-num">{String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}{when ? ` · ${when}` : ''}</p>
        {spec && <p className="ch-year" aria-hidden="true">{readout(catId, entry, index)}</p>}
        <h3 className="ch-title">{work ? entry.org : entry.title}</h3>
        {sub && <p className="ch-sub">{sub}{rest.length ? ` · ${rest.join(' · ')}` : ''}</p>}
        <div className="ch-text" data-prov="trusted" data-prov-label="authored by Evan">
          {entry.body && (
            <AgentOnly id={`${catId}-${index}`} className="note-ch">
              {entry.body.length} {entry.body.length === 1 ? 'sentence' : 'sentences'} · {words} words{phases.size ? ` · ${phases.size} linked to the diagram` : ''}
            </AgentOnly>
          )}
          {entry.body?.map((segs, i) => (
            <p key={i}>
              {segs.map((s, j) =>
                s.phase ? (
                  <span
                    key={j}
                    className={`seg${shown === s.phase ? ' on' : ''}`}
                    tabIndex={tab}
                    onPointerEnter={() => setHover(s.phase!)}
                    onPointerLeave={() => setHover(null)}
                    onFocus={() => setHover(s.phase!)}
                    onBlur={() => setHover(null)}
                    onClick={() => togglePin(s.phase!)}
                  >
                    <Text>{s.text}</Text>
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
          {entry.code && <code className="code">{entry.code}</code>}
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
      {!spec && <p className="ch-big" aria-hidden="true">{readout(catId, entry, index)}</p>}
      {spec && (
        <div
          className="ch-dia"
          data-prov="trusted"
          data-prov-label={spec.illustrative ? 'illustrative, generic' : 'drawn from the paper'}
          onPointerOver={(e) => e.pointerType === 'mouse' && setHover(phaseAt(e.target))}
          onPointerLeave={() => setHover(null)}
          onClick={(e) => togglePin(phaseAt(e.target))}
        >
          <Diagram spec={spec} active={shown} uid={`${layer}-${catId}-${index}`} />
        </div>
      )}
    </article>
  );
}

export function Journey() {
  const layer = useLayer();
  const id = useId();
  const { tab, setTab, chapter, setChapter } = useShared();
  const cat = categories.find((c) => c.id === tab) ?? categories[0];
  const steps = useRef<(HTMLDivElement | null)[]>([]);
  const section = useRef<HTMLElement>(null);
  const focusable = layer === 'human' ? 0 : -1;

  useEffect(() => {
    if (layer !== 'human') return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setChapter(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    steps.current.forEach((s) => s && io.observe(s));
    return () => io.disconnect();
  }, [layer, cat.id, setChapter]);

  const pick = (next: string) => {
    setTab(next);
    setChapter(0);
    const top = section.current?.getBoundingClientRect().top ?? 0;
    if (top < 0 || top > innerHeight * 0.5) section.current?.scrollIntoView();
  };

  return (
    <section className="journey" ref={section} aria-label="Sections" style={{ '--step': STEP[cat.id] ?? '80vh' } as React.CSSProperties}>
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
              <sup data-prov="tool" data-prov-label="counted">{c.entries.length}</sup>
            </button>
          ))}
        </nav>
        <ol className="rail" aria-hidden="true">
          {cat.entries.map((e, i) => <li key={e.title} className={i === chapter ? 'on' : i < chapter ? 'past' : ''} />)}
        </ol>
        <span className="portrait-wrap" data-prov="trusted" data-prov-label="first-party photo">
          <img className="portrait" src={portrait} alt="Evan Li" width={640} height={640} loading="lazy" />
          <AgentOnly id="photo" className="note-photo">640 × 640 · 1 face · no hidden text</AgentOnly>
        </span>
      </aside>

      <div className="j-main" id={id('j-panel')} role="tabpanel" aria-labelledby={id(`tab-${cat.id}`)}>
        <div className="stage">
          <h2 className="j-label">{cat.label}</h2>
          {cat.entries.map((e, i) => (
            <Chapter key={`${cat.id}-${e.title}`} catId={cat.id} entry={e} index={i} total={cat.entries.length} on={i === chapter} />
          ))}
        </div>
        <div className="steps" aria-hidden="true">
          {cat.entries.map((e, i) => <div key={`${cat.id}-${e.title}`} className="step" data-i={i} ref={(el) => { steps.current[i] = el; }} />)}
        </div>
      </div>

      <footer className="j-foot">
        {links.slice(0, 2).map((l) => <a key={l.label} href={l.href} tabIndex={focusable}>{l.label} ↗</a>)}
        <span className="foot-egg">
          <AgentOnly id="egg" className="note-egg"><Text>TODO(evan): something worth finding</Text></AgentOnly>
        </span>
        <a href={`mailto:${site.email}`} tabIndex={focusable}>{site.email}</a>
      </footer>
    </section>
  );
}
