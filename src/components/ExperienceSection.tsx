import { Bot, Shield, Briefcase, Cpu, type LucideIcon } from 'lucide-react';

interface Bullet   { label: string; detail: string }
interface ExpEntry {
    role: string;
    org: string;
    start: string;
    end: string;
    color: string;
    current?: boolean;
    type: string;
    Icon: LucideIcon;
    bullets: Bullet[];
}

const EXPERIENCES: ExpEntry[] = [
    {
        role: 'Software Engineer',
        org: 'Vestmark',
        start: 'Jan 2026', end: 'Jul 2026',
        color: '#60A5FA',
        current: true,
        type: 'Co-op',
        Icon: Briefcase,
        bullets: [
            { label: 'Wealth Agent',    detail: 'prototyping and maintaining an AI-powered financial advisor agent service' },
            { label: 'Feature Dev',     detail: 'patching and extending agent capabilities to improve efficiency and UX' },
            { label: 'Security',        detail: 'ensuring secure, compliant behavior across agent interactions and data flows' },
        ],
    },
    {
        role: 'Distributed Systems Security Researcher',
        org: 'NEU Privacy & Security Lab',
        start: 'Jan 2025', end: 'Jul 2025',
        color: '#D946EF',
        current: false,
        type: 'Research',
        Icon: Shield,
        bullets: [
            { label: 'First Author',    detail: 'authored ACE — a security architecture for LLM-integrated app systems, accepted to NDSS 2026' },
            { label: 'Threat Modeling', detail: 'studied indirect prompt injection and denial-of-service attacks on multi-agent systems' },
            { label: 'Framework',       detail: 'designed static analysis and secure information flow enforcement for agent pipelines' },
        ],
    },
    {
        role: 'R&D Test Systems Engineer',
        org: 'Keysight Technologies',
        start: 'Jul 2026', end: 'Sep 2026',
        color: '#F97316',
        current: false,
        type: 'Co-op',
        Icon: Cpu,
        bullets: [
            { label: 'Anomaly Detection', detail: 'prototyping AI-powered tooling to detect anomalies in hardware test systems' },
            { label: 'Stress Testing',    detail: 'building automated pipelines for load and stress testing of R&D instrumentation' },
            { label: 'Integration',       detail: 'bridging hardware telemetry with ML inference for real-time diagnostics' },
        ],
    },
    {
        role: 'NLP Engineer',
        org: 'MatrixOrigin',
        start: 'Jun 2024', end: 'Sep 2024',
        color: '#2DD4BF',
        current: false,
        type: 'Co-op',
        Icon: Bot,
        bullets: [
            { label: 'NL → SQL',        detail: 'configured and evaluated a natural language to SQL LLM platform end-to-end' },
            { label: 'Evaluation',       detail: 'designed benchmark suites to measure query accuracy and edge-case coverage' },
            { label: 'Prompt Design',    detail: 'iterated on prompt strategies to improve schema-awareness and output reliability' },
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
                {EXPERIENCES.map(({ role, org, start, end, color, current, type, Icon, bullets }) => (
                    <div key={org + role} style={{
                        display: 'flex', alignItems: 'stretch',
                        borderRadius: '16px',
                        border: `1px solid ${color}55`,
                        borderLeft: `3px solid ${color}`,
                        background: `linear-gradient(100deg, ${color}0c 0%, ${color}05 50%, transparent 100%)`,
                        backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
                        boxShadow: `0 0 32px 6px ${color}18, inset 0 1px 0 ${color}28, inset 0 -1px 0 ${color}12`,
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
                            {/* Icon emblem */}
                            <div style={{
                                width: 54, height: 54, borderRadius: '13px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                background: `linear-gradient(135deg, ${color}20 0%, ${color}0a 100%)`,
                                border: `1px solid ${color}55`,
                                boxShadow: `0 0 18px 4px ${color}20, inset 0 1px 0 ${color}33`,
                            }}>
                                <Icon size={26} style={{ color, filter: `drop-shadow(0 0 8px ${color}cc)` }}/>
                            </div>

                            {/* Org name */}
                            <span style={{ fontSize: '12px', fontWeight: 800, color, textAlign: 'center', letterSpacing: '0.06em', filter: `drop-shadow(0 0 6px ${color}77)` }}>
                                {org}
                            </span>

                            {/* Date range */}
                            <span style={{ fontSize: '11px', fontWeight: 500, color: `${color}bb`, textAlign: 'center', lineHeight: 1.4 }}>
                                {start} – {end}
                            </span>
                        </div>

                        {/* Middle: role + bullets */}
                        <div style={{ flex: 1, padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: 12, justifyContent: 'center' }}>
                            <span style={{
                                fontSize: '19px', fontWeight: 800,
                                letterSpacing: '-0.02em', lineHeight: 1.15,
                                background: `linear-gradient(100deg, #ffffff 30%, ${color} 100%)`,
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}>
                                {role}
                            </span>
                            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 8 }}>
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
                                color: current ? '#2DD4BF' : `${color}99`,
                                filter: current ? 'drop-shadow(0 0 6px rgba(45,212,191,0.7))' : 'none',
                            }}>
                                {current ? 'Current' : 'Completed'}
                            </span>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    </section>
);
