import type { Entry } from '../data';
import { Text } from './Text';

// Work with a story chapter already told its full story above; here it gets the one line.
export function EntryView({ entry }: { entry: Entry }) {
  const body = entry.diagram && entry.body ? [entry.body[1]] : entry.body;
  return (
    <article className="entry" data-prov="trusted" data-prov-label="authored">
      <div className="entry-head">
        <h3>{entry.title}</h3>
        {entry.aside && <span className="aside">{entry.aside}</span>}
      </div>
      {entry.org && <p className="org">{entry.org}</p>}
      {entry.meta && <p className="meta">{entry.meta}</p>}
      {body?.map((segs, i) => (
        <p key={i} className="body"><Text>{segs.map((s) => s.text).join('')}</Text></p>
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
          {entry.links.map((l) => (
            <a key={l.href} href={l.href} data-prov="untrusted" data-prov-label="leaves the site">{l.label} ↗</a>
          ))}
        </p>
      )}
    </article>
  );
}
