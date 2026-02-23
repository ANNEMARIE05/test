import { motion, AnimatePresence } from 'framer-motion'
import { ShieldAlert } from 'lucide-react'
import { useState, useEffect } from 'react'

const Preloader = ({ onComplete }) => {
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false)
            setTimeout(onComplete, 800)
        }, 1500)
        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(20px)' }}
                    transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
                    className="fixed inset-0 z-[100] bg-shark-deep flex items-center justify-center overflow-hidden"
                >
                    {/* Background effects */}
                    <div className="absolute inset-0">
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.1, 0.2, 0.1]
                            }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-shark-accent/20 to-transparent blur-3xl"
                        />
                    </div>

                    <div className="relative z-10 flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="relative mb-8"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-shark-accent to-premium-neon flex items-center justify-center shadow-[0_0_50px_rgba(0,210,255,0.3)]"
                            >
                                <ShieldAlert size={48} className="text-shark-deep" />
                            </motion.div>

                            {/* Orbital Ring */}
                            <motion.div
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute -inset-4 border border-shark-accent/20 rounded-full border-dashed"
                            />
                        </motion.div>

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                            className="text-center"
                        >
                            <h2 className="text-2xl font-black font-sora tracking-[0.2em] mb-2">
                                SHARK <span className="font-light text-shark-silver">TECHNOLOGYS</span>
                            </h2>
                            <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden mx-auto">
                                <motion.div
                                    initial={{ x: "-100%" }}
                                    animate={{ x: "100%" }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                    className="w-1/2 h-full bg-shark-accent shadow-[0_0_15px_rgba(0,210,255,0.8)]"
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute bottom-10 left-10 text-[10px] uppercase tracking-[0.5em] text-white/20 font-bold">
                        Securing the Future // 2026
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default Preloader
