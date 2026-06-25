import React from 'react';
import { cn } from "../lib/utils";
import { Star, Cpu, Microscope, Feather, Mail, Phone, MapPin, Github, Linkedin } from "lucide-react";
// import portrait from '../assets/portrait.png';

const TEAL = '#2DD4BF';

// Scattered star configs for the merged bottom box sides
const STARS_BOTTOM: { top: string; left?: string; right?: string; size: number; opacity: number; rotate: number }[] = [
    { top: '5%',  left:  '1%',  size: 16, opacity: 0.18, rotate: 15 },
    { top: '20%', right: '1%',  size: 12, opacity: 0.14, rotate: 40 },
    { top: '50%', left:  '0.5%',size: 20, opacity: 0.10, rotate: 0  },
    { top: '70%', right: '1%',  size: 10, opacity: 0.15, rotate: 25 },
    { top: '88%', left:  '2%',  size: 8,  opacity: 0.16, rotate: 60 },
    { top: '40%', right: '0.8%',size: 14, opacity: 0.12, rotate: 5  },
];

const StarDeco = ({ stars }: { stars: typeof STARS_BOTTOM }) => (
    <>
        {stars.map((s, i) => (
            <Star
                key={i}
                style={{
                    position: 'absolute',
                    top: s.top,
                    ...(s.left  ? { left:  s.left  } : {}),
                    ...(s.right ? { right: s.right } : {}),
                    width: s.size, height: s.size,
                    color: TEAL,
                    opacity: s.opacity,
                    transform: `rotate(${s.rotate}deg)`,
                    pointerEvents: 'none',
                }}
            />
        ))}
    </>
);

