import { links } from '../data';
import { useShared, type Theme } from '../layer';

const NEXT: Record<Theme, Theme> = { auto: 'light', light: 'dark', dark: 'auto' };
const NAME: Record<Theme, string> = { auto: 'Theme: follows your system', light: 'Theme: sun', dark: 'Theme: moon' };

function ThemeIcon({ theme }: { theme: Theme }) {
  if (theme === 'light')
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <circle cx="10" cy="10" r="3.6" className="ic-fill" />
        <path className="ic-line" d="M10 1.5v2.4M10 16.1v2.4M1.5 10h2.4M16.1 10h2.4M4 4l1.7 1.7M14.3 14.3L16 16M4 16l1.7-1.7M14.3 5.7L16 4" />
      </svg>
    );
  if (theme === 'dark')
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <path className="ic-fill" d="M15.6 12.6A6.6 6.6 0 0 1 7.4 4.4a6.6 6.6 0 1 0 8.2 8.2z" />
      </svg>
    );
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <circle cx="10" cy="10" r="6.6" className="ic-line" />
      <path className="ic-fill" d="M10 3.4a6.6 6.6 0 0 0 0 13.2z" />
    </svg>
  );
}

/** Fixed top-right: the five links, what the lens has found, and sun / moon. */
export function Corner() {
  const { theme, setTheme, found, finds } = useShared();
  return (
    <div className="corner">
      <nav className="corner-links" aria-label="Links">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            data-prov={l.href.startsWith('/') ? 'trusted' : 'untrusted'}
            data-prov-label={l.href.startsWith('/') ? 'first-party file' : l.href.startsWith('mailto') ? 'opens your mail' : 'leaves the site'}
          >
            {l.label}
          </a>
        ))}
      </nav>
      {finds > 0 && (
        <span className="found" role="img" aria-label={`${found} of ${finds} found`}>
          {Array.from({ length: finds }, (_, i) => <i key={i} className={i < found ? 'on' : ''} />)}
        </span>
      )}
      <button className="theme" aria-label={NAME[theme]} onClick={() => setTheme(NEXT[theme])}>
        <ThemeIcon theme={theme} />
      </button>
    </div>
  );
}
