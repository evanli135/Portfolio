import { useEffect, useRef, useState } from "react";
import { ArrowDown, Brain, Cpu, Shield, Share2, Globe, GitBranch, Bot, Layers, Activity, Zap, Target, Crosshair, type LucideIcon } from "lucide-react";
import { GlassText } from "./GlassText";

// ── Geometry ───────────────────────────────────────────────────────
const YEAR_W     = 820;
const PAD_X      = 260;
const START_YR   = 2022;
const END_YR     = 2027;
const CARD_W     = 240;
const EDU_CARD_W = 310;
const ABOVE_H    = 270;  // space above the line (cards + bars)
const BELOW_H    = 270;  // space below the line (edu card + year ticks)
const BAR_H      = 2;    // thin bar height — matches timeline width
const BAR_GAP    = 10;   // gap between bar bottom and line
const BAR_ROW_H  = BAR_H + 8;  // vertical spacing between stacked bar rows
const CONN       = 68;   // connector length
const NOTCH_H    = 14;
const SCROLL_SPD = 2;
const MONTHS     = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const EMPTY_CLR  = 'rgba(255,255,255,0.28)';

const CONTENT_W  = PAD_X * 2 + (END_YR - START_YR) * YEAR_W;
const LINE_TOP   = ABOVE_H;               // y-center of line
const BAR_BOT_Y  = LINE_TOP - BAR_GAP;   // bottom of bars (floating above line)
const BAR_TOP_Y  = BAR_BOT_Y - BAR_H;    // top of bars
const TOTAL_H    = ABOVE_H + BELOW_H;

const toX = (year: number, month = 1) =>
    PAD_X + (year - START_YR + (month - 1) / 12) * YEAR_W;

const YEAR_TICKS = Array.from(
    { length: END_YR - START_YR + 1 },
    (_, i) => START_YR + i
);

// ── Data ───────────────────────────────────────────────────────────
const education = {
    role: 'Systems Engineering Undergraduate',
    org: 'Northeastern University',
    degree: 'B.S. in Computer Science  ·  2023 – 2027',
    gpa: 'GPA: 3.84',
    color: '#E8345C',
    startYear: 2023, startMonth: 9,
    endYear: 2027, endMonth: 5,
};

const internships: { role: string; org: string; blurb: string; color: string; ongoing: boolean; startYear: number; startMonth: number; endYear: number; endMonth: number; cardOffset?: number; barRow?: number }[] = [
    {
        role: 'NLP Engineer', org: 'MatrixOrigin',
        blurb: 'Configured and evaluated NL → NLP platform',
        color: '#2DD4BF', ongoing: false,
        startYear: 2024, startMonth: 6,
        endYear:   2024, endMonth: 9,
    },
    {
        role: 'Distributed Systems Security Researcher', org: 'NEU Privacy & Security Lab',
        blurb: 'First authored paper on LLM Security Systems',
        color: '#D946EF', ongoing: false,
        startYear: 2025, startMonth: 1,
        endYear:   2025, endMonth: 7,
    },
    {
        role: 'Software Engineer', org: 'Vestmark',
        blurb: 'Prototyping and maintaining wealth agent services',
        color: '#60A5FA', ongoing: false,
        startYear: 2026, startMonth: 1,
        endYear:   2026, endMonth: 6,
    },
    {
        role: 'R&D Test Systems', org: 'Keysight',
        blurb: 'Prototyping AI powered tools for anomaly detection and stress testing',
        color: '#2DD4BF', ongoing: false,
        startYear: 2026, startMonth: 7,
        endYear:   2026, endMonth: 9,
        cardOffset: 70,
    },
];

