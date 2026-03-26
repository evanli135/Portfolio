import { ArrowDown } from "lucide-react";

export const HeroSection = () => {
    return <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center px-4">
        {/* Central turquoise nebula — #2DD4BF */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div style={{
                width: "900px",
                height: "600px",
                borderRadius: "50%",
                background: "radial-gradient(ellipse, rgba(45,212,191,0.45) 0%, rgba(45,212,191,0.18) 45%, transparent 70%)",
                filter: "blur(25px)"
            }}/>
        </div>
        {/* Blue accent orb — #60A5FA — top right */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div style={{
                width: "600px",
                height: "420px",
                borderRadius: "50%",
                transform: "translate(280px, -160px)",
                background: "radial-gradient(ellipse, rgba(96,165,250,0.40) 0%, transparent 70%)",
                filter: "blur(30px)"
            }}/>
        </div>
        {/* Magenta accent orb — #D946EF — bottom left */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <div style={{
                width: "550px",
                height: "380px",
                borderRadius: "50%",
                transform: "translate(-260px, 180px)",
                background: "radial-gradient(ellipse, rgba(217,70,239,0.36) 0%, transparent 70%)",
                filter: "blur(30px)"
            }}/>
        </div>

        {/* Grain overlay — ties hero orbs into the same frosted glass texture as the background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '128px 128px',
            opacity: 0.055,
            mixBlendMode: 'overlay',
        }}/>

        <div className="container max-w-4xl mx-auto text-center z-10">
            <div className="space-y-8">
                <h1 className="text-5xl md:text-8xl font-bold tracking-tight">
                    <span className="opacity-0 animate-fade-in-delay-1"> Hi my name is </span>
                    <span className="text-primary opacity-0 animate-fade-in-delay-1">
                        {" "}
                        Evan
                        </span>
                    <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-1"> Li </span>
                </h1>

                {/* Quick Description */}
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in-delay-2">
                    I'm an aspiring systems engineer with a passion and curiosity for machine learning,
                    research and development, and low-level programming.
                </p>

                <div>
                    <a href="#projects" className="cosmic-button opacity-0 animate-fade-in-delay-3">
                        View My Work
                    </a>
                </div>
            </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <span className="text-sm text-muted-foreground mb-2"> Scroll </span>
            <ArrowDown className="h-5 w-5 text-primary"/>
        </div>
    </section>
}
