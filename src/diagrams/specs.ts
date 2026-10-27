import type { Spec } from './Diagram';

// Node ids double as phase ids; data.ts segments reference them.

export const matrix: Spec = {
  title: 'NL-to-SQL evaluation loop (illustrative)',
  desc: 'A question goes to a model, which writes a SQL query that runs against a database. An evaluation harness compares the result to the expected one and feeds the score back to the model. No boundaries yet.',
  illustrative: true,
  view: { wide: [760, 250], tall: [360, 500] },
  boundaries: [],
  nodes: [
    { id: 'question', label: 'Question', sub: 'plain English', kind: 'trusted', wide: { x: 16, y: 60, w: 130, h: 56 }, tall: { x: 110, y: 10, w: 140, h: 52 } },
    { id: 'model', label: 'Model', kind: 'trusted', wide: { x: 196, y: 60, w: 130, h: 56 }, tall: { x: 110, y: 100, w: 140, h: 52 } },
    { id: 'sql', label: 'SQL query', kind: 'trusted', wide: { x: 376, y: 60, w: 130, h: 56 }, tall: { x: 110, y: 190, w: 140, h: 52 } },
    { id: 'db', label: 'Database', sub: 'live', kind: 'trusted', wide: { x: 556, y: 60, w: 150, h: 56 }, tall: { x: 110, y: 280, w: 140, h: 52 } },
    { id: 'eval', label: 'Eval harness', sub: 'expected vs. actual', kind: 'trusted', wide: { x: 286, y: 176, w: 200, h: 56 }, tall: { x: 90, y: 410, w: 180, h: 56 } },
  ],
  edges: [
    { kind: 'flow', wide: [[146, 88], [196, 88]], tall: [[180, 62], [180, 100]] },
    { kind: 'flow', wide: [[326, 88], [376, 88]], tall: [[180, 152], [180, 190]] },
    { kind: 'flow', wide: [[506, 88], [556, 88]], tall: [[180, 242], [180, 280]] },
    { kind: 'flow', wide: [[631, 116], [631, 204], [486, 204]], tall: [[180, 332], [180, 410]] },
    {
      kind: 'flow',
      wide: [[286, 204], [261, 204], [261, 116]],
      tall: [[90, 438], [40, 438], [40, 126], [110, 126]],
      label: { text: 'Score', wide: { x: 214, y: 168 }, tall: { x: 46, y: 300 } },
    },
  ],
};

export const ace: Spec = {
  title: 'ACE architecture',
  desc: 'A trusted user query becomes an abstract plan, then a concrete plan over installed apps that is statically checked, then execution with barriers between apps, all inside one enforcement boundary. Third-party apps sit outside. Their poisoned descriptions and poisoned outputs stop at the boundary.',
  view: { wide: [760, 310], tall: [360, 640] },
  boundaries: [{ label: 'Enforced by ACE', wide: { x: 136, y: 40, w: 452, h: 220 }, tall: { x: 20, y: 80, w: 320, h: 380 } }],
  nodes: [
    { id: 'query', label: 'User query', kind: 'trusted', wide: { x: 16, y: 120, w: 96, h: 52 }, tall: { x: 130, y: 10, w: 100, h: 44 } },
    { id: 'abstract', label: 'Abstract plan', sub: 'query only', kind: 'trusted', wide: { x: 152, y: 110, w: 124, h: 64 }, tall: { x: 100, y: 110, w: 160, h: 56 } },
    { id: 'concrete', label: 'Concrete plan', sub: 'installed apps', badge: 'static check', kind: 'trusted', wide: { x: 300, y: 110, w: 124, h: 64 }, tall: { x: 100, y: 210, w: 160, h: 56 } },
    { id: 'execute', label: 'Execute', sub: 'with barriers', kind: 'trusted', wide: { x: 448, y: 110, w: 124, h: 64 }, tall: { x: 100, y: 310, w: 160, h: 56 } },
    { id: 'apps', label: 'Third-party\napps', kind: 'untrusted', wide: { x: 640, y: 110, w: 104, h: 64 }, tall: { x: 110, y: 560, w: 140, h: 52 } },
  ],
  edges: [
    { kind: 'flow', wide: [[112, 146], [152, 146]], tall: [[150, 54], [150, 110]] },
    { kind: 'flow', wide: [[276, 142], [300, 142]], tall: [[150, 166], [150, 210]] },
    { kind: 'flow', wide: [[424, 142], [448, 142]], tall: [[150, 266], [150, 310]] },
    { kind: 'flow', wide: [[572, 142], [640, 142]], tall: [[180, 366], [180, 560]] },
    {
      kind: 'blocked',
      wide: [[692, 110], [692, 22], [214, 22], [214, 40]],
      tall: [[110, 586], [8, 586], [8, 138], [20, 138]],
      label: { text: 'Poisoned descriptions', wide: { x: 452, y: 15, anchor: 'middle' }, tall: { x: 20, y: 632 } },
    },
    {
      kind: 'blocked',
      wide: [[692, 174], [692, 288], [510, 288], [510, 260]],
      tall: [[250, 586], [352, 586], [352, 338], [340, 338]],
      label: { text: 'Poisoned outputs', wide: { x: 600, y: 304, anchor: 'middle' }, tall: { x: 340, y: 632, anchor: 'end' } },
    },
  ],
};

