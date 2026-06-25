import { StarBackground } from "../components/StarBackgruond";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactsSection"
import { ResumeSection } from "../components/ResumeSection";
import { Footer } from "../components/Footer";
import { CoursesSection } from "../components/CoursesSection";
import { WritingSection } from "../components/WritingSection";
import { ExperienceSection } from "../components/ExperienceSection";

export const Home = () => {
    return <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {/* Background Effects */}
        <StarBackground />

        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main>
            <HeroSection />
            <AboutSection />
            <ExperienceSection />
            <WritingSection />
            <SkillsSection />
            <ProjectsSection />
            <CoursesSection />
            <ResumeSection />
            <ContactSection />
        </main>

        {/* Footer */}
        <Footer/>
    </div>
}