import React from 'react';
import { Bot, Shield, Briefcase, Cpu, MessageSquare, Database, ChevronRight, ShieldAlert, Layers, Code2, CheckCheck, BookOpen, type LucideIcon } from 'lucide-react';
import { TbAbc, TbSql, TbBrain, TbStack2, TbRocket, TbReportAnalytics, TbRoute, TbRadar, TbFlame, TbPlugConnected, TbHeartbeat } from 'react-icons/tb';
import vestmarkLogo    from '../assets/vestmarklogo.png';
import nuseal          from '../assets/NUseal.png';
import keysightLogo    from '../assets/KeysightLogo (2).png';
import matrixLogo      from '../assets/matrixoriginlogo.png';

interface Bullet        { label: string; detail: string }
interface PipelineNode  { Icon: React.ElementType; label: string; desc: React.ReactNode; connector?: React.ElementType; }

interface ExpEntry {
    blurb?: string;
    role: string;
    org: string;
    industry: string;
    start: string;
    end: string;
    color: string;
    logoColor?: string;   // dominant color in the logo image; falls back to color
    status: 'completed' | 'current' | 'upcoming';
    type: string;
    Icon: LucideIcon;
    logo?: string;
    bullets: Bullet[];
    pipeline?: PipelineNode[];
    pipelineLayout?: 'horizontal' | 'vertical' | 'grid';
}

