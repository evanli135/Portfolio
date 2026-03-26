import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

export const ContactSection = () => {
    return <section
        id="contact"
        className="py-24 px-4 relative"
    >

        {/* Color spill orbs */}
        <div style={{ position:'absolute', inset:0, overflow:'hidden', pointerEvents:'none', zIndex:0 }}>
            <div style={{ position:'absolute', top:'10%', left:'10%', width:'400px', height:'300px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)' }}/>
            <div style={{ position:'absolute', bottom:'10%', right:'5%', width:'380px', height:'280px', borderRadius:'50%', filter:'blur(80px)', background:'radial-gradient(ellipse, rgba(217,70,239,0.16) 0%, transparent 70%)' }}/>
        </div>

        <div className="container mx-auto max-w-5xl" style={{ position:'relative', zIndex:1 }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center pb-8">
                Get In <span className="text-primary"> Touch</span>
            </h2>

            <div style={{ borderRadius:'20px', padding:'32px', background:'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(45,212,191,0.04) 50%, rgba(217,70,239,0.03) 100%)', backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)', border:'1px solid rgba(255,255,255,0.10)', boxShadow:'0 0 48px rgba(45,212,191,0.08), inset 0 1px 0 rgba(255,255,255,0.12)' }}>

            <div className="flex flex-row items-center justify-center max-w-4xl mx-auto">
                {/* Email */}
                <div className="flex-1 flex items-center gap-3 justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <Mail className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <h3 className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-primary">Email</h3>
                        <a 
                            href="mailto:evanlie.737@gmail.com"
                            className="transition-colors duration-300 groua-hover:text-primary group-hover:text-primary">evanlie.737@gmail.com</a>
                    </div>
                </div>

                {/* Mobile */}
                <div className="flex-1 flex items-center gap-3 justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <Phone className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <p className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-primary">Mobile</p>
                        <a
                            href="tel:+19144868529" 
                            className="transition-colors duration-300 groua-hover:text-primary group-hover:text-primary">+1 (914) 486-8529</a>
                    </div>
                </div>

                {/* Location */}
                <div className="flex-1 flex items-center gap-3 justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <MapPin className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <p className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-primary">Location</p>
                        <p className="transition-colors duration-300 group-hover:text-primary">Boston, MA</p>
                    </div>
                </div>
            </div>


            <div className="flex flex-row items-center justify-around max-w-4xl mx-auto my-8">
                {/* Github */}
                <div className="flex-1 flex items-center gap-3 justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <Github className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <p className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-primary">Github</p>
                        <a 
                            href="https://github.com/evanli135"
                            className="transition-colors duration-300 group-hover:text-primary">evanli135</a>
                    </div>
                </div>

                {/* LinkedIn */}
                <div className="flex-1 flex items-center gap-3 justify-center group cursor-pointer transition-transform duration-300 hover:scale-110">
                    <Linkedin className="h-8 w-8 text-primary flex-shrink-0" />
                    <div>
                        <p className="text-lg text-muted-foreground transition-colors duration-300 group-hover:text-primary">LinkedIn</p>
                        <a className="transition-colors duration-300 group-hover:text-primary"
                            href="https://www.linkedin.com/in/evan-li-ff/">
                            evan-li-ff
                            </a>
                    </div>
                </div>
            </div>

            </div>{/* end glass container */}
        </div>
    </section>
}