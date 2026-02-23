import { motion } from 'framer-motion'
import { Send, MapPin, Phone, Mail, MessageSquare } from 'lucide-react'
import Button from '../components/ui/Button'
import PageHeader from '../components/ui/PageHeader'

const Contact = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-32 pb-24"
        >
            <div className="max-w-7xl mx-auto px-6">
                <PageHeader
                    tag="Entrons en contact"
                    title="Parlons de votre"
                    subtitle="Avenir."
                    image="https://images.unsplash.com/photo-1516387933901-824c251b48bc?auto=format&fit=crop&q=80&w=800"
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-10 md:p-16 rounded-[50px] border-white/5 bg-gradient-to-br from-white/5 to-transparent"
                    >
                        <div className="flex items-center gap-4 mb-12">
                            <div className="w-12 h-12 bg-shark-accent/10 rounded-2xl flex items-center justify-center text-shark-accent">
                                <MessageSquare size={24} />
                            </div>
                            <h2 className="text-3xl font-bold font-sora">Envoyez-nous un message</h2>
                        </div>

                        <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Nom Complet</label>
                                    <input
                                        type="text"
                                        placeholder="Votre nom"
                                        className="w-full bg-white/5 border border-white/10 rounded-[20px] px-8 py-5 text-sm focus:outline-none focus:border-shark-accent transition-all"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Email</label>
                                    <input
                                        type="email"
                                        placeholder="votre@email.com"
                                        className="w-full bg-white/5 border border-white/10 rounded-[20px] px-8 py-5 text-sm focus:outline-none focus:border-shark-accent transition-all"
                                    />
                                </div>
                            </div>
                            <div className="space-y-3">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500 ml-4">Votre Message</label>
                                <textarea
                                    rows="6"
                                    placeholder="Comment pouvons-nous vous aider ?"
                                    className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-6 text-sm focus:outline-none focus:border-shark-accent transition-all resize-none"
                                ></textarea>
                            </div>
                            <Button className="w-full py-6 flex items-center justify-center gap-3">
                                Envoyer le Message <Send size={18} />
                            </Button>
                        </form>
                    </motion.div>

                    {/* Info Section */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="flex flex-col gap-12"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="glass-card p-10 rounded-[40px] border-white/5">
                                <Phone className="text-shark-accent mb-6" size={32} />
                                <h4 className="text-white font-bold mb-4 font-sora">Téléphone</h4>
                                <p className="text-gray-400 text-sm font-light">+225 07 12 62 44 37</p>
                            </div>
                            <div className="glass-card p-10 rounded-[40px] border-white/5">
                                <Mail className="text-shark-accent mb-6" size={32} />
                                <h4 className="text-white font-bold mb-4 font-sora">Email</h4>
                                <p className="text-gray-400 text-sm font-light">infos@sharktechnologys.ci</p>
                            </div>
                        </div>

                        <div className="glass-card p-10 rounded-[40px] border-white/5">
                            <div className="flex gap-10">
                                <MapPin className="text-shark-accent shrink-0" size={32} />
                                <div>
                                    <h4 className="text-white font-bold mb-4 font-sora">Adresse</h4>
                                    <p className="text-gray-400 text-sm font-light leading-relaxed">
                                        Cocody Riviera 2, Rue D108<br />
                                        Abidjan, Côte d'Ivoire
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card p-4 rounded-[40px] border-white/5 flex-grow overflow-hidden relative min-h-[300px]">
                            {/* Fake Map UI */}
                            <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" alt="Localisation Abidjan" className="w-full h-full object-cover rounded-[36px] grayscale opacity-40 group-hover:opacity-60 transition-opacity" />
                            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-shark-deep to-transparent" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-20 h-20 bg-shark-accent/20 rounded-full animate-ping absolute" />
                                <div className="w-10 h-10 bg-shark-accent rounded-full border-4 border-shark-deep relative z-10 shadow-[0_0_30px_rgba(0,210,255,0.8)]" />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    )
}

export default Contact
