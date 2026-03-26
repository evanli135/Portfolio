import { Database } from "lucide-react";
import { SiHtml5, SiCss3, SiReact, SiJavascript, SiTypescript, SiTailwindcss, 
         SiNodedotjs, SiExpress, SiPython, SiDjango, SiFlask, SiSpringboot,
         SiGithub, SiDocker, SiPostman } from "react-icons/si";
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava } from "react-icons/fa";
import { PiFileCppBold } from "react-icons/pi";
import { useTheme } from "./ThemeContext";
import { cn } from '../lib/utils'

import { useState } from "react";

const skills = [
    // Frontend
    {name: "HTML",  category: "Frontend", icon: SiHtml5},
    {name: "CSS", category: "Frontend", icon: SiCss3},
    {name: "React", category: "Frontend", icon: SiReact},
    {name: "JavaScript", category: "Frontend", icon: SiJavascript},
    {name: "TypeScript", category: "Frontend", icon: SiTypescript},
    {name: "Tailwind CSS", category: "Frontend", icon: SiTailwindcss},

    // Backend
    {name: "SQL", category: "Backend", icon: Database},
    {name: "Node.js", category: "Backend", icon: SiNodedotjs},
    {name: "Express", category: "Backend", icon: SiExpress},
    {name: "Java", category: "Backend", icon: FaJava},
    {name: "Spring Boot", category: "Backend", icon: SiSpringboot},
    {name: "Python", category: "Backend", icon: SiPython},
    {name: "Django", category: "Backend", icon: SiDjango},
    {name: "Flask", category: "Backend", icon: SiFlask},
    {name: "C and C++", category: "Backend", icon: PiFileCppBold },

    // Tools
    { name: "Git/Github", category: "Dev Tools", icon: SiGithub },
    { name: "Docker", category: "Dev Tools", icon: SiDocker },
    { name: "Postman", category: "Dev Tools", icon: SiPostman },
    { name: "VS Code", category: "Dev Tools", icon: BiLogoVisualStudio },
]

const categories = ["All", "Frontend", "Backend", "Dev Tools"]

export const SkillsSection = () => {
    const [activeCategory, setActiveCategory] = useState("All");
    const { isDarkMode } = useTheme();

    const filteredSkills = skills.filter((skill) => 
        activeCategory === "All" || skill.category === activeCategory
    );

    const defaultTextColor = () => isDarkMode ? 'text-white' : 'text-black';

    return <section id="skills" className="py-24 px-4 relative bg-secondary/30">
        <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
                My <span className="text-primary"> Skills </span>
            </h2>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
                {categories.map((category, key) => (
                    <button 
                        key={key} 
                        onClick={() => setActiveCategory(category)}
                        className={cn("px-5 py-2 rounded-full transition-colors duration-300 capitalize",
                            activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary/70 text-foreground hover:bg-secondary"
                        )}> 
                            {category} 
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSkills.map((skill, key) => (
                    <div key={key} className="bg-card p-6 rounded-lg shadow-xs card-hover">
                        <div className="text-center">
                            <h3 className="font-semibold text-lg mb-4"> {skill.name} </h3>
                            <skill.icon className={`h-12 w-12 mx-auto text-primary mb-2`} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
}