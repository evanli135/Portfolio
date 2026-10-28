// All site content. Add a job, paper, course, or post here without touching components.
// Anything Evan hasn't confirmed is a visible TODO(evan).

export type Link = { label: string; href: string };

/** A piece of a sentence. `phase` ties it to a diagram node of the same id. */
export type Segment = { text: string; phase?: string };

export type Entry = {
  title: string;
  org?: string;
  meta?: string; // dates · place
  diagram?: 'matrix' | 'ace' | 'vestmark' | 'keysight';
  body?: Segment[][]; // paragraphs
  code?: string;
  paper?: { venue: string; title: string; byline: string; href: string };
  rowsTitle?: string;
  rows?: { tag?: string; name: string; detail: string }[]; // a compact list, like coursework
  links?: Link[];
};

export type Category = { id: string; label: string; entries: Entry[] };

export const site = {
  name: 'Evan Li',
  line: 'Designing, shipping, and breaking agent guardrails.',
  meta: ['From Westchester, NY', 'Based in Boston, MA', 'Incoming San Francisco, CA'],
  school: 'Northeastern CS, May 2027',
  url: 'https://evanli.org/',
  email: 'evanlie.737@gmail.com',
};

export const links: Link[] = [
  { label: 'Résumé', href: '/evan-li-resume.pdf' },
  { label: 'GitHub', href: 'https://github.com/evanli135' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/evan-li-ff/' },
  { label: 'Email', href: `mailto:${site.email}` },
];

const t = (text: string, phase?: string): Segment => ({ text, phase });
const p = (text: string): Segment[] => [t(text)];

export const categories: Category[] = [
  {
    id: 'work',
    label: 'Work',
    entries: [
      {
        title: 'Software Engineer, R&D Networks',
        org: 'Keysight Technologies',
        meta: 'Jun to Aug 2026 · Calabasas, CA',
        diagram: 'keysight',
        body: [
          p('The way to know a firewall holds is to attack it.'),
          [
            t('Built '),
            t('an agentic penetration testing service', 'plan'),
            t(' that '),
            t('runs SQL injection, prompt injection, and denial-of-service attacks', 'run'),
            t(' against firewall devices, and '),
            t('an MCP service that lets agents drive physical test chassis', 'mcp'),
            t('.'),
          ],
          p('The MCP service beat the prior MCP baseline by 41% on utility benchmarks.'),
        ],
      },
      {
        title: 'Software Engineer, Agentic AI',
        org: 'Vestmark',
        meta: 'Jan to Jun 2026 · Cambridge, MA',
        diagram: 'vestmark',
        body: [
          p('Financial advisory agents propose portfolio changes and handle client data.'),
          [
            t('Built '),
            t('human-in-the-loop approval gates for portfolio changes', 'approval'),
            t(', '),
            t('guardrails against sensitive data leaking out', 'check'),
            t(', and the '),
            t('memory, retrieval, persistence, and observability layers', 'execute'),
            t(' under the agent pipelines.'),
          ],
          p('Parallelizing the agent tooling cut API latency by 67%.'),
        ],
      },
      {
        title: 'Agentic AI Security Researcher',
        org: 'Khoury Network and Distributed Systems Security Lab',
        meta: 'Jan to Jun 2025 · Boston, MA',
        diagram: 'ace',
        body: [
          p('Apps installed into an LLM agent can hijack it, through a poisoned description while it plans or a poisoned output while it runs.'),
          [
            t('ACE '),
            t('builds an abstract plan from the trusted user query alone', 'abstract'),
            t(', '),
            t('maps it onto installed apps and statically checks its information flow', 'concrete'),
            t(', then '),
            t('executes it with data and capability barriers between apps', 'execute'),
            t('.'),
          ],
          p('It blocked every attack in the InjecAgent and Agent Security Bench benchmarks.'),
        ],
        paper: {
          venue: 'NDSS 2026',
          title: 'ACE: A Security Architecture for LLM-Integrated App Systems',
          byline: 'Co-first author with Tushin Mallick and Evan Rose · with William Robertson, Alina Oprea, Cristina Nita-Rotaru',
          href: 'https://arxiv.org/abs/2504.20984',
        },
      },
      {
        title: 'NLP Engineering Intern',
        org: 'Matrix Origin',
        meta: 'Jul to Sep 2024 · San Francisco, CA',
        diagram: 'matrix',
        body: [
          p('A model that turns a plain-English question into SQL is easy to demo and hard to trust.'),
          [
            t('Built '),
            t('evaluation infrastructure', 'eval'),
            t(' that runs '),
            t('generated queries', 'sql'),
            t(' against '),
            t('live databases', 'db'),
            t(' and scores them against expected results.'),
          ],
          p('Query accuracy up 40%.'),
        ],
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    entries: [
      {
        title: 'Andal',
        org: 'Embedded Event Store',
        body: [p('An event store in C with columnar storage, a write-ahead log, crash recovery, inverted indices, and a Python C API. No server, no config.')],
        code: 'pip install andal',
        links: [{ label: 'GitHub', href: 'https://github.com/evanli135/Andal' }],
      },
      {
        title: 'LoreBoard',
        org: 'Agentic Text Editor',
        body: [p('A writing app that uses an LLM to track characters (how they look, how they talk, who they know) so a story world stays consistent as it grows. Python, LangChain, Django, React.')],
      },
      {
        title: 'Mario City',
        org: 'Sustainability Exhibit',
        body: [p('A miniature city of 3D-printed electronics on Arduino, run from a web frontend. Kids manage it and learn resource conservation by playing. C++, Arduino, JavaScript.')],
        links: [{ label: 'GitHub', href: 'https://github.com/evanli135/Mario-City' }],
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    entries: [
      {
        title: 'Northeastern University',
        org: 'B.S. in Computer Science, Systems Engineering Concentration',
        meta: 'Sep 2023 to May 2027 · Boston, MA · GPA 3.84',
        rowsTitle: 'Coursework',
        rows: [
          { tag: 'CS 7610', name: 'Foundations of Distributed Systems (Graduate)', detail: 'Raft, Paxos, leader election, failure detection, GFS, Spanner, Spark' },
          { tag: 'CS 3650', name: 'Computer Systems', detail: 'x86 assembly, linkers, virtual memory, page tables, POSIX threads, race analysis' },
          { tag: 'CY 2550', name: 'Foundations of Cybersecurity', detail: 'AES, RSA, signatures, SQL injection, XSS, CSRF, password cracking, scanning' },
          { tag: 'CS 3000', name: 'Data Structures and Algorithms', detail: 'Divide and conquer, dynamic programming, greedy, graph algorithms' },
          { tag: 'CS 3200', name: 'Introduction to Databases', detail: 'SQL, normalization, transactions, isolation, MongoDB' },
          { tag: 'DS 3000', name: 'Foundations of Data Science', detail: 'Pandas, NumPy, Matplotlib, regression, classification' },
          { tag: 'CS 3500', name: 'Object-Oriented Design', detail: 'Observer, Strategy, MVC, Factory in Java, JUnit, test-driven development' },
          { tag: 'CS 4700', name: 'Network Fundamentals', detail: 'TCP/IP, congestion control, sockets, firewalls, NAT, DNS' },
          { tag: 'CS 3800', name: 'Theory of Computation', detail: 'Automata, CFGs, Turing machines, P vs. NP' },
          { tag: 'DS 4400', name: 'Machine Learning and Data Mining I', detail: 'Supervised and unsupervised learning, model evaluation' },
        ],
      },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    entries: [
      {
        title: '',
        rows: [
          { name: 'AI Security', detail: 'Prompt injection defense, multi-agent threat modeling, context sandboxing, information flow control' },
          { name: 'Languages', detail: 'Python, C, Rust, C++, TypeScript, JavaScript, SQL, Bash, Ruby, Java' },
          { name: 'AI/ML', detail: 'LangChain, Mastra, MCP, agent orchestration, LLM evaluation, prompt engineering, scikit-learn' },
          { name: 'Infrastructure', detail: 'Docker, Kubernetes, Linux, AWS, PostgreSQL, MongoDB, Redis, OpenTelemetry, CI/CD' },
          { name: 'Frameworks', detail: 'React, FastAPI, Ruby on Rails, Django, Express, Pandas, NumPy, Tailwind CSS' },
        ],
      },
    ],
  },
  {
    id: 'otherwise',
    label: 'Otherwise',
    entries: [
      {
        title: 'Blades in Blue',
        org: 'Novel in Progress',
        body: [p('Fantasy and science fiction about war, technology, and what progress costs. Industrial empires, chivalric orders, and nomadic hunters, told from six points of view across enemy lines.')],
        links: [{ label: 'Read an Excerpt (PDF)', href: '/blades-in-blue-excerpt.pdf' }],
      },
    ],
  },
];
