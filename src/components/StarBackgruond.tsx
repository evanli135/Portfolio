import { useState, useEffect } from "react";

// Background accent palette — locked hex values
const TURQUOISE = '#2DD4BF'; // primary
const BLUE      = '#60A5FA'; // secondary
const MAGENTA   = '#D946EF'; // tertiary

// Helper: hex to rgb components string for use in rgba()
function hexRgb(hex: string): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `${r},${g},${b}`;
}

const T = hexRgb(TURQUOISE);
const B = hexRgb(BLUE);
const M = hexRgb(MAGENTA);

const STAR_COLORS = [
    // turquoise — majority (~50%)
    { color: `rgba(${T},0.95)`, glow: `0 0 6px 2px rgba(${T},0.55), 0 0 14px 4px rgba(${T},0.2)` },
    { color: `rgba(${T},0.95)`, glow: `0 0 6px 2px rgba(${T},0.55), 0 0 14px 4px rgba(${T},0.2)` },
    { color: `rgba(${T},0.95)`, glow: `0 0 6px 2px rgba(${T},0.55), 0 0 14px 4px rgba(${T},0.2)` },
    // blue (~25%)
    { color: `rgba(${B},0.95)`, glow: `0 0 6px 2px rgba(${B},0.55), 0 0 14px 4px rgba(${B},0.2)` },
    { color: `rgba(${B},0.95)`, glow: `0 0 6px 2px rgba(${B},0.55), 0 0 14px 4px rgba(${B},0.2)` },
    // magenta (~25%)
    { color: `rgba(${M},0.9)`,  glow: `0 0 6px 2px rgba(${M},0.5),  0 0 14px 4px rgba(${M},0.2)` },
    { color: `rgba(${M},0.9)`,  glow: `0 0 6px 2px rgba(${M},0.5),  0 0 14px 4px rgba(${M},0.2)` },
];

const METEOR_COLORS = [
    // turquoise — majority
    { from: `rgba(${T},1)`, mid: `rgba(${T},0.5)` },
    { from: `rgba(${T},1)`, mid: `rgba(${T},0.5)` },
    { from: `rgba(${T},1)`, mid: `rgba(${T},0.5)` },
    // blue
    { from: `rgba(${B},1)`, mid: `rgba(${B},0.5)` },
    { from: `rgba(${B},1)`, mid: `rgba(${B},0.5)` },
    // magenta
    { from: `rgba(${M},1)`, mid: `rgba(${M},0.5)` },
];

interface Star {
    id: number;
    size: number;
    x: number;
    y: number;
    opacity: number;
    animationDuration: number;
    color: string;
    glow: string;
}

interface Meteor {
    id: number;
    size: number;
    x: number;
    y: number;
    delay: number;
    animationDuration: number;
    colorFrom: string;
    colorMid: string;
}

export const StarBackground = () => {
    const [stars, setStars] = useState<Star[]>([]);
    const [meteors, setMeteors] = useState<Meteor[]>([]);

    useEffect(() => {
        generateStars();
        generateMeteors();

        const handleResize = () => {
            generateStars();
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [])

    const generateStars = () => {
        const numberOfStars = Math.floor(window.innerWidth * window.innerHeight / 8000);
        const newStars: Star[] = [];

        for (let i = 0; i < numberOfStars; i++) {
            const palette = STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)];
            newStars.push({
                id: i,
                size: Math.random() * 3 + 1,
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: Math.random() * 0.5 + 0.4,
                animationDuration: Math.random() * 4 + 2,
                color: palette.color,
                glow: palette.glow,
            });
        }

        setStars(newStars);
    };

    const generateMeteors = () => {
        const newMeteors: Meteor[] = [];

        for (let i = 0; i < 12; i++) {
            const palette = METEOR_COLORS[Math.floor(Math.random() * METEOR_COLORS.length)];
            newMeteors.push({
                id: i,
                size: Math.random() * 2 + 1,
                x: Math.random() * 100,
                y: Math.random() * 20,
                delay: Math.random() * 12,
                animationDuration: Math.random() * 3 + 3,
                colorFrom: palette.from,
                colorMid: palette.mid,
            });
        }

        setMeteors(newMeteors);
    };

    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Multi-color ambient background zones */}
            <div style={{
                position: 'absolute', inset: 0,
                background: `
                    radial-gradient(ellipse at 15% 25%, rgba(${B},0.32) 0%, transparent 50%),
                    radial-gradient(ellipse at 85% 15%, rgba(${M},0.28) 0%, transparent 45%),
                    radial-gradient(ellipse at 50% 85%, rgba(${T},0.30) 0%, transparent 50%),
                    radial-gradient(ellipse at 75% 60%, rgba(${B},0.20) 0%, transparent 40%)
                `
            }}/>

            {/* Grain/noise overlay — frosted glass texture */}
            <div style={{
                position: 'absolute', inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'repeat',
                backgroundSize: '128px 128px',
                opacity: 0.055,
                mixBlendMode: 'overlay',
            }}/>

            {stars.map((star) => (
                <div key={star.id} className="animate-pulse-subtle" style={{
                    position: 'absolute',
                    borderRadius: '50%',
                    width: star.size + "px",
                    height: star.size + "px",
                    left: `${star.x}%`,
                    top: `${star.y}%`,
                    opacity: star.opacity,
                    animationDuration: `${star.animationDuration}s`,
                    background: star.color,
                    boxShadow: star.glow,
                }}/>
            ))}

            {meteors.map((meteor) => (
                <div key={meteor.id} className="animate-meteor" style={{
                    position: 'absolute',
                    borderRadius: '9999px',
                    width: meteor.size * 50 + "px",
                    height: meteor.size * 1.5 + "px",
                    left: `${meteor.x}%`,
                    top: `${meteor.y}%`,
                    animationDelay: meteor.delay + "s",
                    animationDuration: `${meteor.animationDuration}s`,
                    background: `linear-gradient(to right, ${meteor.colorFrom}, ${meteor.colorMid}, transparent)`,
                    boxShadow: `0 0 10px 4px ${meteor.colorFrom.replace('1)', '0.4)')}`,
                }}/>
            ))}
        </div>
    );
}
