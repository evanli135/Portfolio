import resume from '../assets/EvanLiResume.pdf'

const TEAL = '#60A5FA';

export const ResumeSection = () => (
    <section id="resume" className="py-24 px-2 relative">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            See my <span className="text-primary"> Resume </span>
        </h2>

        <div className="mx-auto w-full" style={{ maxWidth: '98vw' }}>
            <div style={{
                borderRadius: '18px',
                border: `1px solid ${TEAL}44`,
                borderTop: `2px solid ${TEAL}`,
                background: `linear-gradient(160deg, ${TEAL}0a 0%, transparent 100%)`,
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                boxShadow: `0 0 48px 10px ${TEAL}22, inset 0 1px 0 ${TEAL}44`,
                overflow: 'hidden',
            }}>
                {/* Header bar */}
                <div style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 24px',
                    borderBottom: `1px solid ${TEAL}22`,
                    background: `${TEAL}08`,
                }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: `${TEAL}cc` }}>
                        Evan Li — Resume
                    </span>
                    <a href={resume} download="EvanLiResume.pdf" style={{
                        fontSize: '12px', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: TEAL, textDecoration: 'none', padding: '6px 14px', borderRadius: '8px',
                        border: `1px solid ${TEAL}55`, background: `${TEAL}0f`,
                        transition: 'background 0.2s',
                    }}
                        onMouseOver={e => (e.currentTarget.style.background = `${TEAL}22`)}
                        onMouseOut={e => (e.currentTarget.style.background = `${TEAL}0f`)}
                    >
                        Download
                    </a>
                </div>

                {/* PDF iframe */}
                <iframe
                    src={resume}
                    width="100%"
                    height="780px"
                    style={{ display: 'block', border: 'none' }}
                    title="Evan Li Resume"
                />
            </div>
        </div>
    </section>
)
