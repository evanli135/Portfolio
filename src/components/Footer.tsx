import { ArrowUp } from "lucide-react";

export const Footer = () => {
    return (
        <footer className="py-12 px-4 relative mt-12 pt-8 flex flex-wrap justify-between items-center" style={{ background:'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(45,212,191,0.04) 100%)', backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)', borderTop:'1px solid rgba(255,255,255,0.10)', boxShadow:'inset 0 1px 0 rgba(255,255,255,0.10)' }}>
            {" "}
            <p className="text-sm text-muted-foreground">
                 &copy; {new Date().getFullYear()} evanli.co, All Rights Reserved. 
            </p>

            <a href="#hero" className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors">
                <ArrowUp/>
            </a>
        </footer>
    )
}