const EXPERIENCES: ExpEntry[] = [
    {
        role: 'NLP Engineer',
        org: 'MatrixOrigin',
        industry: 'Tech',
        start: 'Jun 2024', end: 'Sep 2024',
        color: '#2DD4BF',
        logoColor: '#0080FF',
        status: 'completed',
        type: 'Internship',
        Icon: Bot,
        logo: matrixLogo,
        blurb: 'Engineered end-to-end Natural Language to SQL platform',
        bullets: [],
        pipeline: [
            { Icon: MessageSquare, label: 'Natural Text Input',  desc: <><strong>Python</strong> interface with iterated <strong>prompt strategies</strong></> },
            { Icon: TbBrain,       label: 'LLM Transformation', desc: <>Improved accuracy by <strong>40%</strong> via <strong>prompt engineering</strong> and few-shot examples</>, connector: TbAbc },
            { Icon: Database,      label: 'SQL Execution',       desc: <>Wired LLM to live <strong>DB services</strong> for <strong>schema-aware</strong> generation and automated <strong>data fetching</strong></>, connector: TbSql },
        ],
    },
    {
        role: 'Distributed Systems Security Researcher',
        org: 'NEU Privacy & Security Lab',
        industry: 'Academia',
        start: 'Jan 2025', end: 'Jul 2025',
        color: '#E8345C',
        logoColor: '#CC2030',
        status: 'completed',
        type: 'Co-op',
        Icon: Shield,
        logo: nuseal,
        blurb: 'Authored ACE — a novel security architecture for LLM-integrated multi-agent systems, accepted to NDSS 2026',
        bullets: [],
        pipeline: [
            { Icon: ShieldAlert,  label: 'Threat Analysis',  desc: <> <strong> Red teamed </strong> existing multi-agent LLM systems with <strong> prompt injection</strong> and <strong> denial-of-service </strong> attacks to expose architectural vulnerabilities</> },
            { Icon: Layers,       label: 'System Design',    desc: <>Designed <strong>ACE,</strong> a layered system architecture for an <strong>agentic security system</strong></> },
            { Icon: Code2,        label: 'Prototype Implementation',        desc: <>Built with <strong>context sandboxing</strong> and secure <strong>information flow</strong>, implemented with <strong> Python, LangChain, and prompt engineering</strong></> },
            { Icon: CheckCheck,   label: 'Evaluation',       desc: <>Evaluated system utility and security metrics with external <strong>benchmarking</strong>, proving <strong>100% defense success</strong> against prompt injections</> },
            { Icon: BookOpen,     label: 'Peer Review',      desc: <>Submitted as <strong>first author</strong> to <strong>NDSS 2026</strong>top 4 security venue, with <strong>31 citations</strong> to date</>  },
        ],
        pipelineLayout: 'vertical',
    },
    {
        role: 'Agentic Software Engineer',
        org: 'Vestmark',
        industry: 'Finance',
        start: 'Jan 2026', end: 'Jun 2026',
        color: '#60A5FA',
        logoColor: '#3AAFA9',
        status: 'completed',
        type: 'Co-op',
        Icon: Briefcase,
        logo: vestmarkLogo,
        blurb: 'Shipped full-stack AI features for an Investment Advisor Agent serving financial advisors at scale',
        bullets: [],
        pipeline: [
            { Icon: TbStack2,          label: 'Full-Stack Agent',   desc: <>End-to-end features across <strong>Rails</strong>, <strong>React</strong>, and <strong>LLM orchestration</strong> for an AI-powered <strong>Investment Advisor</strong></>, connector: TbBrain },
            { Icon: TbRocket,          label: '3× Latency',         desc: <>Parallelized tool calls across <strong>concurrent API requests</strong>, cutting agent response time <strong>3×</strong> by eliminating serial blocking</>, connector: TbStack2 },
            { Icon: TbReportAnalytics, label: 'Observability',      desc: <><strong>OpenTelemetry</strong> + <strong>Grafana</strong> instrumentation; <strong>memory storage</strong> and output validation wired via <strong>TypeScript</strong> and <strong>Mastra</strong></>, connector: TbRocket },
            { Icon: TbRoute,           label: 'Proactive Newsroom', desc: <>Autonomous workflow ingesting live <strong>RSS market feeds</strong>, surfacing tenant insights via <strong>semantic preference matching</strong></> },
        ],
    },
    {
        role: 'R&D Test Systems Engineer',
        org: 'Keysight Technologies',
        industry: 'Electronics',
        start: 'Jul 2026', end: 'Sep 2026',
        color: '#FBBF24',
        logoColor: '#FBBF24',
        status: 'current',
        type: 'Internship',
        Icon: Cpu,
        logo: keysightLogo,
        blurb: 'Prototyping AI-powered diagnostics tooling for hardware test and measurement systems',
        bullets: [],
        pipeline: [
            { Icon: TbRadar,        label: 'Anomaly Detection', desc: <>Developing AI-powered tooling to detect <strong>anomalies</strong> in <strong>hardware test systems</strong></> },
            { Icon: TbFlame,        label: 'Stress Testing',    desc: <>Building automated pipelines for <strong>load and stress testing</strong> of R&D instrumentation</> },
            { Icon: TbPlugConnected,label: 'Integration',       desc: <>Bridging <strong>hardware telemetry</strong> with <strong>ML inference</strong> for real-time signal diagnostics</> },
            { Icon: TbHeartbeat,    label: 'Diagnostics',       desc: <>Wiring live instrument data into <strong>inference pipelines</strong> for <strong>real-time fault detection</strong></> },
        ],
        pipelineLayout: 'grid',
    },
];

