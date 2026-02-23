import { motion } from 'framer-motion'
import { Calendar, User, ArrowUpRight, Search } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'

const Blog = () => {
    const articles = [
        {
            title: "L'IA dans la Cybersécurité : Allié ou Menace ?",
            category: "Technologie",
            date: "24 Fév 2026",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
            featured: true
        },
        {
            title: "Top 5 des certifications IT en 2026",
            category: "Carrière",
            date: "20 Fév 2026",
            image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=600",
            featured: false
        },
        {
            title: "Sécuriser son Cloud : Les bonnes pratiques",
            category: "Cloud",
            date: "15 Fév 2026",
            image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=600",
            featured: false
        },
        {
            title: "Le guide du Pentesting pour débutants",
            category: "Sécurité",
            date: "10 Fév 2026",
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=600",
            featured: false
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

                {/* Header + Search alignés proprement */}
                <PageHeader
                    tag="Le Mag Shark"
                    title="Journal d'un"
                    subtitle="Initié."
                    image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
                />

                {/* Barre de recherche séparée */}
                <div className="flex justify-end mb-16 -mt-8">
                    <div className="relative group w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Rechercher..."
                            className="w-full bg-white/5 border border-white/10 rounded-full px-8 py-4 text-sm focus:outline-none focus:border-shark-accent transition-all"
                        />
                        <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-shark-accent transition-colors" size={18} />
                    </div>
                </div>

                {/* Featured Article */}
                <div className="mb-16">
                    {articles.filter(a => a.featured).map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative h-[420px] rounded-[50px] overflow-hidden group border border-white/5"
                        >
                            <img src={post.image} alt={post.title} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105" />
                            <div className="absolute inset-0 bg-gradient-to-t from-shark-deep via-shark-deep/20 to-transparent" />

                            <div className="absolute bottom-0 left-0 p-10 md:p-16 text-white max-w-4xl">
                                <div className="flex gap-4 mb-4">
                                    <span className="bg-shark-accent text-shark-deep px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">{post.category}</span>
                                    <span className="text-gray-400 text-xs flex items-center gap-2"><Calendar size={14} /> {post.date}</span>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black font-sora mb-6 leading-tight">
                                    {post.title}
                                </h2>
                                <button className="flex items-center gap-4 font-bold text-base hover:text-shark-accent transition-colors group/btn">
                                    Lire l'article <div className="p-3 bg-shark-accent rounded-full text-shark-deep rotate-45 group-hover/btn:rotate-0 transition-transform"><ArrowUpRight size={18} /></div>
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Grid Articles - cartes plus compactes */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.filter(a => !a.featured).map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ y: 30, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -6, scale: 1.02 }}
                            transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                            className="group glass-card rounded-[30px] overflow-hidden border border-white/5 hover:border-shark-accent/20 transition-all duration-500 cursor-pointer"
                        >
                            {/* Image compacte */}
                            <div className="h-48 overflow-hidden relative">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                                <div className="absolute top-4 left-4">
                                    <span className="bg-shark-dark/80 backdrop-blur-md text-shark-accent px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10">{post.category}</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-t from-shark-dark/40 to-transparent" />
                            </div>

                            {/* Contenu */}
                            <div className="p-6">
                                <div className="flex items-center justify-between gap-4 mb-3">
                                    <span className="text-gray-500 text-xs flex items-center gap-2"><Calendar size={12} /> {post.date}</span>
                                    <span className="text-gray-500 text-xs flex items-center gap-2"><User size={12} /> Admin</span>
                                </div>
                                <h3 className="text-lg font-bold font-sora mb-4 leading-snug group-hover:text-shark-accent transition-colors line-clamp-2">
                                    {post.title}
                                </h3>
                                <button className="text-xs font-black uppercase tracking-widest text-white/40 group-hover:text-shark-accent transition-colors flex items-center gap-2">
                                    Explorer <ArrowUpRight size={14} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default Blog
