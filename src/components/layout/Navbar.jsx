import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ShieldAlert } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const location = useLocation()

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const navLinks = [
        { name: 'Accueil', path: '/' },
        { name: 'Formations', path: '/formations' },
        { name: 'Blog', path: '/blog' },
        { name: 'Contacts', path: '/contact' },
    ]

    return (
        <nav className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 py-4 bg-shark-deep/90 backdrop-blur-xl border-b border-white/10`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="flex items-center gap-2 group">
                    <motion.div
                        whileHover={{ rotate: 180 }}
                        transition={{ duration: 0.5 }}
                        className="w-10 h-10 bg-gradient-to-tr from-shark-accent to-premium-neon rounded-xl flex items-center justify-center shadow-lg"
                    >
                        <ShieldAlert className="text-shark-deep" size={24} />
                    </motion.div>
                    <span className="text-xl font-black tracking-tighter font-sora group-hover:text-shark-accent transition-colors">
                        SHARK <span className="font-light text-shark-silver">TECHNOLOGYS</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-sm font-semibold uppercase tracking-widest hover:text-shark-accent transition-all relative group ${location.pathname === link.path ? 'text-shark-accent' : 'text-gray-400'}`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-shark-accent transition-all duration-300 group-hover:w-full ${location.pathname === link.path ? 'w-full' : ''}`} />
                        </Link>
                    ))}
                    <div className="flex items-center gap-4 ml-4">
                        <a href="tel:+2250712624437" className="px-4 py-2 border border-shark-accent/30 rounded-full text-xs font-bold hover:bg-shark-accent hover:text-shark-deep transition-all">
                            +225 07 12 62 44 37
                        </a>
                    </div>
                </div>

                {/* Mobile Toggle */}
                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-shark-dark border-b border-white/5 overflow-hidden"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`text-lg font-bold ${location.pathname === link.path ? 'text-shark-accent' : 'text-shark-silver'}`}
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
