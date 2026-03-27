import React from 'react';
import { Bot, Shield, Briefcase, Cpu, MessageSquare, Cog, Database, type LucideIcon } from 'lucide-react';
import vestmarkLogo    from '../assets/vestmarklogo.png';
import nuseal          from '../assets/NUseal.png';
import keysightLogo    from '../assets/KeysightLogo (2).png';
import matrixLogo      from '../assets/matrixoriginlogo.png';

interface Bullet        { label: string; detail: string }
interface PipelineNode  { Icon: LucideIcon; label: string; desc: React.ReactNode; sub?: never }
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
            { Icon: Cog,           label: 'LLM Transformation', desc: <>Improved accuracy by <strong>40%</strong> via <strong>prompt engineering</strong> and few-shot examples</> },
            { Icon: Database,      label: 'SQL Execution',       desc: <>Wired LLM to live <strong>DB services</strong> for <strong>schema-aware</strong> generation and automated <strong>data fetching</strong></> },
        ],
    },
    {
        role: 'Distributed Systems Security Researcher',
        org: 'NEU Privacy & Security Lab',
        industry: 'Acadamia',
        start: 'Jan 2025', end: 'Jul 2025',
        color: '#E8345C',
        logoColor: '#CC2030',
        status: 'completed',
        type: 'Co-op',
        Icon: Shield,
        logo: nuseal,
        bullets: [
            { label: 'First Author',    detail: 'authored ACE — a security architecture for LLM-integrated app systems, accepted to NDSS 2026' },
            { label: 'Threat Modeling', detail: 'studied indirect prompt injection and denial-of-service attacks on multi-agent systems' },
            { label: 'Framework',       detail: 'designed static analysis and secure information flow enforcement for agent pipelines' },
        ],
    },
    {
        role: 'Software Engineer',
        org: 'Vestmark',
        industry: 'Finance',
        start: 'Jan 2026', end: 'Jul 2026',
        color: '#60A5FA',
        logoColor: '#3AAFA9',
        status: 'current',
        type: 'Co-op',
        Icon: Briefcase,
        logo: vestmarkLogo,
        bullets: [
            { label: 'Wealth Agent',    detail: 'prototyping and maintaining an AI-powered financial advisor agent service' },
            { label: 'Feature Dev',     detail: 'patching and extending agent capabilities to improve efficiency and UX' },
            { label: 'Security',        detail: 'ensuring secure, compliant behavior across agent interactions and data flows' },
        ],
    },
    {
        role: 'R&D Test Systems Engineer',
        org: 'Keysight Technologies',
        industry: 'Electronics',
        start: 'Jul 2026', end: 'Sep 2026',
        color: '#F97316',
        logoColor: '#E8192C',
        status: 'upcoming',
        type: 'Internship',
        Icon: Cpu,
        logo: keysightLogo,
        bullets: [
            { label: 'Anomaly Detection', detail: 'prototyping AI-powered tooling to detect anomalies in hardware test systems' },
            { label: 'Stress Testing',    detail: 'building automated pipelines for load and stress testing of R&D instrumentation' },
            { label: 'Integration',       detail: 'bridging hardware telemetry with ML inference for real-time diagnostics' },
        ],
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
                {EXPERIENCES.map(({ role, org, industry, start, end, color, logoColor: lc, status, type, Icon, logo, blurb, bullets, pipeline }) => {
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
                                ? <p style={{ fontSize: '13px', color: 'rgba(215,230,248,0.85)', lineHeight: 1.65, fontStyle: 'italic' }}>{blurb}</p>
                                : <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
                                    {bullets.map(({ label, detail }, i) => (
                                        <li key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 9 }}>
                                            <span style={{ color, fontSize: '13px', lineHeight: '20px', flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}88)` }}>▸</span>
                                            <span style={{ fontSize: '13px', lineHeight: '20px' }}>
                                                <span style={{ fontWeight: 700, color, filter: `drop-shadow(0 0 6px ${color}55)`, marginRight: 2 }}>{label}:</span>
                                                {' '}
                                                <span style={{ color: 'rgba(215,230,248,0.90)', fontWeight: 400 }}>{detail}</span>
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            }

                            {/* Pipeline diagram */}
                            {pipeline && (
                                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${color}33` }}>
                                    <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', alignItems: 'start' }}>

                                        {/* Connecting line — top = icon(48) + marginBottom(16) + dot_half(8) = 72px */}
                                        <div style={{
                                            position: 'absolute',
                                            top: '72px',
                                            left: 'calc(16.66%)',
                                            right: 'calc(16.66%)',
                                            height: '2px',
                                            background: `linear-gradient(90deg, ${color}99, ${color}ff, ${color}99)`,
                                            boxShadow: `0 0 6px 1px ${color}66`,
                                        }}/>

                                        {pipeline.map(({ Icon: NIcon, label, desc }, i) => (
                                            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 12px' }}>
                                                {/* Icon — glassified directly */}
                                                <NIcon size={48} style={{
                                                    marginBottom: 16,
                                                    color: `${color}dd`,
                                                    filter: `drop-shadow(0 0 6px ${color}) drop-shadow(0 0 14px ${color}99) drop-shadow(0 0 28px ${color}44)`,
                                                }}/>
                                                {/* Node dot */}
                                                <div style={{
                                                    width: 16, height: 16, borderRadius: '50%', marginBottom: 12,
                                                    background: color,
                                                    boxShadow: `0 0 10px 3px ${color}88`,
                                                    zIndex: 1,
                                                }}/>
                                                {/* Label */}
                                                <span style={{ fontSize: '13px', fontWeight: 700, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5, textAlign: 'center' }}>
                                                    {label}
                                                </span>
                                                {/* Desc */}
                                                <span style={{ fontSize: '12px', color: `${color}bb`, fontWeight: 600, textAlign: 'center', lineHeight: 1.6 }}>{desc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
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
