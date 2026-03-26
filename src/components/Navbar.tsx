import { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";
import { Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

// Contrast color — #4338CA (deep indigo)
const CONTRAST = '#4338CA';
const RAINBOW = 'linear-gradient(90deg, #2DD4BF, #60A5FA, #D946EF, #4338CA, #2DD4BF)';

const navItems = [
    {name: "Home",       href: "#hero"},
    {name: "About",      href: "#about"},
    {name: "Skills",     href: "#skills"},
    {name: "Projects",   href: "#projects"},
    {name: "Coursework", href: "#coursework"},
    {name: "Resume",     href: "#resume"},
    {name: "Contact",    href: "#contact"},
];

export const Navbar = () => {
    const [isScrolled,    setIsScrolled]    = useState(false);
    const [isMenuOpen,    setIsMenuOpen]    = useState(false);
    const [activeSection, setActiveSection] = useState('hero');
    const [indicator,     setIndicator]     = useState({ left: 0, width: 0 });

    const { isDarkMode } = useTheme();
    const linkRefs     = useRef<(HTMLAnchorElement | null)[]>([]);
    const navLinksRef  = useRef<HTMLDivElement>(null);

    // Light mode marble/silver — dark mode ink
    const navBg = isDarkMode
        ? isScrolled
            ? `linear-gradient(135deg, rgba(8,6,28,0.52) 0%, rgba(22,14,58,0.46) 50%, rgba(10,7,35,0.52) 100%)`
            : `linear-gradient(135deg, rgba(8,6,28,0.22) 0%, rgba(22,14,58,0.18) 50%, rgba(10,7,35,0.22) 100%)`
        : isScrolled
            ? `linear-gradient(135deg, rgba(248,248,252,0.90) 0%, rgba(225,230,242,0.85) 40%, rgba(240,243,252,0.90) 100%)`
            : `linear-gradient(135deg, rgba(255,255,255,0.60) 0%, rgba(230,234,248,0.52) 40%, rgba(248,250,255,0.60) 100%)`;

    const linkColor        = isDarkMode ? 'rgba(255,255,255,0.80)' : 'rgba(20,20,50,0.70)';
    const activeLinkColor  = '#2DD4BF';
    const logoColor        = isDarkMode ? '#fff' : 'rgba(15,15,40,0.90)';
    const mobileIconColor  = isDarkMode ? '#fff' : 'rgba(15,15,40,0.85)';
    const mobileBg         = isDarkMode ? 'rgba(8,6,28,0.96)' : 'rgba(245,246,252,0.97)';

    // Scroll detection
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Section spy via IntersectionObserver
    useEffect(() => {
        const sectionIds = navItems.map(item => item.href.slice(1));
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;
            const observer = new IntersectionObserver(
                ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
                { threshold: 0, rootMargin: '-30% 0px -60% 0px' }
            );
            observer.observe(el);
            observers.push(observer);
        });

        return () => observers.forEach(o => o.disconnect());
    }, []);

    // Move indicator to match active link
    useEffect(() => {
        const activeIndex = navItems.findIndex(item => item.href.slice(1) === activeSection);
        const el        = linkRefs.current[activeIndex];
        const container = navLinksRef.current;
        if (!el || !container) return;
        const elRect        = el.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        setIndicator({ left: elRect.left - containerRect.left, width: elRect.width });
    }, [activeSection]);

    return (
        <nav
            className={cn("fixed w-full z-40 transition-all duration-500",
                isScrolled ? "py-3" : "py-5"
            )}
            style={{
                background: navBg,
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                borderBottom: '1px solid transparent',
                borderImage: `${RAINBOW} 1`,
            }}
        >
            <div className="container flex items-center justify-between">
                <a className="text-xl font-bold flex items-center" href="#hero"
                   style={{ color: logoColor }}>
                    <span className="relative z-10">
                        {" "}
                        <span className="text-glow"> Evan Li </span> Portfolio
                    </span>
                </a>

                {/* Desktop Nav */}
                <div ref={navLinksRef} className="hidden md:flex space-x-8 relative pb-1">

                    {/* Crawling indicator */}
                    <div style={{
                        position:   'absolute',
                        bottom:     0,
                        left:       indicator.left,
                        width:      indicator.width,
                        height:     '3px',
                        background: RAINBOW,
                        borderRadius: '2px',
                        transition: 'left 0.35s cubic-bezier(0.4,0,0.2,1), width 0.35s cubic-bezier(0.4,0,0.2,1)',
                        boxShadow:  '0 0 6px 1px rgba(45,212,191,0.5)',
                    }}/>

                    {navItems.map((item, key) => (
                        <a
                            key={key}
                            href={item.href}
                            ref={el => { linkRefs.current[key] = el; }}
                            className="transition-colors duration-300"
                            style={{ color: activeSection === item.href.slice(1) ? activeLinkColor : linkColor }}
                            onMouseEnter={e => (e.currentTarget.style.color = activeLinkColor)}
                            onMouseLeave={e => (e.currentTarget.style.color =
                                activeSection === item.href.slice(1) ? activeLinkColor : linkColor)}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                {/* Mobile toggle */}
                <button onClick={() => setIsMenuOpen((prev) => !prev)}
                    className="md:hidden p-2 z-50"
                    style={{ color: mobileIconColor }}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}>
                    {isMenuOpen ? <X size={24} /> : <Menu size={24}/>}
                    {" "}
                </button>

                {/* Mobile menu */}
                <div className={cn("fixed inset-0 backdrop-blur-md z-40 flex",
                    "flex-col items-center justify-center md:hidden transition-opacity duration-300",
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none")}
                    style={{ background: mobileBg }}>
                    <div className="flex flex-col space-y-8 text-xl">
                        {navItems.map((item, key) => (
                            <a key={key}
                               href={item.href}
                               className="transition-colors duration-300"
                               style={{ color: activeSection === item.href.slice(1) ? activeLinkColor : linkColor }}
                               onMouseEnter={e => (e.currentTarget.style.color = activeLinkColor)}
                               onMouseLeave={e => (e.currentTarget.style.color =
                                   activeSection === item.href.slice(1) ? activeLinkColor : linkColor)}
                               onClick={() => setIsMenuOpen(false)}>
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </nav>
    )
}
