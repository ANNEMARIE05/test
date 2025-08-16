import React, { useState, useEffect } from 'react';
import { 
    MessageSquare as MessageIcon, 
    ArrowLeft as ReplyIcon, 
    User as PersonIcon,
    Mail as EmailIcon,
    Phone as PhoneIcon,
    X as CloseIcon,
    Search as SearchIcon,
    Plus,
    AlertCircle,
    Clock,
    CheckCircle,
    Mail
} from 'lucide-react';

interface Message {
    id: string;
    sujet: string;
    contenu: string;
    expediteur: {
        nom: string;
        email: string;
        telephone?: string;
    };
    horodatage: Date;
    statut: 'nouveau' | 'en-cours' | 'resolu';
    priorite: 'faible' | 'moyenne' | 'elevee';
    reponses?: Reponse[];
}

interface Reponse {
    id: string;
    contenu: string;
    expediteur: 'admin' | 'utilisateur';
    horodatage: Date;
}

export default function Support() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [messageSelectionne, setMessageSelectionne] = useState<Message | null>(null);
    const [dialogueReponseOuvert, setDialogueReponseOuvert] = useState(false);
    const [dialogueNouveauOuvert, setDialogueNouveauOuvert] = useState(false);
    const [contenuReponse, setContenuReponse] = useState('');
    const [nouveauMessage, setNouveauMessage] = useState({
        sujet: '',
        contenu: '',
        destinataire: ''
    });
    const [termeRecherche, setTermeRecherche] = useState('');
    const [filtreStatut, setFiltreStatut] = useState<string>('tous');

    // Mock data - replace with actual API calls
    useEffect(() => {
        const messagesSimules: Message[] = [
            {
                id: '1',
                sujet: 'Problème avec la connexion',
                contenu: 'Je n\'arrive pas à me connecter à mon compte depuis hier. Pouvez-vous m\'aider ?',
                expediteur: {
                    nom: 'Jean Dupont',
                    email: 'jean.dupont@email.com',
                    telephone: '0123456789'
                },
                horodatage: new Date('2024-01-15T10:30:00'),
                statut: 'nouveau',
                priorite: 'elevee',
                reponses: []
            },
            {
                id: '2',
                sujet: 'Question sur les fonctionnalités',
                contenu: 'Bonjour, j\'aimerais savoir comment utiliser la nouvelle fonctionnalité de reporting.',
                expediteur: {
                    nom: 'Marie Martin',
                    email: 'marie.martin@email.com'
                },
                horodatage: new Date('2024-01-14T15:45:00'),
                statut: 'en-cours',
                priorite: 'moyenne',
                reponses: [
                    {
                        id: 'resp1',
                        contenu: 'Bonjour Marie, je vais vous expliquer comment utiliser cette fonctionnalité...',
                        expediteur: 'admin',
                        horodatage: new Date('2024-01-14T16:00:00')
                    }
                ]
            },
            {
                id: '3',
                sujet: 'Demande de modification',
                contenu: 'Serait-il possible d\'ajouter une option pour exporter les données en PDF ?',
                expediteur: {
                    nom: 'Pierre Durand',
                    email: 'pierre.durand@email.com',
                    telephone: '0987654321'
                },
                horodatage: new Date('2024-01-13T09:15:00'),
                statut: 'resolu',
                priorite: 'faible',
                reponses: [
                    {
                        id: 'resp2',
                        contenu: 'Merci pour votre suggestion. Cette fonctionnalité est en cours de développement.',
                        expediteur: 'admin',
                        horodatage: new Date('2024-01-13T10:00:00')
                    }
                ]
            }
        ];
        setMessages(messagesSimules);
    }, []);

    const obtenirCouleurStatut = (statut: string) => {
        switch (statut) {
            case 'nouveau': return 'bg-red-500';
            case 'en-cours': return 'bg-yellow-500';
            case 'resolu': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const obtenirIconeStatut = (statut: string) => {
        switch (statut) {
            case 'nouveau': return <AlertCircle size={12} className="sm:w-3 sm:h-3" />;
            case 'en-cours': return <Clock size={12} className="sm:w-3 sm:h-3" />;
            case 'resolu': return <CheckCircle size={12} className="sm:w-3 sm:h-3" />;
            default: return <Mail size={12} className="sm:w-3 sm:h-3" />;
        }
    };

    const messagesFiltres = messages.filter(message => {
        const correspondRecherche = message.sujet.toLowerCase().includes(termeRecherche.toLowerCase()) ||
                            message.expediteur.nom.toLowerCase().includes(termeRecherche.toLowerCase());
        const correspondStatut = filtreStatut === 'tous' || message.statut === filtreStatut;
        return correspondRecherche && correspondStatut;
    });

    const gererReponse = () => {
        if (messageSelectionne && contenuReponse.trim()) {
            const nouvelleReponse: Reponse = {
                id: Date.now().toString(),
                contenu: contenuReponse,
                expediteur: 'admin',
                horodatage: new Date()
            };

            const messageMisAJour = {
                ...messageSelectionne,
                statut: 'en-cours' as const,
                reponses: [...(messageSelectionne.reponses || []), nouvelleReponse]
            };

            setMessages(messages.map(msg => 
                msg.id === messageSelectionne.id ? messageMisAJour : msg
            ));
            setMessageSelectionne(messageMisAJour);
            setContenuReponse('');
            setDialogueReponseOuvert(false);
        }
    };

    const gererEnvoiNouveau = () => {
        if (nouveauMessage.sujet.trim() && nouveauMessage.contenu.trim() && nouveauMessage.destinataire.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                sujet: nouveauMessage.sujet,
                contenu: nouveauMessage.contenu,
                expediteur: {
                    nom: 'Administrateur',
                    email: 'admin@company.com'
                },
                horodatage: new Date(),
                statut: 'nouveau',
                priorite: 'moyenne',
                reponses: []
            };

            setMessages([message, ...messages]);
            setNouveauMessage({ sujet: '', contenu: '', destinataire: '' });
            setDialogueNouveauOuvert(false);
        }
    };

    return (
        <div className="space-y-1 sm:space-y-2 md:space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-2">
                <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-0.5 sm:mb-1">Support Center</h2>
                <p className="text-xs sm:text-sm md:text-base text-gray-600">Gérez les demandes de support de vos utilisateurs</p>
                </div>
                <button 
                    onClick={() => setDialogueNouveauOuvert(true)}
                    className="flex items-center justify-center space-x-1 sm:space-x-1.5 px-1.5 sm:px-2.5 md:px-3 py-1 sm:py-1.5 md:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm md:text-base">
                <Plus className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">Nouveau Message</span>
                    <span className="sm:hidden">Nouveau</span>
                </button>
            </div>

            {/* Filters */}
            <div className="flex gap-1 sm:gap-1.5 mb-1.5 sm:mb-2 flex-wrap">
                <div className="relative flex-1 min-w-[120px] sm:min-w-[150px]">
                    <SearchIcon 
                        size={10} 
                        className="absolute left-1.5 top-1/2 transform -translate-y-1/2 text-gray-400 sm:left-2 sm:w-3 sm:h-3" 
                    />
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={termeRecherche}
                        onChange={(e) => setTermeRecherche(e.target.value)}
                        className="w-full py-1 sm:py-1.5 pl-5 sm:pl-6 pr-2 border border-gray-200 rounded-md text-xs sm:text-sm bg-white transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={filtreStatut}
                    onChange={(e) => setFiltreStatut(e.target.value)}
                    className="py-1 sm:py-1.5 px-1.5 sm:px-2 border border-gray-200 rounded-md text-xs sm:text-sm bg-white cursor-pointer min-w-[70px] sm:min-w-[80px] transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="tous">Tous</option>
                    <option value="nouveau">Nouveau</option>
                    <option value="en-cours">En cours</option>
                    <option value="resolu">Résolu</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5 sm:gap-2 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
                {/* Liste des messages */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-1.5 sm:p-2 border-b border-gray-200 bg-gray-50">
                        <h3 className="m-0 text-xs sm:text-sm font-semibold text-gray-700">
                            Messages ({messagesFiltres.length})
                        </h3>
                    </div>
                    <div className="overflow-auto h-[calc(100%-35px)] sm:h-[calc(100%-40px)]">
                        {messagesFiltres.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-16 sm:h-20 text-gray-400">
                                <MessageIcon size={16} className="sm:w-5 sm:h-5" />
                                <p className="mt-1 sm:mt-1.5 mb-0 text-xs sm:text-sm">Aucun message trouvé</p>
                            </div>
                        ) : (
                            messagesFiltres.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-1.5 sm:p-2 border-b border-gray-100 cursor-pointer transition-all duration-200 border-l-3 ${
                                        messageSelectionne?.id === message.id 
                                            ? 'bg-blue-50 border-l-blue-500' 
                                            : 'border-l-transparent hover:bg-gray-50'
                                    }`}
                                    onClick={() => setMessageSelectionne(message)}
                                >
                                    <div className="flex items-start gap-1.5 sm:gap-2">
                                        <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs sm:text-sm">
                                            {obtenirIconeStatut(message.statut)}
                                            {message.reponses && message.reponses.length > 0 && (
                                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full w-2.5 h-2.5 sm:w-3 sm:h-3 text-[8px] sm:text-[9px] flex items-center justify-center font-semibold border border-white">
                                                    {message.reponses.length}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-0.5 mb-0.5 flex-wrap">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0">
                                                    {message.sujet}
                                                </span>
                                                <span className={`${obtenirCouleurStatut(message.statut)} text-white px-0.5 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold uppercase`}>
                                                    {message.statut}
                                                </span>
                                            </div>
                                            <div className="text-[10px] sm:text-[11px] text-gray-500 mb-0.5 font-medium">
                                                {message.expediteur.nom}
                                            </div>
                                            <div className="text-[9px] sm:text-[10px] text-gray-400">
                                                {message.horodatage.toLocaleDateString('fr-FR', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* Détails du message sélectionné */}
                <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                    {messageSelectionne ? (
                        <>
                            <div className="p-1.5 sm:p-2 border-b border-gray-200 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="m-0 mb-1 sm:mb-1.5 text-sm sm:text-base font-bold text-gray-900">
                                            {messageSelectionne.sujet}
                                        </h3>
                                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                                            <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                <PersonIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                    {messageSelectionne.expediteur.nom}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                <EmailIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                    {messageSelectionne.expediteur.email}
                                                </span>
                                            </div>
                                            {messageSelectionne.expediteur.telephone && (
                                                <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                    <PhoneIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                    <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                        {messageSelectionne.expediteur.telephone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="bg-transparent border-none cursor-pointer p-0.5 rounded text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                                        onClick={() => setMessageSelectionne(null)}
                                    >
                                        <CloseIcon size={10} className="sm:w-3 sm:h-3" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-auto p-1.5 sm:p-2 bg-slate-50">
                                {/* Message original */}
                                <div className="bg-white p-1.5 sm:p-2 rounded-md mb-1.5 sm:mb-2 border border-gray-200 shadow-sm">
                                    <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                                            {messageSelectionne.expediteur.nom.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                                                {messageSelectionne.expediteur.nom}
                                            </div>
                                            <div className="text-[10px] sm:text-[11px] text-gray-500">
                                                {messageSelectionne.horodatage.toLocaleString('fr-FR')}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
                                        {messageSelectionne.contenu}
                                    </p>
                                </div>

                                {/* Réponses */}
                                {messageSelectionne.reponses?.map((reponse) => (
                                    <div 
                                        key={reponse.id} 
                                        className={`${
                                            reponse.expediteur === 'admin' ? 'bg-white ml-2 sm:ml-3' : 'bg-gray-100 mr-2 sm:mr-3'
                                        } p-1.5 sm:p-2 rounded-md mb-1.5 sm:mb-2 border border-gray-200 shadow-sm relative`}
                                    >
                                        {reponse.expediteur === 'admin' && (
                                            <div className="absolute -top-0.5 left-1 sm:left-2 bg-blue-500 text-white px-0.5 sm:px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold">
                                                Admin
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm ${
                                                reponse.expediteur === 'admin' 
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                            }`}>
                                                {reponse.expediteur === 'admin' ? 'A' : messageSelectionne.expediteur.nom.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                                                    {reponse.expediteur === 'admin' ? 'Administrateur' : messageSelectionne.expediteur.nom}
                                                </div>
                                                <div className="text-[10px] sm:text-[11px] text-gray-500">
                                                    {reponse.horodatage.toLocaleString('fr-FR')}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
                                            {reponse.contenu}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-1.5 sm:p-2 border-t border-gray-200 bg-gray-50">
                                <button
                                    className="bg-blue-500 text-white border-none py-1.5 sm:py-2 px-2 sm:px-3 rounded-md cursor-pointer w-full flex items-center justify-center gap-0.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                    onClick={() => setDialogueReponseOuvert(true)}
                                >
                                    <ReplyIcon size={10} className="sm:w-3 sm:h-3" />
                                    Répondre
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 p-3 sm:p-4">
                            <MessageIcon size={24} className="mb-1.5 sm:mb-2 sm:w-7 sm:h-7" />
                            <h3 className="m-0 mb-0.5 sm:mb-1 text-sm sm:text-base font-semibold text-gray-500">
                                Sélectionnez un message
                            </h3>
                            <p className="m-0 text-xs sm:text-sm text-center max-w-[160px] sm:max-w-[180px]">
                                Choisissez un message dans la liste pour voir les détails et répondre
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Dialog de réponse */}
            {dialogueReponseOuvert && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-1.5 sm:p-3">
                    <div className="bg-white rounded-xl p-2.5 sm:p-4 w-full max-w-[350px] sm:max-w-[400px] max-h-[50vh] sm:max-h-[45vh] overflow-auto shadow-xl border border-gray-200">
                        <h2 className="m-0 mb-1.5 sm:mb-2 text-sm sm:text-base font-bold text-gray-900">
                            Répondre au message
                        </h2>
                        <textarea
                            className="w-full min-h-[70px] sm:min-h-[80px] p-1.5 sm:p-2 border border-gray-200 rounded-md text-sm sm:text-base font-inherit resize-y transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Votre réponse..."
                            value={contenuReponse}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContenuReponse(e.target.value)}
                            autoFocus
                        />
                        <div className="flex gap-1 justify-end mt-1.5 sm:mt-2">
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border border-gray-200 bg-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                                onClick={() => setDialogueReponseOuvert(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border-none bg-blue-500 text-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                onClick={gererReponse}
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dialog nouveau message */}
            {dialogueNouveauOuvert && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-1.5 sm:p-3">
                    <div className="bg-white rounded-xl p-2.5 sm:p-4 w-full max-w-[350px] sm:max-w-[400px] max-h-[50vh] sm:max-h-[45vh] overflow-auto shadow-xl border border-gray-200">
                        <h2 className="m-0 mb-1.5 sm:mb-2 text-sm sm:text-base font-bold text-gray-900">
                            Nouveau Message
                        </h2>
                        <input
                            className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md text-xs sm:text-sm mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Destinataire"
                            value={nouveauMessage.destinataire}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNouveauMessage({...nouveauMessage, destinataire: e.target.value})}
                            autoFocus
                        />
                        <input
                            className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md text-xs sm:text-sm mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Sujet"
                            value={nouveauMessage.sujet}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNouveauMessage({...nouveauMessage, sujet: e.target.value})}
                        />
                        <textarea
                            className="w-full min-h-[70px] sm:min-h-[80px] p-1.5 sm:p-2 border border-gray-200 rounded-md text-sm sm:text-base font-inherit resize-y mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Message"
                            value={nouveauMessage.contenu}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNouveauMessage({...nouveauMessage, contenu: e.target.value})}
                        />
                        <div className="flex gap-1 justify-end">
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border border-gray-200 bg-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                                onClick={() => setDialogueNouveauOuvert(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border-none bg-blue-500 text-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                onClick={gererEnvoiNouveau}
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}