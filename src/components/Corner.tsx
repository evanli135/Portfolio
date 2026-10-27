import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { links } from '../data';

type Theme = 'auto' | 'light' | 'dark';
const THEMES: Theme[] = ['auto', 'light', 'dark'];

function readTheme(): Theme {
  try {
    const t = localStorage.getItem('theme');
    if (t === 'light' || t === 'dark') return t;
  } catch { /* storage blocked */ }
  return 'auto';
}

function applyTheme(t: Theme) {
  if (t === 'auto') document.documentElement.removeAttribute('data-theme');
  else document.documentElement.setAttribute('data-theme', t);
  try {
    if (t === 'auto') localStorage.removeItem('theme');
    else localStorage.setItem('theme', t);
  } catch { /* storage blocked */ }
}

/** Fixed top-right: the five links once the header scrolls away, and the theme setting. */
export function Corner() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const [open, setOpen] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const menu = useRef<HTMLDivElement>(null);
  const { pathname } = useLocation();

  useEffect(() => {
    const header = document.getElementById('top-links');
    if (!header) { setShowLinks(true); return; }
    const io = new IntersectionObserver(([e]) => setShowLinks(!e.isIntersecting));
    io.observe(header);
    return () => io.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const close = (e: PointerEvent | KeyboardEvent) => {
      if (e instanceof KeyboardEvent ? e.key === 'Escape' : !menu.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', close);
    window.addEventListener('keydown', close);
    return () => {
      window.removeEventListener('pointerdown', close);
      window.removeEventListener('keydown', close);
    };
  }, [open]);

  return (
    <div className="corner">
      <nav className={`corner-links${showLinks ? ' shown' : ''}`} aria-label="Quick links" aria-hidden={!showLinks}>
        {links.map((l) => (
          <a key={l.label} href={l.href} tabIndex={showLinks ? 0 : -1}>{l.label}</a>
        ))}
      </nav>
      <div className="settings" ref={menu}>
        <button className="gear" aria-label="Theme" aria-expanded={open} onClick={() => setOpen(!open)}>
          <svg viewBox="0 0 20 20" aria-hidden="true">
            <rect x="3.5" y="3.5" width="13" height="13" className="gear-dash" />
            <rect x="7.5" y="7.5" width="5" height="5" className="gear-solid" />
          </svg>
        </button>
        {open && (
          <div className="menu" role="radiogroup" aria-label="Theme">
            {THEMES.map((t) => (
              <button
                key={t}
                role="radio"
                aria-checked={theme === t}
                onClick={() => { setTheme(t); applyTheme(t); }}
              >
                {t[0].toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
