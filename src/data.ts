// All site content. Add a job, paper, or post here without touching components.
// Anything Evan hasn't confirmed is a visible TODO(evan).

export type Link = { label: string; href: string };

/** A piece of a sentence. `phase` ties it to a diagram node of the same id. */
export type Segment = { text: string; phase?: string };

export type Work = {
  id: string;
  name: string;
  meta: string;
  diagram: 'ace' | 'vestmark' | 'keysight';
  /** Exactly three: the problem, what he did, the result. */
  sentences: [Segment[], Segment[], Segment[]];
  link?: Link;
};

export type RecordItem = {
  name: string;
  detail: string;
  when?: string;
  href?: string;
};

export const site = {
  name: 'Evan Li',
  line: 'TODO(evan): write it',
  url: 'https://evanli.org/',
  email: 'evanlie.737@gmail.com',
};

export const links: Link[] = [
  // TODO(evan): replace public/evan-li-resume.pdf with the final PDF (current file is the old résumé)
  { label: 'Résumé', href: '/evan-li-resume.pdf' },
  { label: 'Paper', href: 'https://arxiv.org/abs/2504.20984' },
  { label: 'GitHub', href: 'https://github.com/evanli135' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-li-ff/' },
  { label: 'Email', href: `mailto:${site.email}` },
];

const t = (text: string, phase?: string): Segment => ({ text, phase });

export const work: Work[] = [
  {
    id: 'ace',
    name: 'ACE',
    meta: 'NDSS 2026 · Co-first author with Tushin Mallick and Evan Rose; with William Robertson, Alina Oprea, Cristina Nita-Rotaru',
    diagram: 'ace',
    sentences: [
      [t('Apps installed into an LLM agent can hijack it, through a poisoned description while it plans or a poisoned output while it runs.')],
      [
        t('ACE '),
        t('builds an abstract plan from the trusted user query alone', 'abstract'),
        t(', '),
        t('maps it onto installed apps and statically checks its information flow', 'concrete'),
        t(', then '),
        t('executes it with data and capability barriers between apps', 'execute'),
        t('.'),
      ],
      [t('It blocked every attack in the InjecAgent and Agent Security Bench benchmarks.')],
    ],
    link: { label: 'Read the paper', href: 'https://arxiv.org/abs/2504.20984' },
  },
  {
    id: 'vestmark',
    name: 'Vestmark',
    meta: 'TODO(evan): title · Jan to Jun 2026',
    diagram: 'vestmark',
    sentences: [
      [t('Financial advisory agents propose portfolio changes and handle client data.')],
      [
        t('I built '),
        t('human-in-the-loop approval gates for portfolio changes', 'approval'),
        t(', '),
        t('guardrails against sensitive data leaking out', 'check'),
        t(', and the '),
        t('memory, retrieval, persistence, and observability layers', 'execute'),
        t(' under the agent pipelines.'),
      ],
      [t('TODO(evan): the result, one sentence.')],
    ],
  },
  {
    id: 'keysight',
    name: 'Keysight',
    meta: 'TODO(evan): title · Jun to Aug 2026',
    diagram: 'keysight',
    sentences: [
      [t('The way to know a firewall holds is to attack it.')],
      [
        t('I built '),
        t('an agentic penetration testing service', 'plan'),
        t(' that '),
        t('runs SQL injection, prompt injection, and denial-of-service attacks', 'run'),
        t(' against firewall devices, and '),
        t('an MCP service that lets agents drive physical test chassis', 'mcp'),
        t('.'),
      ],
      [t('TODO(evan): the result, one sentence.')],
    ],
  },
];

export const record: { heading: string; items: RecordItem[] }[] = [
  {
    heading: 'Also',
    items: [
      { name: 'Matrix Origin', when: 'Jul to Sep 2024', detail: 'NL-to-SQL evaluation infrastructure. 40% query accuracy gain.' },
      {
        name: 'Andal',
        detail: 'Embedded event store in C. Columnar storage, WAL, crash recovery, inverted indices, Python C API.',
        href: 'https://github.com/evanli135/Andal',
      },
      // TODO(evan): keep or cut LoreBoard and Mario City (both on the old site)
    ],
  },
  {
    heading: 'Education',
    items: [
      {
        name: 'Northeastern University',
        when: '2023 to May 2027',
        // TODO(evan): confirm concentration and GPA (old site said Systems, 3.83)
        detail: 'B.S. Computer Science. TODO(evan): concentration, GPA if wanted.',
      },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { name: 'Languages', detail: 'Python, TypeScript, C, C++, Rust, Java, Ruby' },
      { name: 'Agents', detail: 'LangChain, Mastra, MCP, AWS Bedrock, RAG' },
      { name: 'Systems', detail: 'PostgreSQL, Redis, Docker, Kubernetes, AWS, Linux' },
      { name: 'Observability', detail: 'OpenTelemetry, Grafana' },
    ],
  },
];

export const person = {
  // TODO(evan): confirm Blades in Blue stays (it was on the old site)
  text: 'TODO(evan): interests, things he makes or loves outside work.',
  links: [{ label: 'Blades in Blue, an excerpt', href: '/blades-in-blue-excerpt.pdf' }] as Link[],
};
