import { Terminal, Cloud, DatabaseZap, Bot, Cpu, Layers, HardDrive, Share2, Server, Network, Plug, Database, Monitor, GitBranch, MessageSquare, ShieldAlert, BookOpen } from 'lucide-react';
import { TbTopologyComplex } from 'react-icons/tb';
import {
    SiPython, SiTypescript, SiJavascript, SiRust, SiRuby, SiC, SiCplusplus, SiElixir,
    SiDocker, SiKubernetes, SiPostgresql, SiLinux, SiAmazonwebservices,
    SiReact, SiNodedotjs, SiTailwindcss, SiExpress, SiDjango, SiFastapi, SiRubyonrails,
    SiGit, SiPostman, SiFigma, SiRailway, SiDynatrace, SiWireshark, SiCircleci,
    SiMongodb, SiRedis,
    SiPhoenixframework, SiSpring,
    SiPytorch, SiPandas, SiNumpy, SiScikitlearn, SiLangchain, SiWebflow
} from 'react-icons/si';
import { FaJava, FaCodeCompare } from 'react-icons/fa6';
import { LiaLaptopCodeSolid } from 'react-icons/lia';
import { GiRailRoad } from 'react-icons/gi';
import { BiLogoVisualStudio } from 'react-icons/bi';
import type { IconType } from 'react-icons';
import type { LucideIcon } from 'lucide-react';

type AnyIcon = IconType | LucideIcon;

interface Skill        { name: string; Icon: AnyIcon }
interface Competency   { name: string; Icon: LucideIcon }
interface Lane         { label: string; color: string; Icon: AnyIcon; skills: Skill[]; competencies: Competency[]; reverse?: boolean }

const LANES: Lane[] = [
    {
        label: 'Programming', color: '#F97316', Icon: Terminal,
        skills: [
            { name: 'Python',     Icon: SiPython     },
            { name: 'TypeScript', Icon: SiTypescript },
            { name: 'JavaScript', Icon: SiJavascript },
            { name: 'Ruby',       Icon: SiRuby       },
            { name: 'Java',       Icon: FaJava       },
            { name: 'C',          Icon: SiC          },
            { name: 'C++',        Icon: SiCplusplus  },
            { name: 'Rust',       Icon: SiRust       },
            { name: 'Elixir',     Icon: SiElixir     },
        ],
        competencies: [
            { name: 'Parallel Programming',    Icon: Cpu      },
            { name: 'Object Oriented Design',  Icon: Layers   },
            { name: 'Memory Management',       Icon: HardDrive },
        ],
    },
    {
        label: 'Infrastructure', color: '#D946EF', Icon: GiRailRoad, reverse: true,
        skills: [
            { name: 'Docker',     Icon: SiDocker            },
            { name: 'Kubernetes', Icon: SiKubernetes        },
            { name: 'AWS',        Icon: SiAmazonwebservices },
            { name: 'PostgreSQL', Icon: SiPostgresql        },
            { name: 'Linux',      Icon: SiLinux             },
            { name: 'MongoDB',    Icon: SiMongodb           },
            { name: 'Redis',      Icon: SiRedis             },
        ],
        competencies: [
            { name: 'Distributed Systems', Icon: Share2  },
            { name: 'Operating Systems',   Icon: Server  },
            { name: 'Computer Networks',   Icon: Network },
        ],
    },
    {
        label: 'Full Stack', color: '#60A5FA', Icon: LiaLaptopCodeSolid,
        skills: [
            { name: 'React',         Icon: SiReact           },
            { name: 'Node.js',       Icon: SiNodedotjs       },
            { name: 'Tailwind',      Icon: SiTailwindcss     },
            { name: 'Express',       Icon: SiExpress         },
            { name: 'Django',        Icon: SiDjango          },
            { name: 'FastAPI',       Icon: SiFastapi         },
            { name: 'Phoenix',       Icon: SiPhoenixframework },
            { name: 'Spring',        Icon: SiSpring          },
            { name: 'Ruby on Rails', Icon: SiRubyonrails     },
        ],
        competencies: [
            { name: 'REST API Design', Icon: Plug    },
            { name: 'Database Design', Icon: Database },
            { name: 'Web Development', Icon: Monitor  },
        ],
    },
    {
        label: 'Dev Tools', color: '#818CF8', Icon: FaCodeCompare, reverse: true,
        skills: [
            { name: 'Git',       Icon: SiGit              },
            { name: 'VS Code',   Icon: BiLogoVisualStudio },
            { name: 'Postman',   Icon: SiPostman          },
            { name: 'Figma',     Icon: SiFigma            },
            { name: 'Dynatrace', Icon: SiDynatrace        },
            { name: 'Wireshark', Icon: SiWireshark        },
        ],
        competencies: [
            { name: 'CI/CD Pipelines', Icon: GitBranch },
        ],
    },
    {
        label: 'AI / ML', color: '#2DD4BF', Icon: TbTopologyComplex,
        skills: [
            { name: 'PyTorch',      Icon: SiPytorch           },
            { name: 'Pandas',       Icon: SiPandas            },
            { name: 'NumPy',        Icon: SiNumpy             },
            { name: 'Scikit-learn', Icon: SiScikitlearn       },
            { name: 'LangChain',    Icon: SiLangchain         },
            { name: 'JIDO',         Icon: Bot                 },
            { name: 'AWS Bedrock',  Icon: SiAmazonwebservices },
        ],
        competencies: [
            { name: 'Prompt Engineering', Icon: MessageSquare },
            { name: 'Prompt Injection',   Icon: ShieldAlert   },
            { name: 'RAG',                Icon: BookOpen      },
            { name: 'Web Scraping',          Icon: Monitor       },
        ],
    },
];

