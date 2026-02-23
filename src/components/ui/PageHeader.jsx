import { motion } from 'framer-motion'

const PageHeader = ({ title, subtitle, tag, image }) => {
    return (
        <div className="relative mb-24 pt-10">
            <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="flex-grow">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4 text-shark-accent mb-6"
                    >
                        <span className="h-px w-12 bg-shark-accent" />
                        <span className="text-xs font-bold uppercase tracking-[0.3em] font-outfit">{tag}</span>
                    </motion.div>

                    <div className="relative">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "circOut" }}
                            className="text-5xl md:text-8xl font-black font-sora leading-tight"
                        >
                            {title} <br />
                            <span className="fluid-text">{subtitle}</span>
                        </motion.h1>

                        <div className="absolute -top-10 -left-10 text-[150px] font-black text-white/[0.02] pointer-events-none select-none whitespace-nowrap -z-10 uppercase">
                            {tag}
                        </div>
                    </div>
                </div>

                {image && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        className="relative hidden lg:block"
                    >
                        <div className="w-[450px] h-[300px] rounded-[40px] overflow-hidden border border-white/10 relative group">
                            <img src={image} alt={title} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-shark-deep via-transparent to-transparent" />
                            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-shark-deep to-transparent" />

                            {/* Cyber elements */}
                            <div className="absolute top-4 right-4 w-12 h-12 border-t border-r border-shark-accent/30" />
                            <div className="absolute bottom-4 left-4 w-12 h-12 border-b border-l border-shark-accent/30" />
                        </div>

                        {/* Decorative glow */}
                        <div className="absolute -inset-4 bg-shark-accent/5 blur-3xl -z-10" />
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default PageHeader