// ── Component ──────────────────────────────────────────────────────
export const HeroSection = () => {
    const [scrollX,   setScrollX]   = useState(0);
    const [maxScroll, setMaxScroll] = useState(0);
    const rafRef        = useRef<number | null>(null);
    const containerRef  = useRef<HTMLDivElement>(null);
    const initialized   = useRef(false);
    const maxScrollRef  = useRef(0);
    const scrollXRef    = useRef(0);  // source of truth for RAF; avoids setState-in-updater side effects

    useEffect(() => {
        const measure = () => {
            const w   = containerRef.current?.clientWidth ?? 0;
            const max = Math.max(0, CONTENT_W - w);
            maxScrollRef.current = max;
            setMaxScroll(max);
            if (!initialized.current) {
                const centerX = toX(2025, 1);
                const init = Math.max(0, Math.min(max, centerX - w / 2));
                scrollXRef.current = init;
                setScrollX(init);
                initialized.current = true;
            }
        };
        measure();
        window.addEventListener('resize', measure);
        return () => window.removeEventListener('resize', measure);
    }, []);

    // Auto-scroll the timeline back and forth
    useEffect(() => {
        if (maxScroll === 0) return;
        let dir = 1;
        const step = () => {
            const next = scrollXRef.current + dir * 1.8;
            if (next >= maxScrollRef.current) dir = -1;
            else if (next <= 0) dir = 1;
            scrollXRef.current = Math.max(0, Math.min(maxScrollRef.current, next));
            setScrollX(scrollXRef.current);
            rafRef.current = requestAnimationFrame(step);
        };
        rafRef.current = requestAnimationFrame(step);
        return () => { if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; } };
    }, [maxScroll]);

    return (
        <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-24">

            {/* Nebula orbs */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div style={{ width:"900px", height:"600px", borderRadius:"50%", filter:"blur(25px)",
                    background:"radial-gradient(ellipse, rgba(45,212,191,0.45) 0%, rgba(45,212,191,0.18) 45%, transparent 70%)" }}/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div style={{ width:"600px", height:"420px", borderRadius:"50%", filter:"blur(30px)", transform:"translate(280px,-160px)",
                    background:"radial-gradient(ellipse, rgba(96,165,250,0.40) 0%, transparent 70%)" }}/>
            </div>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <div style={{ width:"550px", height:"380px", borderRadius:"50%", filter:"blur(30px)", transform:"translate(-260px,180px)",
                    background:"radial-gradient(ellipse, rgba(217,70,239,0.36) 0%, transparent 70%)" }}/>
            </div>
            <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{
                backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat:'repeat', backgroundSize:'128px 128px', opacity:0.055, mixBlendMode:'overlay',
            }}/>

            <div className="container max-w-5xl mx-auto text-center z-10 w-full">

                {/* Name */}
                <p className="text-xs md:text-sm tracking-[0.3em] uppercase text-primary/60 mb-3 opacity-0 animate-fade-in">
                    Portfolio
                </p>
                <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-6 opacity-0 animate-fade-in-delay-1">
                    <span className="text-gradient">Evan</span>
                    <span className="text-foreground"> Li</span>
                </h1>
                <div className="mb-10 opacity-0 animate-fade-in-delay-1">
                    <GlassText style={{ fontSize: '1.15rem' }}>What I work on</GlassText>
                </div>
                {/* Discipline boxes — triangle by vertical offset, apex at center */}
                {(() => {
                    type Cat = { name: string; Icon: LucideIcon };
                    const boxes: { label: string; color: string; Icon: LucideIcon; lift: number; categories: Cat[] }[] = [
                        { label: 'AI', color: '#2DD4BF', Icon: Brain, lift: 0,
                          categories: [
                              { name: 'Agent Integration',   Icon: Bot      },
                              { name: 'LLM Orchestration',   Icon: Layers   },
                              { name: 'Anomaly Detection',   Icon: Activity },
                          ],
                        },
                        { label: 'Systems',  color: '#60A5FA', Icon: Cpu,    lift: 130,
                          categories: [
                              { name: 'Distributed Systems', Icon: Share2    },
                              { name: 'Network Systems',     Icon: Globe     },
                              { name: 'Concurrent Systems',  Icon: GitBranch },
                          ],
                        },
                        { label: 'Security', color: '#D946EF', Icon: Shield, lift: 0,
                          categories: [
                              { name: 'Adversarial AI',    Icon: Zap       },
                              { name: 'Red Teaming',       Icon: Target    },
                              { name: 'Attack Emulation',  Icon: Crosshair },
                          ],
                        },
                    ];
                    return (
                        <div className="flex justify-center items-end gap-16 mb-14 opacity-0 animate-fade-in-delay-2">
                            {boxes.map(({ label, color, Icon, lift, categories }) => (
                                <div key={label} style={{
                                    width: 210,
                                    marginBottom: lift,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    padding: '22px 18px 20px',
                                    gap: 16,
                                    border: `1px solid ${color}88`,
                                    borderBottom: `2px solid ${color}`,
                                    background: `linear-gradient(160deg, ${color}18 0%, ${color}0a 100%)`,
                                    backdropFilter: 'blur(22px)',
                                    WebkitBackdropFilter: 'blur(22px)',
                                    borderRadius: '16px',
                                    boxShadow: `0 0 40px 8px ${color}38, inset 0 1px 0 ${color}55, inset 0 -1px 0 ${color}22`,
                                }}>
                                    {/* Glassy icon emblem */}
                                    <div style={{
                                        width: 66, height: 66,
                                        borderRadius: '14px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        background: `linear-gradient(135deg, ${color}30 0%, ${color}12 100%)`,
                                        border: `1px solid ${color}55`,
                                        backdropFilter: 'blur(12px)',
                                        WebkitBackdropFilter: 'blur(12px)',
                                        boxShadow: `0 0 22px 6px ${color}28, inset 0 1px 0 ${color}44`,
                                    }}>
                                        <Icon size={30} style={{ stroke: color, opacity: 0.95, filter: `drop-shadow(0 0 8px ${color}aa)` }}/>
                                    </div>

                                    <span style={{ fontSize: '13px', fontWeight: 800, letterSpacing: '0.16em', color, textTransform: 'uppercase' }}>
                                        {label}
                                    </span>

                                    {/* Category rows */}
                                    {categories.length > 0 && (
                                        <div style={{
                                            width: '100%',
                                            borderTop: `1px solid ${color}30`,
                                            paddingTop: 14,
                                            display: 'flex', flexDirection: 'column', gap: 10,
                                        }}>
                                            {categories.map(({ name, Icon: CatIcon }) => (
                                                <div key={name} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '5px 8px', borderRadius: 8, background: `${color}0a` }}>
                                                    <CatIcon size={14} style={{ stroke: color, opacity: 0.8, flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}66)` }}/>
                                                    <span style={{ fontSize: '12px', color, fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    );
                })()}

            </div>{/* end max-w-5xl container */}

            {/* Timeline — full viewport width */}
            <div className="opacity-0 animate-fade-in-delay-3 w-full z-10" style={{ position:'relative' }}>

                    <div ref={containerRef} style={{
                        overflow:'hidden', position:'relative', height:TOTAL_H,
                        maskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                        WebkitMaskImage:'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
                    }}>
                        <div style={{
                            width:CONTENT_W, height:TOTAL_H, position:'relative',
                            transform:`translateX(${-scrollX}px)`,
                        }}>

                            {/* Base gradient line — glass tube */}
                            <div style={{
                                position:'absolute', top: LINE_TOP - 3, left:0, right:0, height:'7px',
                                borderRadius: '4px',
                                background:'linear-gradient(90deg, rgba(45,212,191,0.55) 0%, rgba(200,230,255,0.65) 35%, rgba(217,70,239,0.48) 70%, rgba(45,212,191,0.45) 100%)',
                                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                                border:'1px solid rgba(255,255,255,0.35)',
                                boxShadow:'0 0 12px 2px rgba(255,255,255,0.18), 0 0 28px 4px rgba(200,225,255,0.12), inset 0 1px 0 rgba(255,255,255,0.55), inset 0 -1px 0 rgba(255,255,255,0.12)',
                                zIndex:1,
                            }}/>

                            {/* Year ticks — below line */}
                            {YEAR_TICKS.map(year => {
                                const x   = toX(year);
                                const dim = year === 2027;
                                const clr = dim ? EMPTY_CLR : 'rgba(255,255,255,0.5)';
                                return (
                                    <div key={year} style={{ position:'absolute', left:x, top: LINE_TOP + 2, transform:'translateX(-50%)', zIndex:2 }}>
                                        <div style={{ width:'2px', height:NOTCH_H, background:clr, opacity: dim ? 0.35 : 0.80, margin:'0 auto' }}/>
                                        <p style={{ fontSize:'13px', fontWeight:700, letterSpacing:'0.08em', color:clr, opacity: dim ? 0.35 : 0.95, marginTop:4, whiteSpace:'nowrap' }}>
                                            {year}
                                        </p>
                                    </div>
                                );
                            })}

                            {/* Month notches — float above/below each bar at its endpoints */}
                            {(() => {
                                type Pt = { x: number; label: string; color: string; below: boolean };
                                const points: Pt[] = [];
                                const eduBarTop = LINE_TOP + BAR_GAP;
                                internships.forEach(e => {
                                    points.push({ x: toX(e.startYear, e.startMonth), label: MONTHS[e.startMonth - 1], color: e.color, below: false });
                                    points.push({ x: toX(e.endYear,   e.endMonth),   label: MONTHS[e.endMonth   - 1], color: e.color, below: false });
                                });
                                points.push({ x: toX(education.startYear, education.startMonth), label: MONTHS[education.startMonth - 1], color: education.color, below: true });
                                points.push({ x: toX(education.endYear,   education.endMonth),   label: MONTHS[education.endMonth   - 1], color: education.color, below: true });
                                // deduplicate by x within 2px
                                const seen: number[] = [];
                                return points.filter(p => {
                                    if (seen.some(s => Math.abs(s - p.x) < 2)) return false;
                                    seen.push(p.x); return true;
                                }).map((p, i) => {
                                    // above bar: label sits just above BAR_TOP_Y; below bar: just below edu bar
                                    const top = p.below ? eduBarTop + BAR_H + 3 : BAR_TOP_Y - 22;
                                    return (
                                        <div key={i} style={{ position:'absolute', left: p.x, top, transform:'translateX(-50%)', zIndex:5, pointerEvents:'none' }}>
                                            <p style={{ fontSize:'12px', fontWeight:700, color: p.color, opacity:1, whiteSpace:'nowrap', letterSpacing:'0.04em', margin:0 }}>
                                                {p.label}
                                            </p>
                                        </div>
                                    );
                                });
                            })()}

                            {/* Education — bar below line + card below */}
                            {(() => {
                                const startX  = toX(education.startYear, education.startMonth);
                                const endX    = toX(education.endYear,   education.endMonth);
                                const barMidX = (startX + endX) / 2;
                                const barW    = endX - startX;
                                const barTop  = LINE_TOP + BAR_GAP;
                                return (
                                    <>
                                        <div style={{
                                            position:'absolute', zIndex:3,
                                            left: startX, top: barTop,
                                            width: barW, height: BAR_H,
                                            borderRadius: BAR_H / 2,
                                            background: education.color + 'cc',
                                            boxShadow:`0 0 8px 2px ${education.color}44, 0 0 18px 4px ${education.color}1a`,
                                        }}/>
                                        <div style={{
                                            position:'absolute', zIndex:2,
                                            left: barMidX - 1, top: barTop + BAR_H,
                                            width:'2px', height: CONN,
                                            background: education.color, opacity:0.5,
                                        }}/>
                                        <div style={{
                                            position:'absolute', zIndex:4,
                                            left: barMidX - EDU_CARD_W / 2,
                                            top: barTop + BAR_H + CONN,
                                            width: EDU_CARD_W,
                                        }}>
                                            <ExpCard role={education.role} org={education.org} degree={education.degree} gpa={education.gpa} color={education.color} accent="bottom"/>
                                        </div>
                                    </>
                                );
                            })()}

                            {/* Internship bars — thin, floating above line */}
                            {internships.map((exp, i) => {
                                const startX   = toX(exp.startYear, exp.startMonth);
                                const endX     = toX(exp.endYear,   exp.endMonth);
                                const barMidX  = (startX + endX) / 2;
                                const cardMidX = barMidX + (exp.cardOffset ?? 0);
                                const barW     = endX - startX;
                                const rowShift = (exp.barRow ?? 0) * BAR_ROW_H;
                                const barTop   = BAR_TOP_Y - rowShift;

                                return (
                                    <div key={i}>
                                        {/* Thin bar above line */}
                                        <div style={{
                                            position:'absolute', zIndex:3,
                                            left: startX, top: barTop,
                                            width: barW, height: BAR_H,
                                            borderRadius: BAR_H / 2,
                                            background: exp.color + 'cc',
                                            boxShadow:`0 0 8px 2px ${exp.color}44, 0 0 18px 4px ${exp.color}1a`,
                                        }}/>

                                        {/* Connector from bar top to card */}
                                        <div style={{
                                            position:'absolute', zIndex:2,
                                            left: barMidX - 1, top: barTop - CONN,
                                            width:'2px', height: CONN,
                                            background: exp.color, opacity:0.5,
                                        }}/>

                                        {/* Card above */}
                                        <div style={{
                                            position:'absolute', zIndex:4,
                                            left: cardMidX - CARD_W / 2,
                                            bottom: TOTAL_H - barTop + CONN,
                                            width: CARD_W,
                                        }}>
                                            <ExpCard role={exp.role} org={exp.org} blurb={exp.blurb} color={exp.color} accent="top"/>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>

            {/* CTA */}
            <div className="mt-10 opacity-0 animate-fade-in-delay-4 z-10">
                <a href="#projects" className="cosmic-button">View My Work</a>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2">Scroll</span>
                <ArrowDown className="h-5 w-5 text-primary"/>
            </div>
        </section>
    );
};

// ── Sub-components ─────────────────────────────────────────────────


function ExpCard({ role, org, blurb, degree, gpa, color, accent }: {
    role: string; org: string; blurb?: string; degree?: string; gpa?: string; color: string; accent: 'top' | 'bottom';
}) {
    const borderAccent = accent === 'top'
        ? { borderTop: `2px solid ${color}` }
        : { borderBottom: `2px solid ${color}` };
    return (
        <div style={{
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
            border:`1px solid ${color}44`, ...borderAccent,
            borderRadius:'12px', padding:'13px 15px', textAlign:'left',
            boxShadow:`0 0 20px 4px ${color}20`,
        }}>
            <p style={{ fontSize:'14px', fontWeight:700, color:'var(--color-foreground)', marginBottom:'4px', lineHeight:1.3 }}>
                {role}
            </p>
            <p style={{ fontSize:'13px', color, fontWeight:600, marginBottom: (blurb || degree) ? '6px' : 0 }}>
                {org}
            </p>
            {degree && (
                <p style={{ fontSize:'12px', color:'rgba(210,225,245,0.95)', lineHeight:1.4, marginBottom:'4px' }}>
                    {degree}
                </p>
            )}
            {gpa && (
                <p style={{ fontSize:'12px', color, fontWeight:700, marginBottom: blurb ? '5px' : 0 }}>
                    {gpa}
                </p>
            )}
            {blurb && (
                <p style={{ fontSize:'12px', color:'rgba(210,225,245,0.95)', lineHeight:1.4, fontStyle:'italic' }}>
                    {blurb}
                </p>
            )}
        </div>
    );
}