// Repeat skills enough times so the track always overflows the container for seamless looping.
// Must be an even number so translateX(-50%) lands on an identical frame.
function buildTrack(skills: Skill[]): Skill[] {
    const reps = skills.length <= 4 ? 6 : skills.length <= 6 ? 4 : 2;
    return Array.from({ length: reps }, () => skills).flat();
}

export const SkillsSection = () => (
    <section id="skills" className="py-24 px-6 relative">

        {/* Color spill orbs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <div style={{ position:'absolute', top:'-8%', left:'2%', width:'520px', height:'360px', borderRadius:'50%', filter:'blur(90px)', background:'radial-gradient(ellipse, rgba(96,165,250,0.22) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', top:'15%', right:'-4%', width:'440px', height:'320px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(217,70,239,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'-8%', left:'28%', width:'640px', height:'320px', borderRadius:'50%', filter:'blur(100px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.20) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-7xl" style={{ position:'relative', zIndex:1 }}>

            {/* Glassy text heading */}
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                <span style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c8e8ff 20%, #a0f0e8 40%, #ffffff 55%, #e0c8ff 75%, #ffffff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.25))',
                }} className="text-gradient"> Skills & Compentencies </span>
            </h2>

            <div className="flex flex-col gap-4">
                {LANES.map(({ label, color, Icon, skills, competencies/*, reverse*/ }) => {
                    // const track = buildTrack(skills);   // uncomment to re-enable marquee
                    // const duration = skills.length * 5;
                    return (
                        <div key={label} className="lane-scroll" style={{
                            display: 'flex', alignItems: 'stretch',
                            border: `1px solid ${color}66`,
                            borderLeft: `3px solid ${color}`,
                            background: `linear-gradient(100deg, ${color}06 0%, ${color}03 60%, transparent 100%)`,
                            backdropFilter: 'blur(24px)',
                            WebkitBackdropFilter: 'blur(24px)',
                            borderRadius: '16px',
                            boxShadow: `0 0 28px 6px ${color}20, inset 0 1px 0 ${color}33, inset 0 -1px 0 ${color}18`,
                            overflow: 'hidden',
                        }}>
                            {/* Lane label */}
                            <div style={{
                                width: 175, flexShrink: 0,
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                gap: 10, padding: '24px 20px',
                                borderRight: `1px solid ${color}55`,
                                background: `linear-gradient(180deg, ${color}08 0%, transparent 100%)`,
                            }}>
                                <div style={{
                                    width: 54, height: 54, borderRadius: '13px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    background: `linear-gradient(135deg, ${color}10 0%, ${color}06 100%)`,
                                    border: `1px solid ${color}66`,
                                    boxShadow: `0 0 18px 4px ${color}22, inset 0 1px 0 ${color}44, inset 0 -1px 0 ${color}18`,
                                }}>
                                    <Icon size={26} style={{ color, filter: `drop-shadow(0 0 10px ${color}dd)` } as React.CSSProperties}/>
                                </div>
                                <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', color, textTransform: 'uppercase', textAlign: 'center', filter: `drop-shadow(0 0 6px ${color}88)` }}>
                                    {label}
                                </span>
                            </div>

                            {/* Right column: skill tiles + competencies */}
                            <div style={{ flex: 1, padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'center' }}>

                                {/* Skill tiles */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
                                    {/* <div className="marquee-track" style={{ display:'flex', gap:12, width:'max-content',
                                        animation:`marquee ${duration}s linear infinite`,
                                        animationDirection: reverse ? 'reverse' : 'normal' }}> */}
                                        {skills.map((skill, i) => (
                                            <div key={i} style={{
                                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                                gap: 9,
                                                width: 90, padding: '16px 12px',
                                                borderRadius: '14px',
                                                background: `linear-gradient(160deg, ${color}07 0%, ${color}03 50%, transparent 100%)`,
                                                border: `1px solid ${color}55`,
                                                boxShadow: `0 0 12px 2px ${color}18, inset 0 1px 0 ${color}33, inset 0 -1px 0 ${color}18`,
                                                backdropFilter: 'blur(12px)',
                                                WebkitBackdropFilter: 'blur(12px)',
                                                flexShrink: 0,
                                            }}>
                                                <skill.Icon style={{ width: 26, height: 26, color, opacity: 1, filter: `drop-shadow(0 0 8px ${color}cc)` } as React.CSSProperties}/>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color, whiteSpace: 'nowrap', textAlign: 'center' }}>
                                                    {skill.name}
                                                </span>
                                            </div>
                                        ))}
                                    {/* </div> */}
                                </div>

                                {/* Competencies strip */}
                                <div style={{ borderTop: `1px solid ${color}44`, paddingTop: 12, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
                                    {competencies.map(({ name, Icon: CIcon }) => (
                                        <div key={name} style={{
                                            display: 'flex', alignItems: 'center', gap: 7,
                                            padding: '5px 12px', borderRadius: '20px',
                                            background: `${color}07`,
                                            border: `1px solid ${color}55`,
                                        }}>
                                            <CIcon size={13} style={{ color, flexShrink: 0, filter: `drop-shadow(0 0 4px ${color}88)` }}/>
                                            <span style={{ fontSize: '12px', color, fontWeight: 600, whiteSpace: 'nowrap' }}>{name}</span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    </section>
);
