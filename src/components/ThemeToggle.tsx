import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "../lib/utils";
import { useTheme } from "./ThemeContext"

export const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.code === 'Space' && e.target === document.body) {
                e.preventDefault();
                toggleTheme();
            }
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [toggleTheme]);

    return (
        <>
            {/* SVG gradient definition — turquoise → blue → magenta */}
            <svg width="0" height="0" style={{ position: 'absolute', overflow: 'hidden' }}>
                <defs>
                    <linearGradient id="icon-palette" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%"   stopColor="#2DD4BF" />
                        <stop offset="50%"  stopColor="#60A5FA" />
                        <stop offset="100%" stopColor="#D946EF" />
                    </linearGradient>
                </defs>
            </svg>

            <div className="fixed max-sm:hidden top-2 right-5 z-50 flex flex-col items-center gap-1">
                <button onClick={toggleTheme} className={cn(
                    "p-2 rounded-full transition-all duration-300 focus:outline-hidden"
                )} style={{
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 100%)',
                    border: '1px solid rgba(255,255,255,0.22)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.18)',
                }}>
                    {isDarkMode
                        ? <Sun  className="h-6 w-6" style={{ stroke: 'url(#icon-palette)' }}/>
                        : <Moon className="h-6 w-6" style={{ stroke: 'url(#icon-palette)' }}/>
                    }
                </button>

                <kbd style={{
                    fontSize: '9px',
                    fontFamily: 'monospace',
                    letterSpacing: '0.08em',
                    padding: '2px 5px',
                    borderRadius: '3px',
                    background: 'rgba(255,255,255,0.08)',
                    border: '1px solid rgba(255,255,255,0.18)',
                    color: 'rgba(255,255,255,0.45)',
                    lineHeight: 1.4,
                    userSelect: 'none',
                }}>
                    SPACE
                </kbd>
            </div>
        </>
    );
}
