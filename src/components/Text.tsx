import { useLayer } from '../layer';

/** Plain text, with any TODO(evan) marked. In the agent layer, words become tokens. */
export function Text({ children }: { children: string }) {
  const agent = useLayer() === 'agent';
  const parts = children.split(/(TODO\(evan\)[^.·]*\.?)/);
  let n = 0;
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith('TODO(evan)')) return <mark key={i} className="todo">{p}</mark>;
        if (!agent) return p;
        return p.split(/(\s+)/).map((w, j) =>
          /^\s*$/.test(w) ? w : <span key={`${i}-${j}`} className={`tok ${n++ % 2 ? 'b' : 'a'}`}>{w}</span>,
        );
      })}
    </>
  );
}

/** Only exists in the agent layer: things an agent would notice. Positioned so it never moves layout. */
export function AgentOnly({ id, className, children }: { id: string; className?: string; children: React.ReactNode }) {
  if (useLayer() !== 'agent') return null;
  return <span className={`agent-only find ${className ?? ''}`} data-find={id}>{children}</span>;
}
