import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, ShieldAlert } from 'lucide-react'

const Footer = () => {
    return (
        <footer className="bg-shark-dark border-t border-white/5 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <div className="flex items-center gap-2 mb-6">
                        <ShieldAlert className="text-shark-accent" size={32} />
                        <span className="text-xl font-black font-sora">
                            SHARK <span className="font-light">TECH</span>
                        </span>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Shark Technologys est une entreprise spécialisée dans la formation informatique destinée à tous les niveaux, des débutants aux professionnels expérimentés.
                    </p>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 font-sora uppercase tracking-tighter">Liens Utiles</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link to="/contact" className="hover:text-shark-accent transition-colors">Contacts</Link></li>
                        <li><Link to="/formations" className="hover:text-shark-accent transition-colors">Formations</Link></li>
                        <li><Link to="/blog" className="hover:text-shark-accent transition-colors">Publications</Link></li>
                        <li><Link to="/" className="hover:text-shark-accent transition-colors">Informations</Link></li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 font-sora uppercase tracking-tighter">Nous contacter</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-center gap-3">
                            <Phone size={16} className="text-shark-accent" />
                            <span>+225 07 12 62 44 37</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail size={16} className="text-shark-accent" />
                            <span>infos@sharktechnologys.ci</span>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 className="text-white font-bold mb-6 font-sora uppercase tracking-tighter">Localisation</h4>
                    <div className="flex items-start gap-3 text-sm text-gray-400">
                        <MapPin size={18} className="text-shark-accent shrink-0" />
                        <p>Cocody Riviera 2, Rue D108<br />Abidjan, Côte d'Ivoire</p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                <p>© Copyright © {new Date().getFullYear()} Shark Technologys. Tous Droits Réservés.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-white transition-colors">Confidentialité</a>
                    <a href="#" className="hover:text-white transition-colors">Mentions Légales</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