export const AboutSection = () => (
    <section id="about" className="py-24 px-4 relative">

        {/* Color spill orbs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <div style={{ position:'absolute', top:'5%', right:'8%', width:'460px', height:'320px', borderRadius:'50%', filter:'blur(85px)', background:'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'5%', left:'3%', width:'400px', height:'300px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.16) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-5xl" style={{ position:'relative', zIndex:1 }}>

            {/* Heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
                About <span className="text-primary"> Me </span>
            </h2>

            {/* ── Glassified portrait ── */}
            {/* <div style={{ display:'flex', justifyContent:'center', marginBottom: 24 }}>
                <div style={{
                    position: 'relative',
                    width: 200, height: 200,
                    borderRadius: '22px',
                    overflow: 'hidden',
                    border: `2px solid ${TEAL}77`,
                    boxShadow: `0 0 36px 10px ${TEAL}2a, 0 0 80px 20px ${TEAL}12, inset 0 1px 0 rgba(255,255,255,0.45), inset 0 -1px 0 ${TEAL}33`,
                    backdropFilter: 'blur(4px)',
                    WebkitBackdropFilter: 'blur(4px)',
                }}>
                    <img
                        src={portrait}
                        alt="Evan Li"
                        style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center top', display:'block' }}
                    />
                    <div style={{
                        position:'absolute', inset:0, pointerEvents:'none',
                        background:'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 55%, rgba(45,212,191,0.06) 100%)',
                    }}/>
                </div>
            </div> */}

            {/* ── Sleek glass callout boxes ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap: 28, marginBottom: 24 }}>

                {/* Box 1 — Research */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '48px 24px 36px',
                    borderRadius: '18px',
                    background: `linear-gradient(160deg, ${TEAL}0c 0%, ${TEAL}06 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${TEAL}55`,
                    borderBottom: `2px solid ${TEAL}`,
                    boxShadow: `0 0 44px 10px ${TEAL}30, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
                    display:'flex', flexDirection:'column', gap: 14,
                }}>
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'220px', height:'180px', borderRadius:'50%', filter:'blur(50px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.20) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:'200px', height:'160px', borderRadius:'50%', filter:'blur(45px)', background:'radial-gradient(ellipse, rgba(20,185,165,0.16) 0%, transparent 70%)' }}/>
                    </div>
                    <Star style={{ position:'absolute', top:16, left:18, width:20, height:20, color:TEAL, fill:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}bb)`, pointerEvents:'none' }}/>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative', zIndex:1, textAlign:'center' }}>
                        <Microscope size={56} style={{ color:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}99) drop-shadow(0 0 28px ${TEAL}44)` }}/>
                        <p style={{ fontSize:'14px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:`${TEAL}ee` }}>Research</p>
                    </div>
                    {([
                        <><strong style={{ color: TEAL }}>First Authored</strong> · Distributed LLM Security</>,
                        <>Accepted to <strong style={{ color: TEAL }}>NDSS 2026</strong> — Top 4 Security Venue</>,
                        <><strong style={{ color: TEAL }}>31 Citations</strong> to date</>,
                    ] as React.ReactNode[]).map((content, i) => (
                        <div key={i} style={{ position:'relative', zIndex:1, padding:'12px 14px', borderRadius:'12px', background:`${TEAL}08`, border:`1px solid ${TEAL}2a` }}>
                            <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.06em', color:`${TEAL}bb` }}>{content}</p>
                        </div>
                    ))}
                </div>

                {/* Box 2 — Engineering */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '48px 24px 36px',
                    borderRadius: '18px',
                    background: `linear-gradient(160deg, ${TEAL}0c 0%, ${TEAL}06 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${TEAL}55`,
                    borderBottom: `2px solid ${TEAL}`,
                    boxShadow: `0 0 44px 10px ${TEAL}30, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
                    display:'flex', flexDirection:'column', gap: 14,
                }}>
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'220px', height:'180px', borderRadius:'50%', filter:'blur(50px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.20) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:'200px', height:'160px', borderRadius:'50%', filter:'blur(45px)', background:'radial-gradient(ellipse, rgba(20,185,165,0.16) 0%, transparent 70%)' }}/>
                    </div>
                    <Star style={{ position:'absolute', top:16, left:18, width:20, height:20, color:TEAL, fill:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}bb)`, pointerEvents:'none' }}/>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative', zIndex:1, textAlign:'center' }}>
                        <Cpu size={56} style={{ color:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}99) drop-shadow(0 0 28px ${TEAL}44)` }}/>
                        <p style={{ fontSize:'14px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:`${TEAL}ee` }}>Engineering</p>
                    </div>
                    {([
                        <>Agentic AI Engineer at <strong style={{ color: TEAL }}>Vestmark</strong> — full-stack LLM pipelines</>,
                        <>R&amp;D Test Engineer at <strong style={{ color: TEAL }}>Keysight</strong> — AI diagnostics &amp; hardware</>,
                        <><strong style={{ color: TEAL }}>3× latency wins</strong>, observability, proactive agents</>,
                    ] as React.ReactNode[]).map((content, i) => (
                        <div key={i} style={{ position:'relative', zIndex:1, padding:'12px 14px', borderRadius:'12px', background:`${TEAL}08`, border:`1px solid ${TEAL}2a` }}>
                            <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.06em', color:`${TEAL}bb` }}>{content}</p>
                        </div>
                    ))}
                </div>

                {/* Box 3 — Creative Writing */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '48px 24px 36px',
                    borderRadius: '18px',
                    background: `linear-gradient(160deg, ${TEAL}0c 0%, ${TEAL}06 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${TEAL}55`,
                    borderBottom: `2px solid ${TEAL}`,
                    boxShadow: `0 0 44px 10px ${TEAL}30, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
                    display:'flex', flexDirection:'column', gap: 14,
                }}>
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'220px', height:'180px', borderRadius:'50%', filter:'blur(50px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.20) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:'200px', height:'160px', borderRadius:'50%', filter:'blur(45px)', background:'radial-gradient(ellipse, rgba(20,185,165,0.16) 0%, transparent 70%)' }}/>
                    </div>
                    <Star style={{ position:'absolute', top:16, left:18, width:20, height:20, color:TEAL, fill:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}bb)`, pointerEvents:'none' }}/>
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative', zIndex:1, textAlign:'center' }}>
                        <Feather size={56} style={{ color:TEAL, filter:`drop-shadow(0 0 6px ${TEAL}) drop-shadow(0 0 14px ${TEAL}99) drop-shadow(0 0 28px ${TEAL}44)` }}/>
                        <p style={{ fontSize:'14px', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', color:`${TEAL}ee` }}>Creative Writing</p>
                    </div>
                    {([
                        <><strong style={{ color: TEAL }}>Blades in Blue</strong> — a fantasy sci-fi hybrid about war, technology, and the cost of progress</>,
                        <>Six POVs across enemy lines — grounded combat, political scheming, and what heroism actually costs</>,
                        <>Bernard Cornwell meets high fantasy · Full excerpt <strong style={{ color: TEAL }}>below</strong></>,
                    ] as React.ReactNode[]).map((content, i) => (
                        <div key={i} style={{ position:'relative', zIndex:1, padding:'12px 14px', borderRadius:'12px', background:`${TEAL}08`, border:`1px solid ${TEAL}2a` }}>
                            <p style={{ fontSize:'12px', fontWeight:600, letterSpacing:'0.06em', color:`${TEAL}bb` }}>{content}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* ── Merged bottom box ── */}
            <div style={{
                position:'relative',
                padding: '36px 36px',
                borderRadius: '20px',
                background: `linear-gradient(160deg, ${TEAL}18 0%, ${TEAL}0a 100%)`,
                backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)',
                border: `1px solid ${TEAL}88`,
                borderBottom: `2px solid ${TEAL}`,
                boxShadow: `0 0 40px 8px ${TEAL}38, inset 0 1px 0 ${TEAL}55, inset 0 -1px 0 ${TEAL}22`,
            }}>
                <StarDeco stars={STARS_BOTTOM} />

                <div style={{ display:'flex', flexDirection:'column', gap: 24, position:'relative', zIndex:1 }}>

                    {/* Bio blurb */}
                    <div style={{ display:'flex', flexDirection:'column', gap: 10 }}>
                        <h3 style={{ fontSize:'17px', fontWeight:700, color:'rgba(255,255,255,0.92)', lineHeight:1.4 }}>
                            Third-year <span style={{ color: TEAL }}>CS</span> undergrad at Northeastern University,
                            concentration in <span style={{ color: TEAL }}>Systems Engineering</span>
                        </h3>

                        <p style={{ fontSize:'14px', color:'rgba(200,220,240,0.80)', lineHeight:1.7 }}>
                            Armed with a strong technical foundation and a passion for research and engineering,
                            I aim to explore the limits of AI and distributed systems and how they can be used to solve real problems.
                        </p>

                        <div style={{ display:'flex', flexDirection:'column', gap:8, fontSize:'14px', color:'rgba(190,215,235,0.75)', lineHeight:1.7 }}>
                            <p>Current R&amp;D Test Systems Engineer at <span style={{ color: TEAL, fontWeight:600 }}>Keysight Technologies</span>, building AI-powered diagnostics tooling for hardware test and measurement systems.</p>
                            <p>Former Agentic Software Engineer at <span style={{ color: TEAL, fontWeight:600 }}>Vestmark</span>, shipping full-stack LLM pipelines for an AI-powered Investment Advisor Agent.</p>
                            <p>Former researcher at Northeastern's Privacy &amp; Security Lab — first-authored a paper on multi-agent LLM security accepted to <span style={{ color: TEAL, fontWeight:600 }}>NDSS 2026</span> with 31 citations.</p>
                        </div>

                        <p style={{ fontSize:'13px', color:`${TEAL}bb`, lineHeight:1.6 }}>
                            Looking for roles in research, development, or engineering — especially LLMs or distributed systems.
                        </p>
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${TEAL}44, transparent)` }}/>

                    {/* Contact info */}
                    <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
                        {/* Row 1: 3 items */}
                        <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap: 12 }}>
                            {[
                                { Icon: Mail,   label: 'Email',    value: 'evanlie.737@gmail.com', href: 'mailto:evanlie.737@gmail.com' },
                                { Icon: Phone,  label: 'Mobile',   value: '+1 (914) 486-8529',     href: 'tel:+19144868529' },
                                { Icon: MapPin, label: 'Location', value: 'Boston, MA',             href: null },
                            ].map(({ Icon, label, value, href }) => (
                                <div key={label} style={{
                                    display:'flex', alignItems:'center', gap: 10,
                                    padding: '10px 16px', borderRadius: '12px',
                                    background: `${TEAL}08`, border: `1px solid ${TEAL}2a`,
                                }}>
                                    <Icon size={18} style={{ color: TEAL, flexShrink:0, filter:`drop-shadow(0 0 5px ${TEAL}99)` }}/>
                                    <div>
                                        <p style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase', color:`${TEAL}88`, marginBottom:1 }}>{label}</p>
                                        {href
                                            ? <a href={href} style={{ fontSize:'13px', color:'rgba(200,225,245,0.85)', fontWeight:500, textDecoration:'none' }}
                                                onMouseOver={e => (e.currentTarget.style.color = TEAL)}
                                                onMouseOut={e  => (e.currentTarget.style.color = 'rgba(200,225,245,0.85)')}>{value}</a>
                                            : <p style={{ fontSize:'13px', color:'rgba(200,225,245,0.85)', fontWeight:500 }}>{value}</p>
                                        }
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* Row 2: GitHub + LinkedIn centered */}
                        <div style={{ display:'flex', gap: 12, justifyContent:'center' }}>
                            {[
                                { Icon: Github,   label: 'GitHub',   value: 'evanli135',   href: 'https://github.com/evanli135' },
                                { Icon: Linkedin, label: 'LinkedIn', value: 'evan-li-ff',  href: 'https://www.linkedin.com/in/evan-li-ff/' },
                            ].map(({ Icon, label, value, href }) => (
                                <div key={label} style={{
                                    display:'flex', alignItems:'center', gap: 10,
                                    padding: '10px 16px', borderRadius: '12px',
                                    background: `${TEAL}08`, border: `1px solid ${TEAL}2a`,
                                    width: 'calc(33.33% - 8px)',
                                }}>
                                    <Icon size={18} style={{ color: TEAL, flexShrink:0, filter:`drop-shadow(0 0 5px ${TEAL}99)` }}/>
                                    <div>
                                        <p style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.10em', textTransform:'uppercase', color:`${TEAL}88`, marginBottom:1 }}>{label}</p>
                                        <a href={href} style={{ fontSize:'13px', color:'rgba(200,225,245,0.85)', fontWeight:500, textDecoration:'none' }}
                                            onMouseOver={e => (e.currentTarget.style.color = TEAL)}
                                            onMouseOut={e  => (e.currentTarget.style.color = 'rgba(200,225,245,0.85)')}>{value}</a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height:1, background:`linear-gradient(90deg, transparent, ${TEAL}44, transparent)` }}/>

                    {/* CTA buttons */}
                    <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
                        <a className="cosmic-button" href="#contact" style={{ fontSize:'14px' }}>Contact Me</a>
                        <a href="#resume" className={cn("px-6 py-2 rounded-full border border-primary",
                            "text-primary hover:bg-primary/10 transition-colors duration-300")}
                            style={{ fontSize:'14px' }}>
                            See my Resume
                        </a>
                    </div>

                </div>
            </div>

        </div>
    </section>
);
