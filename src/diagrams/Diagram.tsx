// Renders a trust-boundary diagram from a spec. Each spec carries two layouts:
// `wide` and `tall` (used below 480px). Both are drawn; CSS shows one.

type Rect = { x: number; y: number; w: number; h: number };
type Pt = [number, number];
type Anchor = { x: number; y: number; anchor?: 'start' | 'middle' | 'end' };

export type Spec = {
  title: string;
  desc: string;
  view: { wide: [number, number]; tall: [number, number] };
  boundaries: { label: string; tallLabelBottom?: boolean; wide: Rect; tall: Rect }[];
  nodes: {
    id: string;
    label: string; // '\n' splits lines
    sub?: string;
    kind: 'trusted' | 'untrusted';
    badge?: string;
    wide: Rect;
    tall: Rect;
  }[];
  edges: {
    kind: 'flow' | 'attack' | 'blocked';
    wide: Pt[];
    tall: Pt[];
    label?: { text: string; wide: Anchor; tall: Anchor };
  }[];
  tags?: { label: string; wide: Anchor; tall: Anchor }[];
};

type Layout = 'wide' | 'tall';

const BAR = 9;

function blockedBar(pts: Pt[]) {
  const [x1, y1] = pts[pts.length - 2];
  const [x2, y2] = pts[pts.length - 1];
  const horizontal = Math.abs(x2 - x1) > Math.abs(y2 - y1);
  return horizontal
    ? `M${x2} ${y2 - BAR}V${y2 + BAR}`
    : `M${x2 - BAR} ${y2}H${x2 + BAR}`;
}

type Marks = Record<string, number>;

function Svg({ spec, layout, active, uid, marks }: { spec: Spec; layout: Layout; active: string | null; uid: string; marks: Marks }) {
  const [vw, vh] = spec.view[layout];
  const tid = `${uid}-${layout}-t`;
  const did = `${uid}-${layout}-d`;
  return (
    <svg
      className={`dia-svg dia-${layout}`}
      viewBox={`0 0 ${vw} ${vh}`}
      role="img"
      aria-labelledby={`${tid} ${did}`}
      data-active={active ?? undefined}
    >
      <title id={tid}>{spec.title}</title>
      <desc id={did}>{spec.desc}</desc>
      <defs>
        <marker id={`${uid}-${layout}-ink`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1L9 5L0 9" className="dia-head ink" />
        </marker>
        <marker id={`${uid}-${layout}-acc`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 1L9 5L0 9" className="dia-head acc" />
        </marker>
      </defs>

      {spec.boundaries.map((b) => {
        const r = b[layout];
        return (
          <g key={b.label} className="dia-boundary">
            <rect x={r.x} y={r.y} width={r.w} height={r.h} />
            <text x={r.x + 10} y={layout === 'tall' && b.tallLabelBottom ? r.y + r.h - 10 : r.y + 18}>{b.label}</text>
          </g>
        );
      })}

      {spec.edges.map((e, i) => {
        const pts = e[layout];
        const d = 'M' + pts.map((p) => p.join(' ')).join('L');
        const marker = e.kind === 'flow' ? 'ink' : 'acc';
        return (
          <g key={i} className={`dia-edge ${e.kind}`}>
            <path d={d} markerEnd={e.kind === 'blocked' ? undefined : `url(#${uid}-${layout}-${marker})`} />
            {e.kind === 'blocked' && <path className="dia-bar" d={blockedBar(pts)} />}
            {e.label && (
              <text className="dia-edge-label" x={e.label[layout].x} y={e.label[layout].y} textAnchor={e.label[layout].anchor ?? 'start'}>
                {e.label.text}
              </text>
            )}
          </g>
        );
      })}

      {spec.nodes.map((n) => {
        const r = n[layout];
        const lines = n.label.split('\n');
        const total = lines.length + (n.sub ? 1 : 0);
        const top = r.y + r.h / 2 - ((total - 1) * 15) / 2 + 4;
        const on = active === n.id;
        return (
          <g key={n.id} className={`dia-node ${n.kind}${on ? ' on' : ''}`} data-phase={n.id}>
            <rect x={r.x} y={r.y} width={r.w} height={r.h} />
            {lines.map((l, i) => (
              <text key={i} x={r.x + r.w / 2} y={top + i * 15} textAnchor="middle">{l}</text>
            ))}
            {n.sub && (
              <text className="dia-sub" x={r.x + r.w / 2} y={top + lines.length * 15} textAnchor="middle">{n.sub}</text>
            )}
            {marks[n.id] && (
              <g className="dia-mark">
                <circle cx={r.x} cy={r.y} r={9} />
                <text x={r.x} y={r.y + 3.5} textAnchor="middle">{marks[n.id]}</text>
              </g>
            )}
            {n.badge && (
              <g className="dia-badge">
                <rect x={r.x + r.w - 84} y={r.y - 10} width={80} height={20} rx={10} />
                <text x={r.x + r.w - 44} y={r.y + 4} textAnchor="middle">{n.badge}</text>
              </g>
            )}
          </g>
        );
      })}

      {spec.tags?.map((t) => {
        const a = t[layout];
        const w = t.label.length * 7.2 + 18;
        return (
          <g key={t.label} className="dia-tag">
            <rect x={a.x} y={a.y - 13} width={w} height={22} rx={11} />
            <text x={a.x + w / 2} y={a.y + 2} textAnchor="middle">{t.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

/** `marks` numbers the nodes that the text links to, so the pairing reads without hovering. */
export function Diagram({ spec, active, uid, marks = {} }: { spec: Spec; active: string | null; uid: string; marks?: Marks }) {
  return (
    <figure className="dia">
      <Svg spec={spec} layout="wide" active={active} uid={uid} marks={marks} />
      <Svg spec={spec} layout="tall" active={active} uid={uid} marks={marks} />
    </figure>
  );
}
