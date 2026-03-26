import { Microscope, PencilRuler } from "lucide-react";
import marioCity from '../assets/mariocity.mov'
import portfolioPic from "../assets/portfolioscr.png"

type Work = "Project" | "Research" | "Club";

interface project {
    id: number,
    premise: string,
    title: string,
    description: string,
    display: any,
    tags: string[],
    techs: string[],
    demoUrl: string,
    date: string,
    type: Work,
}

const projects: project[] = [
    {
        id: 1,
        premise: "LLM Security Paper (First Author)",
        title: "ACE: A Security Architecture for LLM-Integrated App Systems",
        description: "ACE, or Abstract Concrete Executer, is an expiermental LLM security framework that uses secure information flow and static analysis\
        to safeguard sytems of LLM applications from indirect prompt injections or denial of service attacks. \n Accepted into the Network and Disributed Security Symposium 2026. ",
        display: <embed src="https://arxiv.org/pdf/2504.20984" 
                type="application/pdf" 
                width="100%" 
                height="700px" />,
        tags: ["Research", "Security", "Artificial Intelligence", "Collabrative"],
        techs: ["Python", "Langchain", "Linux", "Conda"],
        demoUrl: "https://arxiv.org/abs/2504.20984",
        date: "Jan 2025 - June 2025",
        type: "Research"
    },
    {
        id: 2,
        premise: "Agentic Text Editor",
        title: "LoreBoard",
        description: "An LLM powered creative writing app- uses AI to track attributes of characters such as physical features, speaking patterns, and interactions with other characters.",
        display: "To be implemented :(",
        tags: ["Software Engineering", "Artificial Intelligence", "Collobrative"],
        techs: ["Python", "Langchain", "React.js", "TypeScript", "Django"],
        demoUrl: "#",
        date: "April 2025 - Presnt",
        type: "Project"
    },
    {
        id: 3,
        premise: "Sustainability Exhibit",
        title: "Mario City",
        description: "A childhood sustainability game that utilizes 3D-printed electronics, arduino, and an HTML Webpage",
        display: <video src={marioCity} controls/>,
        tags: ["Hardware", "Systems", "Collab"],
        techs: ["C++", "Arduino", "JavaScript", "HTML/CSS"],
        demoUrl: "https://github.com/evanli135/Mario-City",
        date: "March 2024 - May 2024",
        type: "Project"
    },
    {
        id: 4,
        premise: "Portfolio",
        title: "Evan Li's Developer Portfolio",
        description: "The portfolio your on right now!",
        display: <img src={portfolioPic}/>,
        tags: ["Webdev", "Frontend"],
        techs: ["HTML/CSS", "TypeScript", "React.js", "TailwindCSS", "Vercel"],
        demoUrl: "https://github.com/evanli135/Portfolio",
        date: "June 2025 - August 2025",
        type: "Project"
    }
]

export const ProjectsSection = () => {
    const iconMap = {
        "Research": <Microscope className="text-primary"/>,
        "Project": <PencilRuler className="text-primary"/>,
        "Club": "SHAY"
    };

    return <section id="projects" className="py-24 px-4 relative">

        {/* Color spill orbs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <div style={{ position:'absolute', top:'5%', right:'5%', width:'480px', height:'340px', borderRadius:'50%', filter:'blur(90px)', background:'radial-gradient(ellipse, rgba(45,212,191,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'10%', left:'0%', width:'420px', height:'300px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(217,70,239,0.15) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-5xl" style={{ position:'relative', zIndex:1 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
                {" "}
                My <span className="text-primary"> Works </span>
            </h2>


            {projects.map((project) => (
                <div className="my-12 card-hover" style={{
                    padding: '24px 40px',
                    borderRadius: '18px',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(45,212,191,0.04) 50%, rgba(96,165,250,0.03) 100%)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    boxShadow: '0 0 40px rgba(45,212,191,0.08), inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(45,212,191,0.06)',
                }}>
                    
                    {/** ICON AND TITLE */}
                    <h3 className="text-primary font-bold text-2xl my-10">
                        {iconMap[project.type]}
                        {project.premise}
                    </h3>


                    <div className="grid grid-cols-2 gap-8 py-10 my-10">
                        {/** Display */}
                        <div className="">
                            {project.display}
                        </div>

                        {/** Text stuff */}
                        <div className="my-auto">
                            <h3 className="text-primary font-bold text-lg">
                                {project.title}
                            </h3>
                            <p className="my-10 text-md">
                                {project.description}
                            </p>

                            {/** Tags */}
                            {/* {cn("grid", `grid-cols-${project.tags.length}`)} */}
                            <div className="flex flex-wrap gap-2 my-2 py-3">

                                {project.tags.map((text, key) => 
                                    (<a
                                        key={key}
                                        className="cosmic-button-unclickable">
                                        {" "}
                                        {text}
                                    </a>)
                                )}

                            </div>

                            {/** Techs */}
                            <div className="flex flex-wrap gap-2 my-2 py-3">

                                {project.techs.map((text, key) => 
                                    (<a
                                        key={key}
                                        className="px-6 py-2 rounded-lg border border-primary text-primary">
                                        {" "}
                                        {text}
                                    </a>)
                                )}

                            </div>
                        
                        </div>
                    </div>

                    {/** Demo */}
                    <a className="cosmic-button my-5"
                        href={project.demoUrl}
                        target="_blank"
                    >
                        See it yourself
                    </a>

                </div>
            ))}
        </div>
    </section>
}
