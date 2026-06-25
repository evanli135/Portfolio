import { Microscope, PencilRuler, ExternalLink, Calendar, Tag } from 'lucide-react';
import marioCity from '../assets/mariocity.mov';
import portfolioPic from '../assets/portfolioscr.png';

type Work = 'Project' | 'Research' | 'Club';

interface Project {
    id: number;
    premise: string;
    title: string;
    description: string;
    display: React.ReactNode;
    tags: string[];
    techs: string[];
    demoUrl: string;
    date: string;
    type: Work;
    color: string;
}

const PROJECTS: Project[] = [
    {
        id: 5,
        premise: 'Embedded Analytics Library',
        title: 'Andal',
        description:
            'An embedded event store for Python — no server, no SQL, no config. Track millions of events and run funnels, aggregations, and filters from a simple Python API. Built on a custom C core with columnar storage, a write-ahead log for crash recovery, and lazy segment loading.',
        display: (() => {
            const K = '#FBBF24';
            const T = 'rgba(220,235,255,0.88)';
            const C = '#5a6a7a';
            const S = (color: string) => ({ color });
            const line = (nodes: React.ReactNode, i: number) => (
                <div key={i} style={{ minHeight: '1.7em' }}>{nodes}</div>
            );
            return (
                <div style={{
                    minHeight: 340, borderRadius: 10, padding: '18px 20px',
                    background: 'linear-gradient(160deg, rgba(251,191,36,0.05) 0%, rgba(0,0,0,0.3) 100%)',
                    fontFamily: "'Fira Code', 'Courier New', monospace",
                    fontSize: 12.5, lineHeight: 1.75,
                }}>
                    <div style={{ color: C, marginBottom: 10, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase' }}>quick start</div>
                    {[
                        <><span style={S(K)}>import</span><span style={S(T)}> andal</span></>,
                        <></>,
                        <><span style={S(T)}>store = andal.</span><span style={S(K)}>EventStore</span><span style={S(T)}>("./data")</span></>,
                        <></>,
                        <span style={S(C)}># track events</span>,
                        <><span style={S(T)}>store.</span><span style={S(K)}>track</span><span style={S(T)}>("page_view", user_id=123)</span></>,
                        <><span style={S(T)}>store.</span><span style={S(K)}>track</span><span style={S(T)}>("purchase", amount=99.99)</span></>,
                        <></>,
                        <span style={S(C)}># funnel analysis</span>,
                        <><span style={S(T)}>store.</span><span style={S(K)}>funnel</span><span style={S(T)}>(["page_view", "purchase"])</span></>,
                        <span style={S(C)}># page_view  → 10,000 users</span>,
                        <span style={S(C)}># purchase   →    240  (2.4%)</span>,
                        <></>,
                        <span style={S(C)}># crash-safe — WAL recovers on restart</span>,
                    ].map((nodes, i) => line(nodes, i))}
                </div>
            );
        })(),
        tags: ['Systems', 'Open Source', 'Software Engineering'],
        techs: ['Python', 'C', 'Columnar Storage', 'WAL'],
        demoUrl: 'https://github.com/evanli135/Andal',
        date: '2025 – Present',
        type: 'Project' as Work,
        color: '#FBBF24',
    },
    {
        id: 1,
        premise: 'LLM Security — First Author Research Paper',
        title: 'ACE: A Security Architecture for LLM-Integrated App Systems',
        description:
            'ACE (Abstract Concrete Executer) is an experimental LLM security framework using secure information flow and static analysis to safeguard multi-agent systems from indirect prompt injections and denial-of-service attacks. Accepted to the Network and Distributed Systems Security Symposium 2026.',
        display: (
            <embed
                src="https://arxiv.org/pdf/2504.20984"
                type="application/pdf"
                width="100%"
                height="100%"
                style={{ minHeight: 340, borderRadius: 10 }}
            />
        ),
        tags: ['Research', 'Security', 'Artificial Intelligence', 'Collaborative'],
        techs: ['Python', 'LangChain', 'Linux', 'Conda'],
        demoUrl: 'https://arxiv.org/abs/2504.20984',
        date: 'Jan 2025 – Jun 2025',
        type: 'Research',
        color: '#E8345C',
    },
    {
        id: 2,
        premise: 'Agentic Text Editor',
        title: 'LoreBoard',
        description:
            'An LLM-powered creative writing app that uses AI to track character attributes — physical features, speaking patterns, and interactions — keeping your story world internally consistent as it grows.',
        display: (
            <div style={{
                minHeight: 340, borderRadius: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'linear-gradient(135deg, rgba(45,212,191,0.08) 0%, rgba(45,212,191,0.03) 100%)',
                border: '1px dashed rgba(45,212,191,0.3)',
            }}>
                <span style={{ fontSize: 13, color: 'rgba(45,212,191,0.6)', fontStyle: 'italic' }}>In development</span>
            </div>
        ),
        tags: ['Software Engineering', 'Artificial Intelligence', 'Collaborative'],
        techs: ['Python', 'LangChain', 'React', 'TypeScript', 'Django'],
        demoUrl: '#',
        date: 'Apr 2025 – Present',
        type: 'Project',
        color: '#2DD4BF',
    },
    {
        id: 3,
        premise: 'Sustainability Exhibit',
        title: 'Mario City',
        description:
            'A childhood sustainability game combining 3D-printed electronics, Arduino hardware, and a web frontend. Players manage a miniature city to learn resource conservation through interactive play.',
        display: (
            <video
                src={marioCity}
                controls
                style={{ width: '100%', height: '100%', minHeight: 340, borderRadius: 10, objectFit: 'cover' }}
            />
        ),
        tags: ['Hardware', 'Systems', 'Collaborative'],
        techs: ['C++', 'Arduino', 'JavaScript', 'HTML/CSS'],
        demoUrl: 'https://github.com/evanli135/Mario-City',
        date: 'Mar 2024 – May 2024',
        type: 'Project',
        color: '#FBBF24',
    },
    {
        id: 4,
        premise: 'Developer Portfolio',
        title: "Evan Li's Portfolio",
        description:
            "The site you're on right now. Built from scratch with React, TypeScript, and Tailwind CSS — deployed on Vercel.",
        display: (
            <img
                src={portfolioPic}
                alt="Portfolio screenshot"
                style={{ width: '100%', height: '100%', minHeight: 340, borderRadius: 10, objectFit: 'cover' }}
            />
        ),
        tags: ['Web Dev', 'Frontend'],
        techs: ['TypeScript', 'React', 'Tailwind CSS', 'Vercel'],
        demoUrl: 'https://github.com/evanli135/Portfolio',
        date: 'Jun 2025 – Present',
        type: 'Project',
        color: '#60A5FA',
    },
];

const TYPE_ICON: Record<Work, React.ReactNode> = {
    Research: <Microscope size={13} />,
    Project:  <PencilRuler size={13} />,
    Club:     <Tag size={13} />,
};

export const ProjectsSection = () => (
    <section id="projects" className="py-24 px-6 relative">

        {/* Color spill orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: '5%', right: '5%', width: '480px', height: '340px', borderRadius: '50%', filter: 'blur(90px)', background: 'radial-gradient(ellipse, rgba(45,212,191,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', bottom: '10%', left: '0%', width: '420px', height: '300px', borderRadius: '50%', filter: 'blur(80px)', background: 'radial-gradient(ellipse, rgba(217,70,239,0.15) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', top: '45%', left: '40%', width: '460px', height: '280px', borderRadius: '50%', filter: 'blur(100px)', background: 'radial-gradient(ellipse, rgba(96,165,250,0.13) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-6xl" style={{ position: 'relative', zIndex: 1 }}>

            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c8e8ff 20%, #a0f0e8 40%, #ffffff 55%, #e0c8ff 75%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.25))',
                }}>Projects & Research</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                {PROJECTS.map(({ id, premise, title, description, display, tags, techs, demoUrl, date, type, color }) => (
                    <div key={id} style={{
                        borderRadius: 18,
                        border: `1px solid ${color}66`,
                        borderLeft: `3px solid ${color}`,
                        background: `linear-gradient(110deg, ${color}12 0%, ${color}07 40%, transparent 100%)`,
                        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
                        boxShadow: `0 0 48px 8px ${color}22, inset 0 1px 0 ${color}44, inset 0 -1px 0 ${color}18`,
                        overflow: 'hidden',
                        position: 'relative',
                    }}>
                        {/* Internal orb */}
                        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '-30%', right: '-5%', width: '320px', height: '220px', borderRadius: '50%', filter: 'blur(60px)', background: `radial-gradient(ellipse, ${color}28 0%, transparent 70%)` }}/>
                        </div>

                        <div style={{ position: 'relative', padding: '28px 32px', display: 'flex', flexDirection: 'column', gap: 20 }}>

                            {/* Header row */}
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
                                {/* Type badge */}
                                <div style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 6,
                                    padding: '4px 12px', borderRadius: 20,
                                    background: `${color}18`, border: `1px solid ${color}55`,
                                    color, fontSize: 12, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
                                    filter: `drop-shadow(0 0 6px ${color}55)`,
                                }}>
                                    {TYPE_ICON[type]}
                                    {type}
                                </div>
                                {/* Date */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: `${color}99`, fontSize: 12, fontWeight: 600 }}>
                                    <Calendar size={12}/>
                                    {date}
                                </div>
                            </div>

                            {/* Premise label + title */}
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: `${color}aa`, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 6 }}>
                                    {premise}
                                </div>
                                <h3 style={{
                                    fontSize: 22, fontWeight: 800, lineHeight: 1.2, letterSpacing: '-0.02em',
                                    background: `linear-gradient(100deg, #ffffff 30%, ${color} 100%)`,
                                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                                    margin: 0,
                                }}>
                                    {title}
                                </h3>
                            </div>

                            {/* Main content: media + details */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28, alignItems: 'start' }}>

                                {/* Media */}
                                <div style={{
                                    borderRadius: 12,
                                    border: `1px solid ${color}33`,
                                    overflow: 'hidden',
                                    boxShadow: `0 0 24px 4px ${color}18`,
                                    background: 'rgba(0,0,0,0.2)',
                                }}>
                                    {display}
                                </div>

                                {/* Details */}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                                    <p style={{ fontSize: 14, color: 'rgba(225,238,255,0.90)', lineHeight: 1.75, margin: 0 }}>
                                        {description}
                                    </p>

                                    {/* Tags */}
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                                        {tags.map(t => (
                                            <span key={t} style={{
                                                padding: '4px 11px', borderRadius: 20, fontSize: 11, fontWeight: 600,
                                                background: `${color}14`, border: `1px solid ${color}44`, color,
                                            }}>{t}</span>
                                        ))}
                                    </div>

                                    {/* Techs */}
                                    <div style={{ borderTop: `1px solid ${color}22`, paddingTop: 14, display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                                        {techs.map(t => (
                                            <span key={t} style={{
                                                padding: '5px 13px', borderRadius: 8, fontSize: 12, fontWeight: 700,
                                                background: `${color}0a`, border: `1px solid ${color}66`,
                                                color: 'rgba(215,235,255,0.90)',
                                                boxShadow: `inset 0 1px 0 ${color}33`,
                                            }}>{t}</span>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    {demoUrl !== '#' && (
                                        <a
                                            href={demoUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            style={{
                                                display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                                                padding: '9px 20px', borderRadius: 10, fontSize: 13, fontWeight: 700,
                                                background: `linear-gradient(135deg, ${color}33, ${color}1a)`,
                                                border: `1px solid ${color}88`,
                                                color, textDecoration: 'none',
                                                boxShadow: `0 0 16px 3px ${color}22`,
                                                transition: 'box-shadow 0.2s',
                                            }}
                                        >
                                            <ExternalLink size={14}/>
                                            View Project
                                        </a>
                                    )}
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);
