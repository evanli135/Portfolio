import { useEffect, useRef } from 'react';

// The cursor is the lens. Inside it, the agent layer shows through.
// On touch screens it rests mid-screen and moves to wherever you touch.
export function Lens() {
  const ring = useRef<HTMLDivElement>(null);
  const hud = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const agent = document.querySelector<HTMLElement>('.agent-layer');
    const human = document.querySelector<HTMLElement>('.human-layer');
    if (!agent || !human) return;
    const radius = () => (innerWidth < 640 ? 64 : 90);
    let x = innerWidth / 2;
    let y = innerHeight * 0.55;
    let frame = 0;

    const describe = (el: Element | null) => {
      if (!el || !human.contains(el)) return '';
      const prov = el.closest('[data-prov]');
      const tag = el.closest('a') ? 'link' : el.closest('button') ? 'button' : el.closest('svg') ? 'diagram' : el.closest('img') ? 'image' : el.closest('h1,h2,h3') ? 'heading' : 'text';
      const label = prov?.getAttribute('data-prov-label');
      return label ? `${tag} · ${label}` : '';
    };

    const update = () => {
      frame = 0;
      const r = radius();
      agent.style.clipPath = `circle(${r}px at ${x}px ${y + scrollY}px)`;
      if (ring.current) {
        const over = !!document.elementFromPoint(x, y)?.closest('a, button');
        ring.current.style.transform = `translate(${x}px, ${y}px) scale(${over ? 0.86 : 1})`;
        ring.current.style.setProperty('--r', `${r}px`);
        ring.current.toggleAttribute('data-flip', x > innerWidth * 0.6);
      }
      if (hud.current) hud.current.textContent = describe(document.elementFromPoint(x, y));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    const move = (e: PointerEvent) => { x = e.clientX; y = e.clientY; schedule(); };
    const touch = (e: TouchEvent) => { const t = e.touches[0]; if (t) { x = t.clientX; y = t.clientY; schedule(); } };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', move, { passive: true });
    window.addEventListener('touchmove', touch, { passive: true });
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
    return () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', move);
      window.removeEventListener('touchmove', touch);
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="lens" ref={ring} aria-hidden="true">
      <svg className="lens-svg" viewBox="-100 -100 200 200">
        <circle r="99" className="lens-edge" />
        <path d="M0 -99V-84M0 84V99M-99 0H-84M84 0H99" className="lens-tick" />
        <path d="M-5 0H5M0 -5V5" className="lens-cross" />
      </svg>
      <span className="lens-hud" ref={hud} />
    </div>
  );
}