export const ExperienceSection = () => (
    <section id="experience" className="py-24 px-6 relative">

        {/* Color spill orbs */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
            <div style={{ position: 'absolute', top: '0%', right: '5%', width: '480px', height: '340px', borderRadius: '50%', filter: 'blur(90px)', background: 'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', bottom: '5%', left: '2%', width: '440px', height: '320px', borderRadius: '50%', filter: 'blur(85px)', background: 'radial-gradient(ellipse, rgba(217,70,239,0.16) 0%, transparent 70%)' }}/>
            <div style={{ position: 'absolute', top: '40%', left: '35%', width: '500px', height: '300px', borderRadius: '50%', filter: 'blur(100px)', background: 'radial-gradient(ellipse, rgba(45,212,191,0.14) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-7xl" style={{ position: 'relative', zIndex: 1 }}>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c8e8ff 20%, #a0f0e8 40%, #ffffff 55%, #e0c8ff 75%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.25))',
                }}>Experience</span>
            </h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {EXPERIENCES.map(({ role, org, industry, start, end, color, logoColor: lc, status, type, Icon, logo, blurb, bullets, pipeline, pipelineLayout }) => {
                    const lclr = lc ?? color;
                    const statusLabel = status === 'current' ? 'Current' : status === 'upcoming' ? 'Upcoming' : 'Completed';
                    const statusColor = status === 'current' ? '#2DD4BF' : status === 'upcoming' ? '#818CF8' : `${color}99`;
                    const statusGlow  = status === 'current' ? 'drop-shadow(0 0 6px rgba(45,212,191,0.7))' : status === 'upcoming' ? 'drop-shadow(0 0 6px rgba(129,140,248,0.7))' : 'none';
                    return (
                    <div key={org + role} style={{
                        display: 'flex', alignItems: 'stretch',
                        borderRadius: '16px',
                        border: `1px solid ${color}88`,
                        borderLeft: `3px solid ${color}`,
                        background: `linear-gradient(100deg, ${color}18 0%, ${color}0a 50%, transparent 100%)`,
                        backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                        boxShadow: `0 0 40px 8px ${color}30, inset 0 1px 0 ${color}55, inset 0 -1px 0 ${color}22`,
                        overflow: 'hidden',
                    }}>

                        {/* Left: icon + org + dates */}
                        <div style={{
                            width: 175, flexShrink: 0,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            gap: 10, padding: '26px 18px',
                            borderRight: `1px solid ${color}44`,
                            background: `linear-gradient(180deg, ${color}0a 0%, transparent 100%)`,
                        }}>
                            {/* Logo / icon emblem — inky glass */}
                            <div style={{
                                width: 68, height: 68, borderRadius: '15px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `linear-gradient(145deg, ${lclr}48 0%, ${lclr}28 55%, ${lclr}18 100%)`,
                                backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
                                border: `1px solid ${lclr}77`,
                                boxShadow: `0 0 22px 6px ${lclr}35, inset 0 1px 0 ${lclr}66, inset 0 -1px 0 ${lclr}22, inset 0 0 16px ${lclr}18`,
                                padding: logo ? '8px' : 0,
                            }}>
                                {logo
                                    ? <img src={logo} alt={org} style={{ width: '100%', height: '100%', objectFit: 'contain', filter: `drop-shadow(0 0 5px ${lclr}bb) saturate(1.1)` }}/>
                                    : <Icon size={26} style={{ color: lclr, filter: `drop-shadow(0 0 8px ${lclr}cc)` }}/>
                                }
                            </div>

                            {/* Org name */}
                            <span style={{ fontSize: '12px', fontWeight: 800, color, textAlign: 'center', letterSpacing: '0.06em', filter: `drop-shadow(0 0 6px ${color}77)` }}>
                                {org}
                            </span>

                            {/* Industry */}
                            <span style={{ fontSize: '10px', fontWeight: 600, color: `${color}88`, textAlign: 'center', letterSpacing: '0.10em', textTransform: 'uppercase' }}>
                                {industry}
                            </span>

                            {/* Date range */}
                            <span style={{ fontSize: '11px', fontWeight: 500, color: `${color}bb`, textAlign: 'center', lineHeight: 1.4 }}>
                                {start} – {end}
                            </span>
                        </div>

                        {/* Middle: role + bullets */}
                        <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: pipeline ? 'flex-start' : 'center' }}>
                            <span style={{
                                display: 'block',
                                fontSize: '19px', fontWeight: 800,
                                letterSpacing: '-0.02em', lineHeight: 1.15,
                                background: `linear-gradient(100deg, #ffffff 30%, ${color} 100%)`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                {role}
                            </span>
                            {blurb
                                ? <p style={{ fontSize: '15px', color: 'rgba(230,242,255,0.95)', lineHeight: 1.7, fontStyle: 'italic' }}>{blurb}</p>
                                : <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
                                    {bullets.map(({ label, detail }, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                                            <span style={{ color, fontSize: '15px', lineHeight: '22px', flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}88)` }}>▸</span>
                                            <span style={{ fontSize: '15px', lineHeight: '22px' }}>
                                                <span style={{ fontWeight: 800, color, filter: `drop-shadow(0 0 8px ${color}77)`, marginRight: 2 }}>{label}:</span>
                                                {' '}
                                                <span style={{ color: 'rgba(230,242,255,0.92)', fontWeight: 400 }}>{detail}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* Pipeline diagram — vertical stepper */}
                            {pipeline && pipelineLayout === 'vertical' && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${color}33` }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 620, margin: '0 auto' }}>
                                        {pipeline.map(({ Icon: NIcon, label, desc }, i) => (
                                            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 28 }}>

                                                {/* Step number + vertical connector */}
                                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0, width: 52, marginTop: 30 }}>
                                                    <div style={{
                                                        width: 52, height: 52, borderRadius: '50%', flexShrink: 0,
                                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                        background: `linear-gradient(135deg, ${color}cc, ${color}88)`,
                                                        border: `1px solid ${color}`,
                                                        boxShadow: `0 0 18px 6px ${color}55`,
                                                        fontSize: '18px', fontWeight: 800, color: '#0a1628',
                                                    }}>
                                                        {i + 1}
                                                    </div>
                                                    {i < pipeline.length - 1 && (
                                                        <div style={{
                                                            width: '2px', flex: 1, minHeight: 44,
                                                            background: `linear-gradient(180deg, ${color}99, ${color}22)`,
                                                            margin: '7px 0',
                                                        }}/>
                                                    )}
                                                </div>

                                                {/* Icon */}
                                                <NIcon size={56} style={{
                                                    flexShrink: 0, marginTop: 26,
                                                    color: `${color}dd`,
                                                    filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color}99) drop-shadow(0 0 28px ${color}44)`,
                                                }}/>

                                                {/* Label + desc */}
                                                <div style={{ paddingBottom: i < pipeline.length - 1 ? 40 : 0, paddingTop: 4 }}>
                                                    <div style={{ fontSize: '15px', fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
                                                        {label}
                                                    </div>
                                                    <div style={{ fontSize: '15px', color: 'rgba(230,242,255,0.95)', fontWeight: 500, lineHeight: 1.75 }}>
                                                        {desc}
                                                    </div>
                                                </div>

                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* grid layout */}
                            {pipeline && pipelineLayout === 'grid' && (() => {
                                const n = pipeline.length;
                                const cols = n === 3 ? 3 : 2;
                                return (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${color}33` }}>
                                    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: 28 }}>
                                        {pipeline.map(({ Icon: NIcon, label, desc }, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'flex-start', gap: 18,
                                                gridColumn: cols === 2 && n % 2 !== 0 && i === n - 1 ? 'span 2' : 'auto',
                                            }}>
                                                <NIcon size={48} style={{
                                                    flexShrink: 0,
                                                    color: `${color}dd`,
                                                    filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color}99) drop-shadow(0 0 28px ${color}44)`,
                                                }}/>
                                                <div style={{ paddingTop: 4 }}>
                                                    <div style={{ fontSize: 13, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 7 }}>
                                                        {label}
                                                    </div>
                                                    <div style={{ fontSize: 14, color: 'rgba(225,238,255,0.90)', fontWeight: 400, lineHeight: 1.7 }}>
                                                        {desc}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                );
                            })()}

                            {pipeline && pipelineLayout !== 'vertical' && pipelineLayout !== 'grid' && (() => {
                                const n = pipeline.length;
                                const edgePct = 100 / (2 * n);
                                return (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${color}33` }}>
                                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: `repeat(${n}, 1fr)`, alignItems: 'start' }}>

                                        {/* Track — dim background rail */}
                                        <div style={{
                                            position: 'absolute', top: '81px',
                                            left: `calc(${edgePct}%)`, right: `calc(${edgePct}%)`,
                                            height: '4px', borderRadius: '2px',
                                            background: `${color}22`,
                                        }}/>
                                        {/* Active line */}
                                        <div style={{
                                            position: 'absolute', top: '81px',
                                            left: `calc(${edgePct}%)`, right: `calc(${edgePct}%)`,
                                            height: '4px', borderRadius: '2px',
                                            background: `linear-gradient(90deg, ${color}66, ${color}ff, ${color}66)`,
                                            boxShadow: `0 0 8px 2px ${color}55, 0 0 18px 4px ${color}22`,
                                        }}/>

                                        {/* >>> arrows between nodes */}
                                        {pipeline.slice(1).map(({ connector: ConnIcon }, i) => {
                                            const pct = (i + 1) * (100 / n);
                                            return (
                                                <div key={i} style={{
                                                    position: 'absolute', left: `${pct}%`, top: '44px',
                                                    transform: 'translateX(-50%)',
                                                    zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2,
                                                }}>
                                                    {ConnIcon && <ConnIcon size={18} style={{
                                                        color,
                                                        filter: `drop-shadow(0 0 5px ${color}) drop-shadow(0 0 10px ${color}88)`,
                                                    }}/>}
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 0 }}>
                                                        {[0, 0.2, 0.4].map(delay => (
                                                            <ChevronRight key={delay} size={14} style={{
                                                                color,
                                                                filter: `drop-shadow(0 0 4px ${color})`,
                                                                animation: `pipeline-chevron 1.2s ease-in-out ${delay}s infinite`,
                                                            }}/>
                                                        ))}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {pipeline.map(({ Icon: NIcon, label, desc }, i) => (
                                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 8px' }}>
                                                <NIcon size={56} style={{
                                                    marginBottom: 16,
                                                    color: `${color}dd`,
                                                    filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color}99) drop-shadow(0 0 28px ${color}44)`,
                                                }}/>
                                                <div style={{
                                                    width: 18, height: 18, borderRadius: '50%', marginBottom: 12,
                                                    background: color,
                                                    boxShadow: `0 0 0 3px ${color}33, 0 0 12px 4px ${color}88`,
                                                    zIndex: 1,
                                                }}/>
                                                <span style={{ fontSize: '13px', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5, textAlign: 'center' }}>
                                                    {label}
                                                </span>
                                                <span style={{ fontSize: '13px', color: 'rgba(230,242,255,0.95)', fontWeight: 500, textAlign: 'center', lineHeight: 1.6 }}>{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                );
                            })()}
                        </div>

                        {/* Right: type + status */}
                        <div style={{
                            width: 110, flexShrink: 0,
                            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                            gap: 10, padding: '20px 14px',
                            borderLeft: `1px solid ${color}33`,
                            background: `linear-gradient(180deg, ${color}06 0%, transparent 100%)`,
                        }}>
                            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', color: `${color}88`, textTransform: 'uppercase' }}>Type</span>
                            <span style={{ fontSize: '13px', fontWeight: 700, color, textAlign: 'center', filter: `drop-shadow(0 0 6px ${color}77)` }}>{type}</span>

                            <div style={{ width: '60%', height: 1, background: `linear-gradient(90deg, transparent, ${color}44, transparent)` }}/>

                            <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.10em', color: `${color}88`, textTransform: 'uppercase' }}>Status</span>
                            <span style={{
                                fontSize: '11px', fontWeight: 700, textAlign: 'center',
                                color: statusColor,
                                filter: statusGlow,
                            }}>
                                {statusLabel}
                            </span>
                        </div>

                    </div>
                    );
                })}
            </div>
        </div>
    </section>
);
