import { useEffect, useRef, useState } from 'react';

const R = 150; // lens radius in px

// The agent's-eye view: what this page is made of, by provenance.
// Labels name where content comes from. They never address the reader or a model.
export function Lens() {
  const [on, setOn] = useState(false);
  const [seen, setSeen] = useState(0);
  const [total, setTotal] = useState(0);
  const ring = useRef<HTMLDivElement>(null);
  const found = useRef(new Set<Element>());

  useEffect(() => {
    const root = document.documentElement;
    if (!on) { root.removeAttribute('data-lens'); return; }
    root.setAttribute('data-lens', 'on');
    const all = () => Array.from(document.querySelectorAll('[data-prov]'));
    setTotal(all().length);
    const mark = (el: Element) => {
      el.classList.add('seen');
      if (!found.current.has(el)) { found.current.add(el); setSeen(found.current.size); }
    };

    const fine = matchMedia('(pointer: fine)').matches;
    if (!fine) { all().forEach(mark); }

    let frame = 0;
    let x = -999, y = -999;
    const update = () => {
      frame = 0;
      if (ring.current) ring.current.style.transform = `translate(${x - R}px, ${y - R}px)`;
      for (const el of all()) {
        const r = el.getBoundingClientRect();
        const dx = Math.max(r.left - x, 0, x - r.right);
        const dy = Math.max(r.top - y, 0, y - r.bottom);
        if (dx * dx + dy * dy < R * R) mark(el); else el.classList.remove('seen');
      }
    };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; if (!frame) frame = requestAnimationFrame(update); };
    const scroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const key = (e: KeyboardEvent) => e.key === 'Escape' && setOn(false);
    if (fine) {
      window.addEventListener('pointermove', move);
      window.addEventListener('scroll', scroll, { passive: true });
    }
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('scroll', scroll);
      window.removeEventListener('keydown', key);
      cancelAnimationFrame(frame);
      all().forEach((el) => el.classList.remove('seen'));
      root.removeAttribute('data-lens');
    };
  }, [on]);

  return (
    <>
      <button className="lens-btn" aria-label="Agent's-eye view" aria-pressed={on} onClick={() => setOn(!on)}>
        <svg viewBox="0 0 20 20" aria-hidden="true">
          <circle cx="10" cy="10" r="7" className="gear-dash" />
          <circle cx="10" cy="10" r="2.2" className="lens-dot" />
        </svg>
        {on && <span className="lens-count">{seen}/{total}</span>}
      </button>
      {on && <div className="lens-ring" ref={ring} aria-hidden="true" />}
    </>
  );
}
