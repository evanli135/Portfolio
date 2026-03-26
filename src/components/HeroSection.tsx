import { useEffect, useRef, useState } from "react";
import { ArrowDown, ChevronLeft, ChevronRight } from "lucide-react";

// ── Geometry ───────────────────────────────────────────────────────
const YEAR_W     = 500;
const PAD_X      = 70;
const START_YR   = 2022;
const END_YR     = 2027;
const CARD_W     = 185;
const EDU_CARD_W = 230;
const ABOVE_H    = 160;  // space above the line (cards + bars)
const BELOW_H    = 145;  // space below the line (edu card + year ticks)
const BAR_H      = 2;    // thin bar height — matches timeline width
const BAR_GAP    = 8;    // gap between bar bottom and line
const BAR_ROW_H  = BAR_H + 8;  // vertical spacing between stacked bar rows
const CONN       = 28;   // connector length
const NOTCH_H    = 10;
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
    role: 'CS Undergrad', org: 'Northeastern University',
    detail: 'Sep 2023 – May 2027  ·  Systems Engineering',
    color: '#60A5FA',
    startYear: 2023, startMonth: 9,
    endYear: 2027, endMonth: 5,
};

const internships = [
    {
        role: 'NLP Engineer', org: 'MatrixOrigin',
        detail: 'Jun – Aug 2024  ·  NL → SQL LLM platform',
        color: '#2DD4BF', ongoing: false,
        startYear: 2024, startMonth: 6,
        endYear:   2024, endMonth: 9,
    },
    {
        role: 'Security Researcher', org: 'NEU Privacy & Security Lab',
        detail: 'Jan – Jun 2025  ·  NDSS paper, LLM security',
        color: '#D946EF', ongoing: false,
        startYear: 2025, startMonth: 1,
        endYear:   2025, endMonth: 7,
    },
    {
        role: 'Software Engineer', org: 'Vestmark',
        detail: 'Jan – Jun 2026  ·  Financial advisor AI agent',
        color: '#60A5FA', ongoing: false,
        startYear: 2026, startMonth: 1,
        endYear:   2026, endMonth: 7,
    },
    {
        role: 'R&D Software Engineer', org: 'Keysight',
        detail: 'Jul – Aug 2026  ·  Test software engineering',
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
                const centerX = toX(2024, 1);
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

    const stopScroll = () => {
        if (rafRef.current !== null) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    };
    const startScroll = (dir: 1 | -1) => {
        stopScroll();
        const step = () => {
            const next = Math.max(0, Math.min(maxScrollRef.current, scrollXRef.current + dir * SCROLL_SPD));
            if (next !== scrollXRef.current) {
                scrollXRef.current = next;
                setScrollX(next);
                rafRef.current = requestAnimationFrame(step);
            } else {
                rafRef.current = null;
            }
        };
        rafRef.current = requestAnimationFrame(step);
    };

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
                <h1 className="text-7xl md:text-9xl font-black tracking-tight leading-none mb-4 opacity-0 animate-fade-in-delay-1">
                    <span className="text-gradient">Evan</span>
                    <span className="text-foreground"> Li</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground tracking-wide mb-14 opacity-0 animate-fade-in-delay-2">
                    Systems Engineer &nbsp;·&nbsp; Security Researcher &nbsp;·&nbsp; Builder
                </p>

                {/* Timeline */}
                <div className="opacity-0 animate-fade-in-delay-3 w-full" style={{ position:'relative' }}>

                    <ScrollBtn dir="left"  faded={scrollX <= 0}         lineTop={LINE_TOP}
                        onMouseDown={() => startScroll(-1)} onMouseUp={stopScroll} onMouseLeave={stopScroll}/>
                    <ScrollBtn dir="right" faded={scrollX >= maxScroll} lineTop={LINE_TOP}
                        onMouseDown={() => startScroll(1)}  onMouseUp={stopScroll} onMouseLeave={stopScroll}/>

                    <div ref={containerRef} style={{ overflow:'hidden', position:'relative', height:TOTAL_H }}>
                        <div style={{
                            width:CONTENT_W, height:TOTAL_H, position:'relative',
                            transform:`translateX(${-scrollX}px)`,
                            transition: rafRef.current === null ? 'transform 0.15s ease-out' : 'none',
                        }}>

                            {/* Base gradient line */}
                            <div style={{
                                position:'absolute', top: LINE_TOP, left:0, right:0, height:'2px',
                                background:'linear-gradient(90deg, #2DD4BF 0%, #60A5FA 40%, #D946EF 70%, #2DD4BF 100%)',
                                boxShadow:'0 0 6px 2px rgba(45,212,191,0.25)',
                                zIndex:1,
                            }}/>

                            {/* Year ticks — below line */}
                            {YEAR_TICKS.map(year => {
                                const x   = toX(year);
                                const dim = year === 2027;
                                const clr = dim ? EMPTY_CLR : 'rgba(255,255,255,0.5)';
                                return (
                                    <div key={year} style={{ position:'absolute', left:x, top: LINE_TOP + 2, transform:'translateX(-50%)', zIndex:2 }}>
                                        <div style={{ width:'1px', height:NOTCH_H, background:clr, opacity: dim ? 0.35 : 0.55, margin:'0 auto' }}/>
                                        <p style={{ fontSize:'10px', fontWeight:600, letterSpacing:'0.08em', color:clr, opacity: dim ? 0.35 : 0.65, marginTop:3, whiteSpace:'nowrap' }}>
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
                                    const top = p.below ? eduBarTop + BAR_H + 3 : BAR_TOP_Y - 14;
                                    return (
                                        <div key={i} style={{ position:'absolute', left: p.x, top, transform:'translateX(-50%)', zIndex:5, pointerEvents:'none' }}>
                                            <p style={{ fontSize:'8px', fontWeight:600, color: p.color, opacity:0.85, whiteSpace:'nowrap', letterSpacing:'0.04em', margin:0 }}>
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
                                            <ExpCard role={education.role} org={education.org} color={education.color} accent="bottom"/>
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
                                            <ExpCard role={exp.role} org={exp.org} color={exp.color} accent="top"/>
                                        </div>
                                    </div>
                                );
                            })}

                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="mt-10 opacity-0 animate-fade-in-delay-4">
                    <a href="#projects" className="cosmic-button">View My Work</a>
                </div>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
                <span className="text-sm text-muted-foreground mb-2">Scroll</span>
                <ArrowDown className="h-5 w-5 text-primary"/>
            </div>
        </section>
    );
};

// ── Sub-components ─────────────────────────────────────────────────

function ScrollBtn({ dir, faded, lineTop, onMouseDown, onMouseUp, onMouseLeave }: {
    dir: 'left' | 'right'; faded: boolean; lineTop: number;
    onMouseDown: () => void; onMouseUp: () => void; onMouseLeave: () => void;
}) {
    return (
        <button onMouseDown={onMouseDown} onMouseUp={onMouseUp} onMouseLeave={onMouseLeave}
            style={{
                position:'absolute', top: lineTop, [dir]: -52, transform:'translateY(-50%)',
                zIndex:10, width:42, height:42, borderRadius:'50%',
                border:'1px solid rgba(255,255,255,0.15)',
                background:'rgba(255,255,255,0.06)',
                backdropFilter:'blur(8px)', WebkitBackdropFilter:'blur(8px)',
                display:'flex', alignItems:'center', justifyContent:'center',
                cursor:'pointer', color:'#2DD4BF',
                opacity: faded ? 0.2 : 0.85,
                transition:'opacity 0.3s',
            }}>
            {dir === 'left' ? <ChevronLeft size={22}/> : <ChevronRight size={22}/>}
        </button>
    );
}

function ExpCard({ role, org, color, accent }: {
    role: string; org: string; color: string; accent: 'top' | 'bottom';
}) {
    const borderAccent = accent === 'top'
        ? { borderTop: `2px solid ${color}` }
        : { borderBottom: `2px solid ${color}` };
    return (
        <div style={{
            background:'rgba(255,255,255,0.04)',
            backdropFilter:'blur(10px)', WebkitBackdropFilter:'blur(10px)',
            border:`1px solid ${color}44`, ...borderAccent,
            borderRadius:'10px', padding:'9px 11px', textAlign:'left',
            boxShadow:`0 0 16px 2px ${color}18`,
        }}>
            <p style={{ fontSize:'12px', fontWeight:600, color:'var(--color-foreground)', marginBottom:'2px', lineHeight:1.3 }}>
                {role}
            </p>
            <p style={{ fontSize:'11px', color, fontWeight:500 }}>
                {org}
            </p>
        </div>
    );
}
