import { cn } from "../lib/utils";
import { Microscope, Binary, CircuitBoard, Star, Cpu } from "lucide-react";
import portrait from '../assets/portrait.png';
import { GlassText } from "./GlassText";

const TEAL = '#2DD4BF';
const REDORANGE = '#F97316';

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
            <div style={{ display:'flex', justifyContent:'center', marginBottom: 24 }}>
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
                    {/* Glass sheen overlay */}
                    <div style={{
                        position:'absolute', inset:0, pointerEvents:'none',
                        background:'linear-gradient(160deg, rgba(255,255,255,0.08) 0%, transparent 55%, rgba(45,212,191,0.06) 100%)',
                    }}/>
                </div>
            </div>

            {/* ── Sleek glass callout boxes ── */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 100, marginBottom: 24 }}>

                {/* Box 1 — Research */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '56px 28px 40px',
                    borderRadius: '18px',
                    background: `linear-gradient(160deg, ${REDORANGE}18 0%, ${REDORANGE}0a 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${REDORANGE}88`,
                    borderBottom: `2px solid ${REDORANGE}`,
                    boxShadow: `0 0 44px 10px ${REDORANGE}30, inset 0 1px 0 ${REDORANGE}55, inset 0 -1px 0 ${REDORANGE}22`,
                    display:'flex', flexDirection:'column', gap: 16,
                }}>
                    {/* Color splash orbs */}
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'220px', height:'180px', borderRadius:'50%', filter:'blur(50px)', background:'radial-gradient(ellipse, rgba(249,115,22,0.55) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:'200px', height:'160px', borderRadius:'50%', filter:'blur(45px)', background:'radial-gradient(ellipse, rgba(234,88,12,0.45) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', top:'40%', left:'30%', width:'160px', height:'120px', borderRadius:'50%', filter:'blur(55px)', background:'radial-gradient(ellipse, rgba(251,146,60,0.35) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', top:'10%', left:'15%', width:'100px', height:'80px', borderRadius:'50%', filter:'blur(35px)', background:'radial-gradient(ellipse, rgba(255,200,100,0.25) 0%, transparent 70%)' }}/>
                    </div>
                    <Star style={{ position:'absolute', top:16, left:18, width:20, height:20, color:REDORANGE, fill:REDORANGE, filter:`drop-shadow(0 0 6px ${REDORANGE}) drop-shadow(0 0 14px ${REDORANGE}bb)`, pointerEvents:'none' }}/>

                    {/* Icon + header */}
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative', zIndex:1, textAlign:'center' }}>
                        <div style={{ width:68, height:68, borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', background:`${REDORANGE}20`, border:`1px solid ${REDORANGE}55`, boxShadow:`0 0 20px 4px ${REDORANGE}25` }}>
                            <Microscope size={32} style={{ color:REDORANGE, filter:`drop-shadow(0 0 8px ${REDORANGE}cc)` }}/>
                        </div>
                        <p style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:`${REDORANGE}cc` }}>Published Researcher</p>
                        <p style={{ fontSize:'21px', fontWeight:800, letterSpacing:'-0.02em', color:'rgba(255,255,255,0.95)', lineHeight:1.2 }}>First Author · NDSS 2026</p>
                    </div>

                    {/* Three subsections */}
                    {[
                        { label: 'Paper',  text: 'ACE: A Security Architecture for LLM-Integrated App Systems' },
                        { label: 'Venue',  text: 'NDSS 2026 — top-4 security venue, ~15% acceptance rate' },
                        { label: 'Focus',  text: 'Prompt injection, denial-of-service, and secure information flow in multi-agent systems' },
                    ].map(({ label, text }) => (
                        <div key={label} style={{ position:'relative', zIndex:1, padding:'12px 14px', borderRadius:'12px', background:`${REDORANGE}0c`, border:`1px solid ${REDORANGE}33` }}>
                            <p style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:`${REDORANGE}cc`, marginBottom:4 }}>{label}</p>
                            <p style={{ fontSize:'13px', color:'rgba(200,215,235,0.80)', lineHeight:1.55 }}>{text}</p>
                        </div>
                    ))}
                </div>

                {/* Box 2 — Industry */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '56px 28px 40px',
                    borderRadius: '18px',
                    background: `linear-gradient(160deg, ${REDORANGE}18 0%, ${REDORANGE}0a 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${REDORANGE}88`,
                    borderBottom: `2px solid ${REDORANGE}`,
                    boxShadow: `0 0 44px 10px ${REDORANGE}30, inset 0 1px 0 ${REDORANGE}55, inset 0 -1px 0 ${REDORANGE}22`,
                    display:'flex', flexDirection:'column', gap: 16,
                }}>
                    {/* Color splash orbs */}
                    <div style={{ position:'absolute', inset:0, pointerEvents:'none', overflow:'hidden' }}>
                        <div style={{ position:'absolute', top:'-20%', right:'-10%', width:'220px', height:'180px', borderRadius:'50%', filter:'blur(50px)', background:'radial-gradient(ellipse, rgba(249,115,22,0.55) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', bottom:'-15%', left:'-5%', width:'200px', height:'160px', borderRadius:'50%', filter:'blur(45px)', background:'radial-gradient(ellipse, rgba(234,88,12,0.45) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', top:'40%', left:'30%', width:'160px', height:'120px', borderRadius:'50%', filter:'blur(55px)', background:'radial-gradient(ellipse, rgba(251,146,60,0.35) 0%, transparent 70%)' }}/>
                        <div style={{ position:'absolute', top:'10%', left:'15%', width:'100px', height:'80px', borderRadius:'50%', filter:'blur(35px)', background:'radial-gradient(ellipse, rgba(255,200,100,0.25) 0%, transparent 70%)' }}/>
                    </div>
                    <Star style={{ position:'absolute', top:16, left:18, width:20, height:20, color:REDORANGE, fill:REDORANGE, filter:`drop-shadow(0 0 6px ${REDORANGE}) drop-shadow(0 0 14px ${REDORANGE}bb)`, pointerEvents:'none' }}/>

                    {/* Icon + header */}
                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:12, position:'relative', zIndex:1, textAlign:'center' }}>
                        <div style={{ width:68, height:68, borderRadius:'16px', display:'flex', alignItems:'center', justifyContent:'center', background:`${REDORANGE}20`, border:`1px solid ${REDORANGE}55`, boxShadow:`0 0 20px 4px ${REDORANGE}25` }}>
                            <Cpu size={32} style={{ color:REDORANGE, filter:`drop-shadow(0 0 8px ${REDORANGE}cc)` }}/>
                        </div>
                        <p style={{ fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:`${REDORANGE}cc` }}>Industry Engineer</p>
                        <p style={{ fontSize:'21px', fontWeight:800, letterSpacing:'-0.02em', color:'rgba(255,255,255,0.95)', lineHeight:1.2 }}>3× Co-op Engineer</p>
                    </div>

                    {/* Three subsections */}
                    {[
                        { label: 'Current',   text: 'Vestmark — AI-powered financial advisor agent (fintech)' },
                        { label: 'Previous',  text: 'MatrixOrigin (NLP/SQL platform) · NEU Privacy & Security Lab (LLM security research)' },
                        { label: 'Upcoming',  text: 'Keysight Technologies — R&D instrumentation and anomaly detection' },
                    ].map(({ label, text }) => (
                        <div key={label} style={{ position:'relative', zIndex:1, padding:'12px 14px', borderRadius:'12px', background:`${REDORANGE}0c`, border:`1px solid ${REDORANGE}33` }}>
                            <p style={{ fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:`${REDORANGE}cc`, marginBottom:4 }}>{label}</p>
                            <p style={{ fontSize:'13px', color:'rgba(200,215,235,0.80)', lineHeight:1.55 }}>{text}</p>
                        </div>
                    ))}
                </div>

            </div>

            {/* ── Merged bottom box ── */}
            <div style={{
                position:'relative', overflow:'hidden',
                padding: '36px 36px',
                borderRadius: '20px',
                background: `linear-gradient(145deg, ${TEAL}14 0%, ${TEAL}08 60%, transparent 100%)`,
                backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${TEAL}55`,
                borderBottom: `2px solid ${TEAL}`,
                boxShadow: `0 0 44px 10px ${TEAL}1a, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
            }}>
                <StarDeco stars={STARS_BOTTOM} />

                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 40, position:'relative', zIndex:1 }}>

                    {/* Left column: bio */}
                    <div style={{ display:'flex', flexDirection:'column', gap: 14 }}>
                        <h3 style={{ fontSize:'17px', fontWeight:700, color:'rgba(255,255,255,0.92)', lineHeight:1.4 }}>
                            Third-year <span style={{ color: TEAL }}>CS</span> undergrad at Northeastern University,
                            concentration in <span style={{ color: TEAL }}>Systems Engineering</span>
                        </h3>

                        <p style={{ fontSize:'14px', color:'rgba(200,220,240,0.80)', lineHeight:1.7 }}>
                            Armed with a strong technical foundation and a passion for research and engineering,
                            I aim to explore the limits of AI and distributed systems and how they can be used to solve real problems.
                        </p>

                        <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:'14px', color:'rgba(190,215,235,0.75)', lineHeight:1.7 }}>
                            <p>Current software engineer at <span style={{ color: TEAL, fontWeight:600 }}>Vestmark</span>, working on the financial advisor agent.</p>
                            <p>Former researcher at Northeastern's Privacy & Security Lab, first-authored a paper on multi-agent LLM security at <span style={{ color: TEAL, fontWeight:600 }}>NDSS</span>.</p>
                            <p>Former NLP engineer at <span style={{ color: TEAL, fontWeight:600 }}>MatrixOrigin</span>, building a natural language to SQL platform.</p>
                        </div>

                        <p style={{ fontSize:'13px', color:`${TEAL}bb`, lineHeight:1.6 }}>
                            Looking for roles in research, development, or engineering — especially LLMs or distributed systems.
                        </p>

                        <div style={{ display:'flex', gap:12, flexWrap:'wrap', paddingTop:4 }}>
                            <a className="cosmic-button" href="#contact" style={{ fontSize:'14px' }}>Contact Me</a>
                            <a href="#resume" className={cn("px-6 py-2 rounded-full border border-primary",
                                "text-primary hover:bg-primary/10 transition-colors duration-300")}
                                style={{ fontSize:'14px' }}>
                                See my Resume
                            </a>
                        </div>
                    </div>

                    {/* Right column: what I work on */}
                    <div style={{ display:'flex', flexDirection:'column', gap: 18 }}>
                        <div>
                            <GlassText style={{ fontSize: '1.05rem' }}>What I work on</GlassText>
                        </div>

                        {[
                            { Icon: Binary,       title: 'Programming', text: 'Python, TypeScript, Java, C, C++, Rust, Elixir — with deep experience in data structures, algorithms, OOP, and parallel programming.' },
                            { Icon: Microscope,   title: 'Research',    text: 'First-authored ACE, accepted to NDSS 2026. Research focuses on prompt injection, DoS, and secure information flow in multi-agent systems.' },
                            { Icon: CircuitBoard, title: 'Systems',     text: 'Distributed systems, OS internals, network communication, and systems security — consensus protocols, memory management, threat modeling.' },
                        ].map(({ Icon, title, text }) => (
                            <div key={title} style={{
                                display:'flex', alignItems:'flex-start', gap: 14,
                                padding: '14px 16px',
                                borderRadius: '14px',
                                background: `rgba(45,212,191,0.06)`,
                                border: `1px solid ${TEAL}33`,
                            }}>
                                <div style={{
                                    width: 36, height: 36, flexShrink: 0, borderRadius: '10px',
                                    display:'flex', alignItems:'center', justifyContent:'center',
                                    background: `${TEAL}18`, border: `1px solid ${TEAL}44`,
                                }}>
                                    <Icon size={17} style={{ color: TEAL, filter:`drop-shadow(0 0 5px ${TEAL}aa)` }}/>
                                </div>
                                <div>
                                    <h4 style={{ fontSize:'15px', fontWeight:700, color:'rgba(255,255,255,0.92)', marginBottom:4 }}>{title}</h4>
                                    <p style={{ fontSize:'13px', color:'rgba(190,215,235,0.76)', lineHeight:1.65 }}>{text}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </div>

        </div>
    </section>
);
