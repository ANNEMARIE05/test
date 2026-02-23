import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Preloader from './components/ui/Preloader'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Home from './pages/Home'
import Courses from './pages/Courses'
import Blog from './pages/Blog'
import Contact from './pages/Contact'

function App() {
    const location = useLocation()
    const [isLoaded, setIsLoaded] = useState(false)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    // Trigger preloader on every route change
    useEffect(() => {
        if (!isInitialLoad) {
            setIsLoaded(false)
            window.scrollTo(0, 0)
        }
    }, [location.pathname])

    const handleLoadingComplete = () => {
        setIsLoaded(true)
        setIsInitialLoad(false)
    }

    return (
        <div className="min-h-screen flex flex-col selection:bg-shark-accent selection:text-white bg-shark-deep">
            {/* Navbar toujours visible, en dehors des animations de page */}
            <AnimatePresence>
                {isLoaded && <Navbar />}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {!isLoaded && (
                    <Preloader key="preloader" onComplete={handleLoadingComplete} />
                )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
                {isLoaded && (
                    <motion.div
                        key="content"
                        initial={{ opacity: 0, filter: 'blur(10px)' }}
                        animate={{ opacity: 1, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, filter: 'blur(10px)' }}
                        transition={{ duration: 0.5 }}
                        className="flex-grow flex flex-col"
                    >
                        <main className="flex-grow">
                            <Routes location={location} key={location.pathname}>
                                <Route path="/" element={<Home />} />
                                <Route path="/formations" element={<Courses />} />
                                <Route path="/blog" element={<Blog />} />
                                <Route path="/contact" element={<Contact />} />
                            </Routes>
                        </main>
                        <Footer />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default App
