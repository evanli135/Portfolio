import { Cpu, Network, Binary, Code, Database, Shield, BarChart4, type LucideIcon } from 'lucide-react';
import NUseal from '../assets/NUseal.png';

const NU_COLOR = '#E8345C';

interface Bullet    { label: string; detail: string }
interface CourseRow {
    title: string;
    courseNum: string;
    level: 'Undergraduate' | 'Graduate';
    color: string;
    grade?: string;
    inProgress?: boolean;
    bullets: Bullet[];
    Icon: LucideIcon;
}

const COURSES: CourseRow[] = [
    {
        title: 'Computer Systems',
        courseNum: 'CS3650', level: 'Undergraduate', color: '#2DD4BF', grade: 'A', Icon: Cpu,
        bullets: [
            { label: 'Assembly & C',    detail: 'x86 Assembly from scratch, calling conventions, ABI, and linker internals' },
            { label: 'Memory',          detail: 'stack frames, heap allocation, virtual memory, and page table management' },
            { label: 'OS Interfaces',   detail: 'file systems, I/O control, and process scheduling at the kernel boundary' },
            { label: 'Concurrency',     detail: 'pthreads, semaphores, mutexes, and systematic race-condition analysis' },
        ],
    },
    {
        title: 'Foundations in Distributed Systems',
        courseNum: 'CS7610', level: 'Graduate', color: '#D946EF', grade: 'A-', Icon: Network,
        bullets: [
            { label: 'Consensus',          detail: 'Raft and Paxos algorithms, leader election, and failure detection' },
            { label: 'Fault Tolerance',    detail: 'replication strategies, synchronization, and state machine recovery' },
            { label: 'Real-World Systems', detail: 'GFS, HDFS, Spanner, and Spark dissected and analyzed' },
            { label: 'Modern Apps',        detail: 'blockchains, distributed ML pipelines, and sharded databases' },
            { label: 'Projects',           detail: 'implemented in C, C++, Rust, and Docker' },
        ],
    },
    {
        title: 'Object Oriented Design',
        courseNum: 'CS3500', level: 'Undergraduate', color: '#818CF8', grade: 'B+', Icon: Code,
        bullets: [
            { label: 'OOP Principles',  detail: 'encapsulation, inheritance, polymorphism, and SOLID design principles' },
            { label: 'Design Patterns', detail: 'Composition, Observer, Strategy, MVC, and Factory patterns in Java' },
            { label: 'Testing',         detail: 'rigorous unit testing with JUnit and test-driven development workflows' },
            { label: 'Java',            detail: 'generics, interfaces, lambdas, streams, and the Java standard library' },
        ],
    },
    {
        title: 'Data Structures and Algorithms',
        courseNum: 'CS3000', level: 'Undergraduate', color: '#60A5FA', grade: 'A', Icon: Binary,
        bullets: [
            { label: 'Data Structures',  detail: 'arrays, linked lists, trees, heaps, hash tables, and graphs' },
            { label: 'Design Paradigms', detail: 'divide & conquer, dynamic programming, and greedy strategies' },
            { label: 'Analysis',         detail: 'Big-O, Theta, Omega notation, recurrence relations, and amortized bounds' },
            { label: 'Graph Algorithms', detail: 'BFS, DFS, Dijkstra, Bellman-Ford, and minimum spanning trees' },
        ],
    },
    {
        title: 'Introduction to Databases',
        courseNum: 'CS3200', level: 'Undergraduate', color: '#2DD4BF', grade: 'A-', Icon: Database,
        bullets: [
            { label: 'SQL',            detail: 'complex queries, joins, subqueries, aggregations, and window functions' },
            { label: 'Schema Design',  detail: 'normalization, ER diagrams, and relational modeling with complex relationships' },
            { label: 'ACID',           detail: 'transactions, isolation levels, concurrency control, and consistency guarantees' },
            { label: 'NoSQL',          detail: 'MongoDB document model, indexing strategies, and when to prefer it over relational DBs' },
        ],
    },
    {
        title: 'Foundations in Cybersecurity',
        courseNum: 'CY2550', level: 'Undergraduate', color: '#D946EF', grade: 'A', Icon: Shield,
        bullets: [
            { label: 'Cryptography',    detail: 'symmetric (AES), asymmetric (RSA), hashing, salting, and digital signatures' },
            { label: 'Web Attacks',     detail: 'SQL injection, XSS, and CSRF — attack vectors and defensive countermeasures' },
            { label: 'Penetration',     detail: 'password cracking, network scanning, and basic exploit techniques' },
            { label: 'Scripting',       detail: 'Bash automation for security tooling and system hardening tasks' },
        ],
    },
    {
        title: 'Foundations in Data Science',
        courseNum: 'DS3000', level: 'Undergraduate', color: '#FBBF24', grade: 'A', Icon: BarChart4,
        bullets: [
            { label: 'Python Libraries', detail: 'Pandas, NumPy, Matplotlib, and Seaborn for data manipulation and visualization' },
            { label: 'Linear Algebra',   detail: 'matrix operations, eigenvalues, and their application in machine learning' },
            { label: 'Data Collection',  detail: 'web scraping and REST API usage to build real-world datasets' },
            { label: 'ML Fundamentals',  detail: 'supervised learning, regression, classification, and model evaluation metrics' },
        ],
    },
    // {
    //     title: 'Calculus I & II',
    //     courseNum: 'MATH1365', level: 'Undergraduate', color: '#818CF8', grade: 'A', Icon: Sigma,
    //     bullets: [
    //         { label: 'Derivatives',   detail: 'formal limits, chain rule, implicit differentiation, and related rates' },
    //         { label: 'Integration',   detail: 'Riemann sums, the fundamental theorem, substitution, and integration by parts' },
    //         { label: 'Applications',  detail: 'optimization problems, curve sketching, and volume of revolution' },
    //         { label: 'Series',        detail: 'convergence tests, Taylor and Maclaurin series, and power series expansions' },
    //     ],
    // },
    // {
    //     title: 'Cornerstones of Engineering',
    //     courseNum: 'GE1501', level: 'Undergraduate', color: '#FBBF24', grade: 'A', Icon: Wrench,
    //     bullets: [
    //         { label: 'Design Process', detail: 'problem identification, brainstorming, prototyping, testing, and iteration' },
    //         { label: 'Hardware',       detail: 'CAD design, 3D printing, and electronics wiring on Arduino platforms' },
    //         { label: 'Firmware',       detail: 'C++ embedded programming for sensor integration and actuation control' },
    //         { label: 'Collaboration',  detail: 'cross-disciplinary team project from concept to working physical prototype' },
    //     ],
    // },
];

