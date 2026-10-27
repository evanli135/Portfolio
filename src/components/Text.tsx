/** Plain text, with any TODO(evan) marked so it can't be missed. */
export function Text({ children }: { children: string }) {
  const parts = children.split(/(TODO\(evan\)[^.·]*\.?)/);
  return (
    <>
      {parts.map((p, i) => (p.startsWith('TODO(evan)') ? <mark key={i} className="todo">{p}</mark> : p))}
    </>
  );
}
