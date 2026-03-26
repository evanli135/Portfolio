import {cn} from "../lib/utils";
import { Code, Microscope, Binary, CircuitBoard } from "lucide-react";
import { FaUser } from "react-icons/fa";
import portrait from '../assets/portrait.png'
import { GlassText } from "./GlassText";


export const AboutSection = () => {
    return <section id="about" className="py-24 px-4 relative">
        {" "}

        {/* Color spill orbs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <div style={{ position:'absolute', top:'5%', right:'8%', width:'460px', height:'320px', borderRadius:'50%', filter:'blur(85px)', background:'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'5%', left:'3%', width:'400px', height:'300px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.16) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-5xl" style={{ position:'relative', zIndex:1 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                About <span className="text-primary"> Me </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                    <div className="my-4">
                        <img src={portrait} className="py-7 rounded-2xl"/>
                    </div>


                    <h3 className="text-lg font-medium">
    Third-year <b>CS</b> undergrad at Northeastern University, concentration in <b>Systems Engineering</b>
</h3>

<p className="text-muted-foreground mt-4">
    Armed with a strong technical foundation and a passion for research and engineering,
    I aim to explore the limits of AI and distributed systems and how they can be used to solve real problems.
</p>

<div className="text-muted-foreground mt-4 space-y-2">
    <p>
        Current software engineer at Vestmark, a fintech firm, where I work on the financial advisor agent —
        patching and adding features to guarantee efficiency, security, and a clean user experience.
    </p>
    <p>
        Former distributed systems security researcher at Northeastern, where I first-authored a paper
        on the security of multi-agent LLM systems at NDSS — a top-4 security venue with a ~15% acceptance rate.
    </p>
    <p>
        Former NLP engineer at MatrixOrigin, an AI startup, where I worked on a natural language to SQL platform.
    </p>
</div>

<p className="text-muted-foreground mt-4">
    Looking for work in research, development, or engineering — especially roles involving LLMs or distributed systems.
    Feel free to reach out if you want to connect or have any opportunities!
</p>



                    <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center">
                        <a className="cosmic-button" href="#contact">
                            {" "}
                            Contact Me
                        </a>

                        <a href="#resume" className={cn("px-6 py-2 rounded-full border border-primary",
                        "text-primary hover:bg-primary/10 transition-colors duration-300")}>
                            {" "}
                            See my Resume
                        </a>
                    </div>
                </div>

                {/* FOUR ICONS */}
                <div className="grid grid-cols-1 gap-6">
                    <div className="text-center mb-2">
                        <GlassText style={{ fontSize: '1.05rem' }}>What I work on</GlassText>
                    </div>
                    
                    <div className="card-hover" style={{ padding:'24px', borderRadius:'14px', background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(45,212,191,0.04) 100%)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.10)', boxShadow:'0 0 28px rgba(45,212,191,0.07), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Binary className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="text-left">
                                <h4 className="text-semibold text-lg"> Programming </h4>
                                <p className="text-muted-foreground">
                                    Extremely well 
                                    versed in core programming fundamentals, 
                                    including using complex data structures, 
                                    algorithms, object oriented programming, 
                                    parallel programming. Proffecient in a variety of high and low level languages, including Python, C++, Java, JavaScript/TypeScript, C and Rust.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover" style={{ padding:'24px', borderRadius:'14px', background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(45,212,191,0.04) 100%)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.10)', boxShadow:'0 0 28px rgba(45,212,191,0.07), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <Microscope className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="text-left">
                                <h4 className="text-semibold text-lg"> Research </h4>
                                <p className="text-muted-foreground">


                                    Former full-time researcher at Northeastern University's Privacy and Security Lab, where I studied
                                    the security of LLM systems. First Author of an LLM security paper submitted to NDSS titled
                                    <i> ACE: A Security Architecture for LLM-Integrated App Systems </i>.
                                    Previously worked on a project for AI startup <i> MatrixOrigin </i> on creating a text to SQL LLM platform.
                                    Currently working on a paper that exposes vulnerabilities in existing agentic systems.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="card-hover" style={{ padding:'24px', borderRadius:'14px', background:'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(45,212,191,0.04) 100%)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', border:'1px solid rgba(255,255,255,0.10)', boxShadow:'0 0 28px rgba(45,212,191,0.07), inset 0 1px 0 rgba(255,255,255,0.12)' }}>
                        <div className="flex items-start gap-4">
                            <div className="p-3 rounded-full bg-primary/10">
                                <CircuitBoard className="h-6 w-6 text-primary"/>
                            </div>
                            <div className="text-left">
                                    <h4 className="text-semibold text-lg"> Systems </h4>
                                                <p className="text-muted-foreground">
                                        Well versed in how software runs at the hardware level, including memory management, 
                                        process scheduling, and kernel interfaces. Experienced in distributed systems design, 
                                        spanning consensus protocols, fault tolerance, and network communication. Familiar with 
                                        systems security, including vulnerability research, secure architecture design, and 
                                        multi-agent threat modeling.
                                    </p>
                            </div>
                        </div>
                    </div>                    
                </div>
            </div>
        </div>
    </section>
}