import { cn } from "../lib/utils";
import { Microscope, Binary, CircuitBoard, Star } from "lucide-react";
import portrait from '../assets/portrait.png';
import { GlassText } from "./GlassText";

const TEAL = '#2DD4BF';

// Scattered star configs for each box
const STARS_LEFT: { top: string; left?: string; right?: string; size: number; opacity: number; rotate: number }[] = [
    { top: '6%',  left:  '4%',  size: 18, opacity: 0.22, rotate: 15  },
    { top: '12%', right: '6%',  size: 11, opacity: 0.15, rotate: 40  },
    { top: '52%', left:  '2%',  size: 14, opacity: 0.18, rotate: 0   },
    { top: '78%', right: '5%',  size: 10, opacity: 0.13, rotate: 25  },
    { top: '88%', left:  '8%',  size: 8,  opacity: 0.16, rotate: 60  },
    { top: '35%', right: '3%',  size: 20, opacity: 0.10, rotate: 5   },
];
const STARS_RIGHT: typeof STARS_LEFT = [
    { top: '5%',  right: '4%',  size: 18, opacity: 0.22, rotate: 20  },
    { top: '18%', left:  '5%',  size: 12, opacity: 0.16, rotate: 45  },
    { top: '48%', right: '3%',  size: 16, opacity: 0.14, rotate: 10  },
    { top: '72%', left:  '3%',  size: 9,  opacity: 0.18, rotate: 35  },
    { top: '85%', right: '7%',  size: 11, opacity: 0.13, rotate: 55  },
    { top: '30%', left:  '2%',  size: 22, opacity: 0.09, rotate: 0   },
];

const StarDeco = ({ stars }: { stars: typeof STARS_LEFT }) => (
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
                    flexShrink: 0,
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

            {/* Glassified portrait */}
            <div style={{ display:'flex', justifyContent:'center', marginBottom: 40 }}>
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

            {/* Two large turquoise boxes */}
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap: 24, alignItems:'stretch' }}
                 className="grid-cols-1 md:grid-cols-2">

                {/* Box 1: Bio */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '36px 30px',
                    borderRadius: '20px',
                    background: `linear-gradient(145deg, ${TEAL}14 0%, ${TEAL}08 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${TEAL}55`,
                    borderBottom: `2px solid ${TEAL}`,
                    boxShadow: `0 0 44px 10px ${TEAL}1a, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
                    display:'flex', flexDirection:'column', gap: 16,
                }}>
                    <StarDeco stars={STARS_LEFT} />

                    <h3 style={{ fontSize:'17px', fontWeight:700, color:'rgba(255,255,255,0.92)', lineHeight:1.4, position:'relative', zIndex:1 }}>
                        Third-year <span style={{ color: TEAL }}>CS</span> undergrad at Northeastern University,
                        concentration in <span style={{ color: TEAL }}>Systems Engineering</span>
                    </h3>

                    <p style={{ fontSize:'14px', color:'rgba(200,220,240,0.80)', lineHeight:1.7, position:'relative', zIndex:1 }}>
                        Armed with a strong technical foundation and a passion for research and engineering,
                        I aim to explore the limits of AI and distributed systems and how they can be used to solve real problems.
                    </p>

                    <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:'14px', color:'rgba(190,215,235,0.75)', lineHeight:1.7, position:'relative', zIndex:1 }}>
                        <p>
                            Current software engineer at <span style={{ color: TEAL, fontWeight:600 }}>Vestmark</span>, a fintech firm,
                            working on the financial advisor agent — patching and extending capabilities for efficiency, security, and UX.
                        </p>
                        <p>
                            Former distributed systems security researcher at Northeastern, first-authoring a paper on
                            multi-agent LLM security at <span style={{ color: TEAL, fontWeight:600 }}>NDSS</span> (~15% acceptance rate).
                        </p>
                        <p>
                            Former NLP engineer at <span style={{ color: TEAL, fontWeight:600 }}>MatrixOrigin</span>, working on a natural language to SQL platform.
                        </p>
                    </div>

                    <p style={{ fontSize:'13px', color:`${TEAL}bb`, lineHeight:1.6, position:'relative', zIndex:1 }}>
                        Looking for work in research, development, or engineering — especially roles involving LLMs or distributed systems.
                    </p>

                    <div style={{ display:'flex', gap:12, flexWrap:'wrap', paddingTop:8, position:'relative', zIndex:1 }}>
                        <a className="cosmic-button" href="#contact" style={{ fontSize:'14px' }}>Contact Me</a>
                        <a href="#resume" className={cn("px-6 py-2 rounded-full border border-primary",
                            "text-primary hover:bg-primary/10 transition-colors duration-300")}
                            style={{ fontSize:'14px' }}>
                            See my Resume
                        </a>
                    </div>
                </div>

                {/* Box 2: What I work on */}
                <div style={{
                    position:'relative', overflow:'hidden',
                    padding: '36px 30px',
                    borderRadius: '20px',
                    background: `linear-gradient(145deg, ${TEAL}14 0%, ${TEAL}08 60%, transparent 100%)`,
                    backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
                    border: `1px solid ${TEAL}55`,
                    borderBottom: `2px solid ${TEAL}`,
                    boxShadow: `0 0 44px 10px ${TEAL}1a, inset 0 1px 0 ${TEAL}44, inset 0 -1px 0 ${TEAL}22`,
                    display:'flex', flexDirection:'column', gap: 20,
                }}>
                    <StarDeco stars={STARS_RIGHT} />

                    <div style={{ position:'relative', zIndex:1 }}>
                        <GlassText style={{ fontSize: '1.05rem' }}>What I work on</GlassText>
                    </div>

                    {/* Topic cards */}
                    {[
                        { Icon: Binary,       title: 'Programming', text: 'Proficient across high and low-level languages — Python, TypeScript, Java, C, C++, Rust, Elixir — with deep experience in data structures, algorithms, OOP, and parallel programming.' },
                        { Icon: Microscope,   title: 'Research',    text: 'First-authored ACE, an LLM security architecture accepted to NDSS 2026. Studies focus on prompt injection, denial-of-service, and secure information flow in multi-agent systems.' },
                        { Icon: CircuitBoard, title: 'Systems',     text: 'Experienced in distributed systems, OS internals, network communication, and systems security — spanning consensus protocols, memory management, and multi-agent threat modeling.' },
                    ].map(({ Icon, title, text }) => (
                        <div key={title} style={{
                            display:'flex', alignItems:'flex-start', gap: 14,
                            padding: '16px 18px',
                            borderRadius: '14px',
                            background: `rgba(45,212,191,0.06)`,
                            border: `1px solid ${TEAL}33`,
                            position:'relative', zIndex:1,
                        }}>
                            <div style={{
                                width: 38, height: 38, flexShrink: 0, borderRadius: '10px',
                                display:'flex', alignItems:'center', justifyContent:'center',
                                background: `${TEAL}18`, border: `1px solid ${TEAL}44`,
                            }}>
                                <Icon size={18} style={{ color: TEAL, filter:`drop-shadow(0 0 5px ${TEAL}aa)` }}/>
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
    </section>
);
