import type { CSSProperties, ReactNode } from 'react';

interface GlassTextProps {
    children: ReactNode;
    style?: CSSProperties;
    className?: string;
}

export const GlassText = ({ children, style, className }: GlassTextProps) => (
    <span
        className={className}
        style={{
            display: 'inline-block',
            fontWeight: 800,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            /* Colorful fill: icy-white → electric blue → teal */
            background: 'linear-gradient(135deg, #d6f1ff 0%, #60A5FA 48%, #2DD4BF 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            /* Translucent white ring — the "glassy" outline */
            WebkitTextStroke: '1.5px rgba(255,255,255,0.38)',
            /* Soft glow halo behind the letters */
            textShadow: '0 0 16px rgba(96,165,250,0.55), 0 0 40px rgba(45,212,191,0.28)',
            ...style,
        }}
    >
        {children}
    </span>
);
