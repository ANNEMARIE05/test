import { motion } from 'framer-motion'
import { Shield, Network, Server, Lock, Cpu, Database, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const Courses = () => {
    const navigate = useNavigate()
    const formations = [
        {
            id: "CERT-01",
            title: "Linux LPIC-1",
            subtitle: "Certification Linux Administrateur Système",
            icon: <Cpu className="text-shark-accent" />,
            color: "from-blue-500/20 to-shark-accent/20",
            level: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-02",
            title: "CompTIA Security+ SYO-601",
            subtitle: "La référence mondiale en cybersécurité",
            icon: <Shield className="text-premium-neon" />,
            color: "from-cyan-500/20 to-premium-neon/20",
            level: "Avancé",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-03",
            title: "CCNA",
            subtitle: "Cisco Certified Network Associate",
            icon: <Network className="text-shark-accent" />,
            color: "from-blue-600/20 to-shark-fluid/20",
            level: "Intermédiaire",
            image: "https://images.unsplash.com/photo-1551708501-137bc3947477?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-04",
            title: "Sécurité réseaux N+",
            subtitle: "Fondamentaux des réseaux et cybersécurité",
            icon: <Server className="text-shark-fluid" />,
            color: "from-indigo-500/20 to-shark-light/20",
            level: "Débutant",
            image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-05",
            title: "Ethical Hacking",
            subtitle: "Maîtrisez les techniques d'intrusion (Pentest)",
            icon: <Lock className="text-red-500" />,
            color: "from-red-500/10 to-transparent",
            level: "Expert",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "CERT-06",
            title: "Fortinet NSE 4",
            subtitle: "Sécurisation des périmètres avec Fortigate",
            icon: <Database className="text-orange-400" />,
            color: "from-orange-500/20 to-shark-dark/20",
            level: "Avancé",
            image: "https://images.unsplash.com/photo-1562408590-e32931084e23?auto=format&fit=crop&q=80&w=800"
        }
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24"
        >
            <div className="max-w-7xl mx-auto px-6">
                <PageHeader
                    tag="Nos Formations"
                    title="Forgez votre"
                    subtitle="Expertise."
                    image="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                />

                <div className="relative group/carousel">
                    <motion.div
                        className="flex gap-8 overflow-x-auto pb-20 no-scrollbar cursor-grab active:cursor-grabbing"
                        drag="x"
                        dragConstraints={{ right: 0, left: -1000 }} // Ajuster selon le nombre d'items
                    >
                        {formations.map((course, index) => (
                            <motion.div
                                key={index}
                                initial={{ scale: 0.9, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card rounded-[30px] overflow-hidden shrink-0 w-[300px] group border border-white/5 hover:border-shark-accent/30 transition-all duration-500 cursor-pointer"
                            >
                                {/* Image compacte */}
                                <div className="h-44 overflow-hidden relative">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                    <div className="absolute top-4 left-4 flex items-center gap-2">
                                        <div className="w-8 h-8 bg-shark-dark/80 backdrop-blur-md rounded-lg flex items-center justify-center border border-white/10">
                                            {course.icon}
                                        </div>
                                        <span className="bg-shark-dark/80 backdrop-blur-md text-shark-accent px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border border-white/10">
                                            {course.level}
                                        </span>
                                    </div>
                                    <div className="absolute top-4 right-4">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-gray-400 bg-shark-dark/80 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                                            {course.id}
                                        </span>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-shark-dark/60 to-transparent" />
                                </div>

                                {/* Contenu compact */}
                                <div className="p-6">
                                    <h3 className="text-base font-bold font-sora mb-2 leading-snug group-hover:text-shark-accent transition-colors line-clamp-2">
                                        {course.title}
                                    </h3>
                                    <p className="text-gray-500 text-xs font-light mb-5 line-clamp-2">
                                        {course.subtitle}
                                    </p>
                                    <button className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-shark-accent transition-colors flex items-center gap-2">
                                        Consulter <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Navigation Hints */}
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 text-gray-500 pointer-events-none">
                        <span className="text-[10px] uppercase tracking-widest font-bold">Glissez pour explorer</span>
                        <div className="w-12 h-px bg-white/10" />
                        <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ repeat: Infinity, duration: 1.5 }}
                        >
                            <ChevronRight size={16} />
                        </motion.div>
                    </div>
                </div>

                {/* CTA Section */}
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-32 glass-card p-12 md:p-20 rounded-[60px] text-center border-shark-accent/20 bg-gradient-to-b from-white/5 to-transparent overflow-hidden relative"
                >
                    <div className="absolute inset-0 opacity-10 -z-10">
                        <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200" alt="Cohort" className="w-full h-full object-cover" />
                    </div>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-5xl font-black font-sora mb-8 leading-tight">
                            Prêt à rejoindre la prochaine <span className="fluid-text">Cohorte ?</span>
                        </h2>
                        <p className="text-gray-400 text-lg mb-12 font-light">
                            Nos sessions débutent chaque mois avec un nombre limité de places pour garantir un accompagnement personnalisé et une immersion totale.
                        </p>
                        <Button onClick={() => navigate('/contact')}>Réserver un entretien</Button>
                    </div>
                </motion.div>
            </div>
        </motion.div >
    )
}

export default Courses
