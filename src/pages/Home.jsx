import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useSpring, useInView, useTransform } from 'framer-motion'
import { Shield, Cloud, Code, Users, Award, Zap, CheckCircle, ChevronRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import Partners from '../components/sections/Partners'

// Composant compteur animé chic
const AnimatedStat = ({ value, suffix }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
    const spring = useSpring(0, { stiffness: 60, damping: 20, mass: 1 })
    const display = useTransform(spring, (v) => Math.floor(v).toLocaleString())

    useEffect(() => {
        if (isInView) spring.set(value)
    }, [isInView, value, spring])

    return (
        <span ref={ref}>
            <motion.span>{display}</motion.span>{suffix}
        </span>
    )
}

const Home = () => {
    const navigate = useNavigate()
    const [activeTestimonial, setActiveTestimonial] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveTestimonial((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))
        }, 6000)
        return () => clearInterval(interval)
    }, [])

    const testimonials = [
        {
            name: "ADAMA K.",
            role: "Responsable informatique",
            text: "Je cherchais une formation sérieuse en protection des infrastructures réseau. La formation proposée par Shark Technology m’a permis de comprendre les vulnérabilités, les techniques d’attaque et surtout comment y répondre efficacement.",
            avatar: "https://images.unsplash.com/photo-1542903660-f655848bb09a?auto=format&fit=crop&q=80&w=200",
            stars: 5
        },
        {
            name: "SYLVIA N.",
            role: "Administratrice Systèmes",
            text: "J’avais déjà un bagage en informatique, mais je voulais passer au niveau supérieur en hacking éthique. Le cursus 'Ethical Hacking' de Shark m’a donné les outils et la confiance nécessaires. Le suivi est rigoureux, le support toujours disponible — je recommande à tous ceux qui veulent faire carrière dans la cyber.",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
            stars: 5
        },
        {
            name: "MICHEL D.",
            role: "Ingénieur Réseau",
            text: "J’ai suivi la formation de sécurité cloud et aujourd’hui je suis expert cloud security certifié.",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
            stars: 5
        }
    ]

    const expertises = [
        {
            id: "01",
            title: "Sécurité réseaux",
            icon: <Shield className="text-shark-accent" size={32} />,
            desc: "Protection des infrastructures critiques et audit de vulnérabilités.",
            image: "https://images.unsplash.com/photo-1558494949-ef0109159d5e?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "02",
            title: "Sécurité cloud",
            icon: <Cloud className="text-shark-accent" size={32} />,
            desc: "Sécurisation des environnements hybrides et multi-cloud.",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: "03",
            title: "Développement d'applications",
            icon: <Code className="text-shark-accent" size={32} />,
            desc: "Conception de solutions robustes et sécurisées dès le premier code.",
            image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800"
        }
    ]

    const stats = [
        { label: "Clients satisfaits", value: 30, suffix: "" },
        { label: "Certifications internationales", value: 30, suffix: "" },
        { label: "Experts", value: 30, suffix: "+" },
        { label: "Projets effectués", value: 30, suffix: "" },
    ]

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative"
        >
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2000"
                        alt="Cyber Background"
                        className="w-full h-full object-cover grayscale opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-shark-deep via-shark-deep/80 to-shark-deep" />
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-shark-accent/10 rounded-full blur-[120px] animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-premium-neon/10 rounded-full blur-[120px] animate-pulse delay-700" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="inline-block py-1 px-4 rounded-full bg-white/5 border border-white/10 text-shark-accent text-xs font-bold uppercase tracking-[0.2em] mb-6">
                            L'avenir numérique commence ici
                        </span>
                        <h1 className="text-5xl md:text-8xl font-black font-sora mb-8 leading-tight">
                            Devenez un <span className="fluid-text">Expert</span> <br />
                            en Cybersécurité
                        </h1>
                        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                            Maîtrisez les technologies de pointe avec Shark Technologys. Des formations intensives pour propulser votre carrière au sommet du monde IT.
                        </p>
                        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                            <Button onClick={() => navigate('/formations')}>Nos Formations</Button>
                            <Button variant="outline" onClick={() => navigate('/contact')}>Nous Contacter</Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
                >
                    <div className="w-6 h-10 border-2 border-white/10 rounded-full flex justify-center pt-2">
                        <div className="w-1 h-2 bg-shark-accent rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* Expertise Section */}
            <section className="py-24 bg-shark-dark/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {expertises.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ y: 50, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -8, scale: 1.02 }}
                                transition={{ duration: 0.5, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
                                className="glass-card rounded-2xl group hover:border-shark-accent/50 transition-all duration-500 overflow-hidden flex flex-col h-full transform skew-y-1 hover:skew-y-0 relative cursor-pointer"
                            >
                                {/* Decorative Figures */}
                                <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-shark-accent/10 rounded-tr-2xl group-hover:border-shark-accent/40 transition-colors duration-500" />
                                <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-premium-neon/5 rounded-full blur-2xl group-hover:bg-shark-accent/10 transition-colors" />

                                <div className="h-48 overflow-hidden relative shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-shark-deep to-transparent opacity-60" />
                                    <div className="absolute top-6 left-6 text-5xl font-black font-sora text-white/5 pointer-events-none group-hover:text-shark-accent/10 transition-colors">
                                        {item.id}
                                    </div>
                                </div>
                                <div className="p-8 flex-grow relative z-10">
                                    <div className="mb-6 bg-white/5 w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-shark-accent/20 transition-all duration-500 text-shark-accent shadow-lg border border-white/5 group-hover:scale-110 transform">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold font-sora mb-3 group-hover:text-white transition-colors uppercase tracking-widest">{item.title}</h3>
                                    <p className="text-gray-400 font-light leading-relaxed text-sm group-hover:text-gray-300 transition-colors">{item.desc}</p>

                                    {/* Line Figure */}
                                    <div className="mt-8 h-0.5 w-12 bg-white/10 group-hover:w-full transition-all duration-700 bg-gradient-to-r from-shark-accent to-transparent" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <Partners />

            {/* About Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ x: -100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-6xl font-black font-sora mb-10 leading-tight">
                            Qui sommes nous ? <br />
                            <span className="text-shark-accent">Dévenez experts</span> grâce à nos formations
                        </h2>

                        <div className="space-y-10">
                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-shark-accent/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Award className="text-shark-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-sora mb-2">Formateurs de qualité</h4>
                                    <p className="text-gray-400 font-light">Formés aux plus hauts standards, nos experts en cybersécurité mettent leur expérience du terrain au service de votre apprentissage.</p>
                                </div>
                            </div>

                            <div className="flex gap-6">
                                <div className="w-12 h-12 bg-shark-accent/10 rounded-xl flex items-center justify-center shrink-0">
                                    <Users className="text-shark-accent" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold font-sora mb-2">Formateurs engagés</h4>
                                    <p className="text-gray-400 font-light">Parce que votre réussite est notre priorité, nos formateurs s’impliquent à chaque étape de votre montée en compétences.</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12">
                            <Button variant="outline" className="flex items-center gap-2 group" onClick={() => navigate('/contact')}>
                                En savoir plus <ChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 100, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gradient-to-tr from-shark-accent/20 to-premium-neon/20 rounded-full blur-[100px] absolute inset-0 -z-10 animate-pulse" />
                        <div className="glass-card rounded-[40px] p-2 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-700">
                            <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800" alt="Tech Expert" className="rounded-[38px] grayscale hover:grayscale-0 transition-all duration-700" />
                        </div>
                        <div className="absolute -bottom-10 -left-10 glass-card p-8 rounded-3xl animate-bounce">
                            <Zap className="text-premium-neon" size={32} />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-24 border-y border-white/5 relative overflow-hidden">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-shark-accent/3 via-transparent to-premium-neon/3 pointer-events-none" />
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                                className="text-center group relative"
                            >
                                {/* Decorative line top */}
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.15 + 0.3 }}
                                    className="absolute -top-6 left-1/2 -translate-x-1/2 w-8 h-px bg-shark-accent origin-center"
                                />
                                <div className="text-5xl md:text-7xl font-black font-sora text-white mb-4 group-hover:text-shark-accent transition-colors duration-500 tabular-nums">
                                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="text-gray-500 uppercase tracking-widest text-[10px] font-bold font-outfit">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials XXL Section */}
            <section className="py-40 relative overflow-hidden bg-shark-dark/30">
                {/* Background Geometric Figures */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-shark-accent/5 rounded-full blur-[120px] -mr-96 -mt-96" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-premium-neon/5 rounded-full blur-[100px] -ml-48 -mb-48" />

                <div className="max-w-7xl mx-auto px-6 relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
                        <div className="max-w-2xl text-left">
                            <motion.span
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                className="text-shark-accent font-bold tracking-[0.4em] uppercase text-[10px] mb-6 block"
                            >
                                Success Stories
                            </motion.span>
                            <h2 className="text-5xl md:text-7xl font-black font-sora leading-tight">
                                TÉMOIGNAGES <br />
                                <span className="fluid-text text-3xl md:text-5xl uppercase opacity-80">Ce que nos clients disent de nous</span>
                            </h2>
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() => setActiveTestimonial((prev) => (prev > 0 ? prev - 1 : testimonials.length - 2))}
                                className="w-16 h-16 rounded-2xl border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all group"
                            >
                                <ChevronRight size={24} className="rotate-180 group-hover:-translate-x-1 transition-transform" />
                            </button>
                            <button
                                onClick={() => setActiveTestimonial((prev) => (prev < testimonials.length - 2 ? prev + 1 : 0))}
                                className="w-16 h-16 rounded-2xl bg-shark-accent text-shark-deep flex items-center justify-center hover:scale-105 transition-all shadow-xl shadow-shark-accent/20 group"
                            >
                                <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full">
                        <AnimatePresence mode="wait">
                            {[0, 1].map((offset) => {
                                const index = (activeTestimonial + offset) % testimonials.length;
                                const item = testimonials[index];
                                return (
                                    <motion.div
                                        key={`${index}-${offset}`}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -30 }}
                                        transition={{ duration: 0.6, delay: offset * 0.1 }}
                                        className="glass-card p-12 rounded-3xl relative overflow-hidden flex flex-col h-full border border-white/5 hover:border-shark-accent/30 transition-all duration-500 group"
                                    >
                                        {/* Inner Card Figure */}
                                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-shark-accent/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />

                                        <div className="flex gap-1 mb-8">
                                            {[...Array(item.stars)].map((_, i) => (
                                                <span key={i} className="text-shark-accent text-lg">⭐</span>
                                            ))}
                                        </div>

                                        <p className="text-xl md:text-2xl font-light italic leading-relaxed mb-12 text-gray-200 flex-grow relative z-10">
                                            "{item.text}"
                                        </p>

                                        <div className="flex items-center gap-6 border-t border-white/5 pt-8 mt-auto">
                                            <div className="w-20 h-20 rounded-2xl overflow-hidden border border-white/10 p-1 bg-white/5 relative z-10 shrink-0">
                                                <img src={item.avatar} alt={item.name} className="w-full h-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-500" />
                                            </div>
                                            <div>
                                                <div className="font-bold text-2xl font-sora text-white">{item.name}</div>
                                                <div className="text-shark-accent text-[10px] tracking-[0.2em] uppercase font-black">{item.role}</div>
                                            </div>
                                        </div>

                                        {/* Floating Quotes Icon */}
                                        <div className="absolute top-10 right-10 text-8xl font-serif text-white/5 pointer-events-none select-none">“</div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>


                </div>
            </section>
        </motion.div>
    )
}

export default Home