export const vestmark: Spec = {
  title: 'Approval gate for an advisory agent (illustrative)',
  desc: 'An agent outside the boundary proposes a portfolio change. A policy and guardrail check runs, then a human approval gate on the edge of client accounts, then the change is executed and logged. Sensitive data leaving the check is blocked.',
  illustrative: true,
  view: { wide: [760, 290], tall: [360, 610] },
  boundaries: [
    { label: 'Guardrails', wide: { x: 160, y: 40, w: 584, h: 220 }, tall: { x: 20, y: 90, w: 320, h: 500 } },
    { label: 'Client accounts', tallLabelBottom: true, wide: { x: 420, y: 70, w: 310, h: 160 }, tall: { x: 40, y: 300, w: 280, h: 270 } },
  ],
  nodes: [
    { id: 'agent', label: 'Agent', sub: 'proposes change', kind: 'untrusted', wide: { x: 16, y: 112, w: 110, h: 56 }, tall: { x: 120, y: 10, w: 120, h: 52 } },
    { id: 'check', label: 'Policy check', sub: 'and guardrails', kind: 'trusted', wide: { x: 186, y: 112, w: 130, h: 56 }, tall: { x: 128, y: 120, w: 104, h: 56 } },
    { id: 'approval', label: 'Human\napproval', kind: 'trusted', wide: { x: 360, y: 112, w: 120, h: 56 }, tall: { x: 110, y: 272, w: 140, h: 56 } },
    { id: 'execute', label: 'Executed\nand logged', kind: 'trusted', wide: { x: 560, y: 112, w: 150, h: 56 }, tall: { x: 100, y: 420, w: 160, h: 56 } },
  ],
  edges: [
    { kind: 'flow', wide: [[126, 140], [186, 140]], tall: [[180, 62], [180, 120]] },
    { kind: 'flow', wide: [[316, 140], [360, 140]], tall: [[180, 176], [180, 272]] },
    { kind: 'flow', wide: [[480, 140], [560, 140]], tall: [[180, 328], [180, 420]] },
    {
      kind: 'blocked',
      wide: [[251, 168], [251, 260]],
      tall: [[128, 148], [20, 148]],
      label: { text: 'Sensitive data', wide: { x: 262, y: 226 }, tall: { x: 26, y: 138 } },
    },
  ],
};

export const keysight: Spec = {
  title: 'Agentic penetration test loop (illustrative)',
  desc: 'A loop: plan attack, run via MCP, observe response, record and classify, then back to planning. The firewall under test sits inside a test scope boundary, reachable only through the MCP tool. Direct access is blocked. Attack types: SQL injection, prompt injection, denial of service.',
  illustrative: true,
  view: { wide: [760, 310], tall: [360, 425] },
  boundaries: [{ label: 'Test scope', wide: { x: 180, y: 190, w: 350, h: 110 }, tall: { x: 210, y: 110, w: 140, h: 210 } }],
  nodes: [
    { id: 'plan', label: 'Plan attack', kind: 'trusted', wide: { x: 16, y: 60, w: 140, h: 52 }, tall: { x: 28, y: 40, w: 130, h: 48 } },
    { id: 'run', label: 'Run via MCP', kind: 'trusted', wide: { x: 196, y: 60, w: 140, h: 52 }, tall: { x: 28, y: 130, w: 130, h: 48 } },
    { id: 'observe', label: 'Observe\nresponse', kind: 'trusted', wide: { x: 376, y: 60, w: 140, h: 52 }, tall: { x: 28, y: 220, w: 130, h: 48 } },
    { id: 'record', label: 'Record and\nclassify', kind: 'trusted', wide: { x: 556, y: 60, w: 170, h: 52 }, tall: { x: 28, y: 310, w: 130, h: 48 } },
    { id: 'mcp', label: 'MCP tool', kind: 'trusted', wide: { x: 270, y: 172, w: 120, h: 36 }, tall: { x: 182, y: 134, w: 70, h: 40 } },
    { id: 'firewall', label: 'Firewall\nunder test', kind: 'trusted', wide: { x: 260, y: 240, w: 180, h: 50 }, tall: { x: 226, y: 200, w: 112, h: 64 } },
  ],
  edges: [
    { kind: 'flow', wide: [[156, 86], [196, 86]], tall: [[93, 88], [93, 130]] },
    { kind: 'flow', wide: [[336, 86], [376, 86]], tall: [[93, 178], [93, 220]] },
    { kind: 'flow', wide: [[516, 86], [556, 86]], tall: [[93, 268], [93, 310]] },
    { kind: 'flow', wide: [[641, 60], [641, 28], [86, 28], [86, 60]], tall: [[28, 334], [12, 334], [12, 64], [28, 64]] },
    { kind: 'flow', wide: [[330, 112], [330, 172]], tall: [[158, 154], [182, 154]] },
    { kind: 'attack', wide: [[330, 208], [330, 240]], tall: [[236, 174], [236, 200]] },
    { kind: 'flow', wide: [[390, 182], [446, 182], [446, 112]], tall: [[196, 174], [196, 244], [158, 244]] },
    {
      kind: 'blocked',
      wide: [[86, 112], [86, 245], [180, 245]],
      tall: [[158, 64], [290, 64], [290, 110]],
      label: { text: 'Direct access', wide: { x: 94, y: 263 }, tall: { x: 172, y: 56 } },
    },
  ],
  tags: [
    { label: 'SQL injection', wide: { x: 548, y: 212 }, tall: { x: 210, y: 345 } },
    { label: 'Prompt injection', wide: { x: 548, y: 242 }, tall: { x: 210, y: 375 } },
    { label: 'DoS', wide: { x: 548, y: 272 }, tall: { x: 210, y: 405 } },
  ],
};