export const CoursesSection = () => (
    <section id="coursework" className="py-24 px-6 relative">

        {/* Color spill orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: '-5%', left: '5%', width: '500px', height: '360px', borderRadius: '50%', filter: 'blur(90px)', background: 'radial-gradient(ellipse, rgba(232,52,92,0.22) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', top: '30%', right: '-2%', width: '420px', height: '320px', borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(ellipse, rgba(217,70,239,0.16) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', bottom: '-5%', left: '25%', width: '580px', height: '300px', borderRadius: '50%', filter: 'blur(100px)', background: 'radial-gradient(ellipse, rgba(45,212,191,0.18) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-7xl" style={{ position: 'relative', zIndex: 1 }}>

            {/* Section heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c8e8ff 20%, #a0f0e8 40%, #ffffff 55%, #e0c8ff 75%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.25))',
                }}>Coursework</span>
            </h2>

            {/* ── Northeastern Banner ─────────────────────────────────── */}
            <div style={{
                display: 'flex', alignItems: 'stretch',
                marginBottom: 32, borderRadius: '20px',
                border: `1px solid ${NU_COLOR}55`,
                borderLeft: `3px solid ${NU_COLOR}`,
                background: `linear-gradient(100deg, ${NU_COLOR}18 0%, ${NU_COLOR}0a 40%, rgba(255,255,255,0.01) 100%)`,
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                boxShadow: `0 0 56px 8px ${NU_COLOR}1a, inset 0 1px 0 rgba(255,255,255,0.16), inset 0 -1px 0 ${NU_COLOR}14`,
                overflow: 'hidden',
            }}>
                {/* Left: seal + college name */}
                <div style={{
                    width: 170, flexShrink: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 12, padding: '32px 18px',
                    borderRight: `1px solid ${NU_COLOR}33`,
                    background: `linear-gradient(180deg, ${NU_COLOR}18 0%, transparent 100%)`,
                }}>
                    <img src={NUseal} alt="Northeastern University Seal" style={{
                        width: 90, height: 90,
                        filter: `drop-shadow(0 0 16px rgba(232,52,92,0.60)) brightness(1.08)`,
                        borderRadius: '50%',
                    }}/>
                    <span style={{
                        fontSize: '11px', fontWeight: 700, color: `${NU_COLOR}cc`,
                        textAlign: 'center', lineHeight: 1.4, letterSpacing: '0.04em',
                    }}>
                        Khoury College of<br/>Computer Sciences
                    </span>
                </div>

                {/* Middle: university info */}
                <div style={{
                    flex: 1, padding: '32px 32px',
                    display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 10,
                }}>
                    <span style={{ fontSize: '28px', fontWeight: 900, color: '#ffffff', letterSpacing: '-0.01em', lineHeight: 1.1, filter: `drop-shadow(0 0 12px ${NU_COLOR}88)` }}>
                        Northeastern University
                    </span>
                    <span style={{ fontSize: '17px', fontWeight: 700, color: NU_COLOR, filter: `drop-shadow(0 0 8px ${NU_COLOR}66)` }}>
                        Systems Engineering Undergraduate
                    </span>
                    <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, ${NU_COLOR}55, transparent)`, margin: '2px 0' }}/>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,205,215,0.90)' }}>
                        B.S. in Computer Science
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'rgba(255,205,215,0.90)' }}>
                        2023 – 2027
                    </span>
                </div>

                {/* Right: GPA */}
                <div style={{
                    width: 100, flexShrink: 0,
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 6, padding: '20px 14px',
                    borderLeft: `1px solid ${NU_COLOR}28`,
                    background: `linear-gradient(180deg, ${NU_COLOR}0e 0%, transparent 100%)`,
                }}>
                    <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', color: `${NU_COLOR}99`, textTransform: 'uppercase' }}>GPA</span>
                    <span style={{ fontSize: '30px', fontWeight: 900, color: NU_COLOR, lineHeight: 1, filter: `drop-shadow(0 0 12px ${NU_COLOR}bb)` }}>3.83</span>
                </div>
            </div>

            {/* ── Course Rows ─────────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {COURSES.map(({ title, courseNum, level, color, grade, inProgress, bullets, Icon }) => {
                    return (
                        <div key={courseNum} style={{
                            display: 'flex', alignItems: 'stretch',
                            borderRadius: '16px',
                            border: `1px solid ${color}66`,
                            borderLeft: `3px solid ${color}`,
                            background: `linear-gradient(100deg, ${color}05 0%, ${color}02 50%, transparent 100%)`,
                            backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                            boxShadow: `0 0 28px 6px ${color}1a, inset 0 1px 0 ${color}33, inset 0 -1px 0 ${color}18`,
                            overflow: 'hidden',
                        }}>

                            {/* Left: icon + meta */}
                            <div style={{
                                width: 170, flexShrink: 0,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: 10, padding: '24px 18px',
                                borderRight: `1px solid ${color}55`,
                                background: `linear-gradient(180deg, ${color}06 0%, transparent 100%)`,
                            }}>
                                {/* Icon emblem */}
                                <div style={{
                                    width: 54, height: 54, borderRadius: '13px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `linear-gradient(135deg, ${color}0a 0%, ${color}04 100%)`,
                                    border: `1px solid ${color}66`,
                                    boxShadow: `0 0 16px 4px ${color}20, inset 0 1px 0 ${color}44, inset 0 -1px 0 ${color}18`,
                                }}>
                                    <Icon size={26} style={{ color, filter: `drop-shadow(0 0 8px ${color}cc)` }}/>
                                </div>

                                {/* Course number */}
                                <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.10em', color, textTransform: 'uppercase', textAlign: 'center', filter: `drop-shadow(0 0 6px ${color}77)` }}>
                                    {courseNum}
                                </span>

                                {/* Level badge */}
                                <span style={{
                                    fontSize: '10px', fontWeight: 700, letterSpacing: '0.08em',
                                    padding: '3px 8px', borderRadius: '10px',
                                    background: `${color}18`, border: `1px solid ${color}44`,
                                    color, textTransform: 'uppercase', textAlign: 'center',
                                }}>
                                    {level === 'Graduate' ? 'Grad' : 'Undergrad'}
                                </span>
                            </div>

                            {/* Middle: title + bullets */}
                            <div style={{ flex: 1, padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>

                                {/* Title — gradient white→color, wider tracking */}
                                <span style={{
                                    fontSize: '20px', fontWeight: 800,
                                    letterSpacing: '-0.02em', lineHeight: 1.15,
                                    background: `linear-gradient(100deg, #ffffff 30%, ${color} 100%)`,
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}>
                                    {title}
                                </span>

                                {/* Bullets */}
                                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {bullets.map(({ label, detail }, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                                            <span style={{ color, fontSize: '13px', lineHeight: '20px', flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}88)` }}>▸</span>
                                            <span style={{ fontSize: '13px', lineHeight: '20px' }}>
                                                <span style={{
                                                    fontWeight: 700, color,
                                                    filter: `drop-shadow(0 0 6px ${color}66)`,
                                                    marginRight: 2,
                                                }}>{label}:</span>
                                                {' '}
                                                <span style={{ color: 'rgba(215,230,248,0.90)', fontWeight: 400 }}>{detail}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Right: grade */}
                            <div style={{
                                width: 100, flexShrink: 0,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: 6, padding: '20px 14px',
                                borderLeft: `1px solid ${color}55`,
                                background: `linear-gradient(180deg, ${color}04 0%, transparent 100%)`,
                            }}>
                                {inProgress ? (
                                    <>
                                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', color: `${color}99`, textTransform: 'uppercase' }}>Status</span>
                                        <span style={{ fontSize: '12px', fontWeight: 700, color, textAlign: 'center', filter: `drop-shadow(0 0 6px ${color}88)` }}>In Progress</span>
                                    </>
                                ) : (
                                    <>
                                        <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', color: `${color}99`, textTransform: 'uppercase' }}>Grade</span>
                                        <span style={{ fontSize: '32px', fontWeight: 800, color, lineHeight: 1, filter: `drop-shadow(0 0 12px ${color}bb)` }}>{grade}</span>
                                    </>
                                )}
                            </div>

                        </div>
                    );
                })}
            </div>

        </div>
    </section>
);
