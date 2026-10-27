import { useEffect, useState } from 'react';
import { links, site } from '../data';
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

// Phone-sized symbols for the corner links; desktop shows the words.
function LinkIcon({ label }: { label: string }) {
  const shape: Record<string, React.ReactNode> = {
    'Résumé': <path className="ic-line" d="M5 2.5h7l3 3v12H5zM12 2.5v3h3M7.5 9h5M7.5 12h5M7.5 15h3" />,
    GitHub: (
      <path
        className="ic-fill"
        transform="translate(2 2)"
        d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
      />
    ),
    LinkedIn: (
      <>
        <rect className="ic-line" x="2.5" y="2.5" width="15" height="15" rx="2" />
        <circle className="ic-fill" cx="6.6" cy="6.6" r="1.1" />
        <path className="ic-line" d="M6.6 9.2v5.3M9.6 14.5V9.2M9.6 11.8c0-1.6 1-2.6 2.3-2.6s2.2.9 2.2 2.6v2.7" />
      </>
    ),
    Email: <path className="ic-line" d="M2.5 4.5h15v11h-15zM3 5.2l7 5.6 7-5.6" />,
  };
  return (
    <svg className="short" viewBox="0 0 20 20" aria-hidden="true">
      {shape[label]}
    </svg>
  );
}

/** Fixed top-right: the links and sun / moon. */
export function Corner() {
  const { theme, setTheme } = useShared();
  const [past, setPast] = useState(false);
  useEffect(() => {
    let frame = 0;
    const check = () => { frame = 0; setPast(scrollY > innerHeight * 0.8); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(check); };
    check();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(frame); };
  }, []);
  return (
    <>
    <a className={`brand${past ? ' shown' : ''}`} href="#" tabIndex={past ? 0 : -1} aria-hidden={!past}
      onClick={(e) => { e.preventDefault(); scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' }); }}>
      {site.name}
    </a>
    <div className="corner">
      <nav className="corner-links" aria-label="Links">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            data-prov={l.href.startsWith('/') ? 'trusted' : 'untrusted'}
            data-prov-label={l.href.startsWith('/') ? 'first-party file' : l.href.startsWith('mailto') ? 'opens your mail' : 'leaves the site'}
            aria-label={l.label}
          >
            <span className="long">{l.label}</span>
            <LinkIcon label={l.label} />
          </a>
        ))}
      </nav>

      <button className="theme" aria-label={NAME[theme]} onClick={() => setTheme(NEXT[theme])}>
        <ThemeIcon theme={theme} />
      </button>
    </div>
    </>
  );
}
