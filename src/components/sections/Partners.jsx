import { motion } from 'framer-motion'

const Partners = () => {
    const partners = [
        {
            name: "Cisco",
            desc: "Solutions Réseaux",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Cisco_logo_blue_2016.svg/1200px-Cisco_logo_blue_2016.svg.png"
        },
        {
            name: "CompTIA",
            desc: "Certifications IT",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/CompTIA_Logo.svg/1200px-CompTIA_Logo.svg.png"
        },
        {
            name: "Fortinet",
            desc: "Cybersécurité",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fortinet_logo.svg/1200px-Fortinet_logo.svg.png"
        },
        {
            name: "AWS",
            desc: "Cloud Computing",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1200px-Amazon_Web_Services_Logo.svg.png"
        },
        {
            name: "Microsoft",
            desc: "Plateforme Enterprise",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png"
        },
        {
            name: "Linux",
            desc: "Systèmes Open-Source",
            logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tux.svg/300px-Tux.svg.png"
        },
    ]

    return (
        <section className="py-24 relative overflow-hidden bg-shark-deep/30 border-y border-white/5">
            <div className="absolute inset-0 bg-gradient-to-r from-shark-accent/3 via-transparent to-premium-neon/3 pointer-events-none" />

            {/* Header */}
            <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
                <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-shark-accent font-bold tracking-[0.3em] uppercase text-[10px] mb-4 block"
                >
                    Partenaires Technologiques
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black font-sora"
                >
                    Une alliance <span className="fluid-text">Stratégique.</span>
                </motion.h2>
            </div>

            {/* CSS Infinite Marquee */}
            <div className="relative flex overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)' }}>
                <style>{`
                    @keyframes marquee-scroll {
                        0%   { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    .marquee-track {
                        display: flex;
                        width: max-content;
                        animation: marquee-scroll 30s linear infinite;
                    }
                    .marquee-track:hover {
                        animation-play-state: paused;
                    }
                `}</style>

                <div className="marquee-track gap-6 flex" style={{ gap: '1.5rem' }}>
                    {/* First copy */}
                    {partners.map((partner, index) => (
                        <PartnerCard key={`a-${index}`} partner={partner} />
                    ))}
                    {/* Second copy — seamless loop */}
                    {partners.map((partner, index) => (
                        <PartnerCard key={`b-${index}`} partner={partner} />
                    ))}
                </div>
            </div>
        </section>
    )
}

const PartnerCard = ({ partner }) => (
    <div className="shrink-0 w-52 h-32 glass-card rounded-2xl border border-white/5 hover:border-shark-accent/30 transition-all duration-500 group flex flex-col items-center justify-center gap-3 p-6 cursor-pointer hover:-translate-y-1 mx-3">
        <div className="h-10 flex items-center justify-center w-full">
            <img
                src={partner.logo}
                alt={partner.name}
                className="max-h-10 max-w-[120px] object-contain brightness-0 invert opacity-40 group-hover:opacity-90 group-hover:brightness-100 group-hover:invert-0 transition-all duration-500"
            />
        </div>
        <div className="text-center">
            <div className="text-[11px] font-black uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">
                {partner.name}
            </div>
            <div className="text-[9px] text-gray-700 group-hover:text-gray-400 transition-colors font-light">
                {partner.desc}
            </div>
        </div>
    </div>
)

export default Partners
