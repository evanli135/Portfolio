// All site content. Add a job, paper, course, or post here without touching components.
// Anything Evan hasn't confirmed is a visible TODO(evan).

export type Link = { label: string; href: string };

/** A piece of a sentence. `phase` ties it to a diagram node of the same id. */
export type Segment = { text: string; phase?: string };

export type Entry = {
  title: string;
  org?: string;
  meta?: string; // dates · place
  aside?: string; // short value shown large on the right (a grade, a status)
  diagram?: 'ace' | 'vestmark' | 'keysight';
  body?: Segment[][]; // paragraphs
  bullets?: [string, string][];
  code?: string;
  links?: Link[];
};

export type Category = { id: string; label: string; entries: Entry[] };

export const site = {
  name: 'Evan Li',
  line: 'TODO(evan): write it',
  meta: ['Northeastern CS, May 2027', 'Boston, MA'],
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
const p = (text: string): Segment[] => [t(text)];

export const categories: Category[] = [
  {
    id: 'research',
    label: 'Research',
    entries: [
      {
        title: 'ACE',
        org: 'A Security Architecture for LLM-Integrated App Systems',
        meta: 'NDSS 2026 · Distributed Systems Security Researcher, Northeastern Privacy & Security Lab',
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
          p('Co-first author with Tushin Mallick and Evan Rose. With William Robertson, Alina Oprea, and Cristina Nita-Rotaru.'),
        ],
        links: [{ label: 'arXiv 2504.20984', href: 'https://arxiv.org/abs/2504.20984' }],
      },
    ],
  },
  {
    id: 'work',
    label: 'Work',
    entries: [
      {
        // TODO(evan): confirm title (old site said Agentic Software Engineer)
        title: 'Agentic Software Engineer',
        org: 'Vestmark',
        meta: 'Jan to Jun 2026',
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
          p('TODO(evan): the result, one sentence.'),
        ],
      },
      {
        // TODO(evan): confirm title (old site said R&D Test Systems Engineer)
        title: 'R&D Test Systems Engineer',
        org: 'Keysight Technologies',
        meta: 'Jun to Aug 2026',
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
          p('TODO(evan): the result, one sentence.'),
        ],
      },
      {
        title: 'NLP Engineer',
        org: 'Matrix Origin',
        meta: 'Jul to Sep 2024',
        body: [p('Built evaluation infrastructure for natural-language-to-SQL. Query accuracy up 40%.')],
      },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    entries: [
      {
        title: 'Andal',
        org: 'Embedded event store',
        body: [p('An event store in C with columnar storage, a write-ahead log, crash recovery, inverted indices, and a Python C API. No server, no config.')],
        code: 'pip install andal',
        links: [{ label: 'GitHub', href: 'https://github.com/evanli135/Andal' }],
      },
      {
        title: 'LoreBoard',
        org: 'Agentic text editor',
        meta: 'Apr 2025 to now',
        aside: 'In progress',
        body: [p('A writing app that uses an LLM to track characters (how they look, how they talk, who they know) so a story world stays consistent as it grows. Python, LangChain, Django, React.')],
      },
      {
        title: 'Mario City',
        org: 'Sustainability exhibit',
        meta: 'Mar to May 2024',
        body: [p('A miniature city of 3D-printed electronics on Arduino, run from a web frontend. Kids manage it and learn resource conservation by playing. C++, Arduino, JavaScript.')],
        links: [{ label: 'GitHub', href: 'https://github.com/evanli135/Mario-City' }],
      },
    ],
  },
  {
    id: 'writing',
    label: 'Writing',
    entries: [
      {
        title: 'Blades in Blue',
        org: 'A novel, in progress',
        body: [p('Fantasy and science fiction about war, technology, and what progress costs. Industrial empires, chivalric orders, and nomadic hunters, told from six points of view across enemy lines.')],
        links: [{ label: 'Read an excerpt (PDF)', href: '/blades-in-blue-excerpt.pdf' }],
      },
    ],
  },
  {
    id: 'education',
    label: 'Education',
    entries: [
      {
        title: 'Northeastern University',
        org: 'B.S. Computer Science, concentration in systems',
        meta: '2023 to May 2027 · Boston, MA',
        aside: '3.83',
        // TODO(evan): confirm concentration wording and that the GPA is current
      },
    ],
  },
  {
    id: 'coursework',
    label: 'Coursework',
    // TODO(evan): the last four were "upcoming" on the old site; update to grades if taken
    entries: [
      { title: 'Foundations of Distributed Systems', org: 'CS7610 · Graduate', aside: 'A-', bullets: [['Consensus', 'Raft, Paxos, leader election, failure detection'], ['Systems read', 'GFS, HDFS, Spanner, Spark'], ['Built in', 'C, C++, Rust, Docker']] },
      { title: 'Computer Systems', org: 'CS3650', aside: 'A', bullets: [['Low level', 'x86 assembly, calling conventions, linkers'], ['Memory', 'Stack, heap, virtual memory, page tables'], ['Concurrency', 'pthreads, semaphores, race analysis']] },
      { title: 'Foundations of Cybersecurity', org: 'CY2550', aside: 'A', bullets: [['Crypto', 'AES, RSA, hashing, signatures'], ['Web attacks', 'SQL injection, XSS, CSRF, and defenses'], ['Offense', 'Password cracking, scanning, basic exploits']] },
      { title: 'Data Structures and Algorithms', org: 'CS3000', aside: 'A', bullets: [['Paradigms', 'Divide and conquer, dynamic programming, greedy'], ['Graphs', 'BFS, DFS, Dijkstra, Bellman-Ford, MSTs']] },
      { title: 'Introduction to Databases', org: 'CS3200', aside: 'A-', bullets: [['Relational', 'SQL, normalization, transactions, isolation'], ['NoSQL', 'MongoDB and when to prefer it']] },
      { title: 'Foundations of Data Science', org: 'DS3000', aside: 'A', bullets: [['Tools', 'Pandas, NumPy, Matplotlib'], ['ML', 'Regression, classification, evaluation']] },
      { title: 'Object-Oriented Design', org: 'CS3500', aside: 'B+', bullets: [['Patterns', 'Observer, Strategy, MVC, Factory in Java'], ['Testing', 'JUnit, test-driven development']] },
      { title: 'Network Fundamentals', org: 'CS3700', aside: 'Upcoming', bullets: [['Covers', 'TCP/IP, congestion control, sockets, firewalls, NAT, DNS']] },
      { title: 'Theory of Computation', org: 'CS3800', aside: 'Upcoming', bullets: [['Covers', 'Automata, CFGs, Turing machines, P vs NP']] },
      { title: 'GUI Programming', org: 'CS3520', aside: 'Upcoming', bullets: [['Covers', 'Event models, layout, state, rendering']] },
      { title: 'Robotics Programming', org: 'CS4610', aside: 'Upcoming', bullets: [['Covers', 'Kinematics, sensor fusion, PID, ROS']] },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    entries: [
      { title: 'Languages', body: [p('Python, TypeScript, C, C++, Rust, Java, Ruby')] },
      { title: 'Agents', body: [p('LangChain, Mastra, MCP, AWS Bedrock, RAG, prompt injection testing')] },
      { title: 'Systems', body: [p('Distributed systems, operating systems, networks, memory management, parallel programming')] },
      { title: 'Infrastructure', body: [p('PostgreSQL, Redis, MongoDB, Docker, Kubernetes, AWS, Linux')] },
      { title: 'Observability', body: [p('OpenTelemetry, Grafana, Dynatrace, Wireshark')] },
      { title: 'Web', body: [p('React, Node.js, Django, FastAPI, Spring, Ruby on Rails')] },
    ],
  },
  {
    id: 'otherwise',
    label: 'Otherwise',
    entries: [{ title: 'Outside work', body: [p('TODO(evan): interests, things he makes or loves outside work.')] }],
  },
];
