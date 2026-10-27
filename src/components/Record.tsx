import { useEffect, useState } from 'react';
import { categories, links, site, type Category } from '../data';
import { posts } from '../posts';
import { EntryView } from './EntryView';
import portrait from '../assets/portrait.jpg';

// Posts join the Writing category; drafts only appear in dev builds.
const all: Category[] = categories.map((c) =>
  c.id !== 'writing'
    ? c
    : {
        ...c,
        entries: [
          ...posts.map((p) => ({
            title: p.title,
            org: p.draft ? 'Draft' : 'Essay',
            meta: p.draft ? undefined : p.date,
            links: [{ label: 'Read', href: `/writing/${p.slug}` }],
          })),
          ...c.entries,
        ],
      },
);

const fromHash = () => {
  const id = window.location.hash.slice(1);
  return all.some((c) => c.id === id) ? id : all[0].id;
};

export function Record() {
  const [current, setCurrent] = useState(fromHash);
  const cat = all.find((c) => c.id === current)!;

  useEffect(() => {
    const onHash = () => setCurrent(fromHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const pick = (id: string) => {
    setCurrent(id);
    history.replaceState(null, '', `#${id}`);
    const panel = document.getElementById('rec-panel');
    if (panel && panel.getBoundingClientRect().top < 0) panel.scrollIntoView();
  };

  return (
    <section className="record" aria-label="Record">
      <div className="rec-side">
        <nav className="index" role="tablist" aria-label="Sections">
          {all.map((c) => (
            <button
              key={c.id}
              role="tab"
              id={`tab-${c.id}`}
              aria-selected={c.id === current}
              aria-controls="rec-panel"
              onClick={() => pick(c.id)}
            >
              <span className="ix-word">{c.label}</span>
              <sup>{c.entries.length}</sup>
            </button>
          ))}
        </nav>
        <img className="portrait" src={portrait} alt="Evan Li" width={560} height={581} loading="lazy" />
      </div>

      <div className="rec-panel" id="rec-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`}>
        <h2 className="panel-label">
          <span>{String(all.indexOf(cat) + 1).padStart(2, '0')}</span> {cat.label}
        </h2>
        <div className="entries" key={cat.id}>
          {cat.entries.map((e, i) => <EntryView key={e.title} entry={e} uid={`${cat.id}-${i}`} />)}
        </div>
      </div>

      <footer className="rec-foot">
        {links.slice(0, 2).map((l) => <a key={l.label} href={l.href}>{l.label} ↗</a>)}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </footer>
    </section>
  );
}
