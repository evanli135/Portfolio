import { Link } from 'react-router-dom';
import { site, links, work, record, person } from '../data';
import { posts } from '../posts';
import { WorkItem } from '../components/WorkItem';
import { Text } from '../components/Text';

export function Home() {
  return (
    <main className="page">
      <header className="top">
        <h1>{site.name}</h1>
        <p className="line"><Text>{site.line}</Text></p>
        <nav id="top-links" className="top-links" aria-label="Links">
          {links.map((l) => <a key={l.label} href={l.href}>{l.label}</a>)}
        </nav>
      </header>

      <section className="works" aria-label="Work">
        {work.map((w, i) => <WorkItem key={w.id} item={w} index={i} />)}
      </section>

      {posts.length > 0 && (
        <section className="block" aria-labelledby="writing-h">
          <h2 id="writing-h">Writing</h2>
          <ul className="list">
            {posts.map((p) => (
              <li key={p.slug}>
                <Link to={`/writing/${p.slug}`}>{p.title}</Link>
                <span className="when">{p.draft ? 'Draft' : <Text>{p.date}</Text>}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="block" aria-labelledby="record-h">
        <h2 id="record-h">Record</h2>
        {record.map((g) => (
          <div className="group" key={g.heading}>
            <h3>{g.heading}</h3>
            <ul className="list">
              {g.items.map((it) => (
                <li key={it.name}>
                  <span className="name">{it.href ? <a href={it.href}>{it.name}</a> : it.name}</span>
                  <span className="detail"><Text>{it.detail}</Text></span>
                  {it.when && <span className="when">{it.when}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="block" aria-labelledby="person-h">
        <h2 id="person-h">Otherwise</h2>
        <p><Text>{person.text}</Text></p>
        <ul className="list">
          {person.links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
        </ul>
      </section>

      <footer className="foot">
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </footer>
    </main>
  );
}
