import { 
  MessageCircle,
  Send,
  Plus,
  ArrowLeft,
  Search,
  Menu
} from "lucide-react";
import { useState } from "react";

interface Message {
  id: number;
  text: string;
  isAgent: boolean;
  timestamp: Date;
}

interface Chat {
  id: number;
  title: string;
  messages: Message[];
  lastMessage: string;
  lastMessageTime: Date;
  isActive: boolean;
}

export default function Assistance() {
    const [vueActuelle, setVueActuelle] = useState<'main' | 'chat'>('main');
    const [conversations, setConversations] = useState<Chat[]>([
        {
            id: 1,
            title: "Support Général",
            messages: [
                { id: 1, text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?", isAgent: true, timestamp: new Date() }
            ],
            lastMessage: "Bonjour ! Je suis votre assistant virtuel...",
            lastMessageTime: new Date(),
            isActive: false
        }
    ]);
    const [conversationActuelle, setConversationActuelle] = useState<number | null>(null);
    const [nouveauMessage, setNouveauMessage] = useState("");
    const [afficherListe, setAfficherListe] = useState(false);

    const conversation = conversations.find(conv => conv.id === conversationActuelle);

    const envoyerMessage = () => {
        if (nouveauMessage.trim() && conversationActuelle) {
            const messageUtilisateur = {
                id: Date.now(),
                text: nouveauMessage,
                isAgent: false,
                timestamp: new Date()
            };

            setConversations(prevConversations => prevConversations.map(conv => {
                if (conv.id === conversationActuelle) {
                    return {
                        ...conv,
                        messages: [...conv.messages, messageUtilisateur],
                        lastMessage: nouveauMessage,
                        lastMessageTime: new Date()
                    };
                }
                return conv;
            }));

            setNouveauMessage("");

            // Simuler une réponse de l'agent
            setTimeout(() => {
                const messageAgent = {
                    id: Date.now() + 1,
                    text: "Merci pour votre message. Un agent va vous répondre dans les plus brefs délais.",
                    isAgent: true,
                    timestamp: new Date()
                };

                setConversations(prevConversations => prevConversations.map(conv => {
                    if (conv.id === conversationActuelle) {
                        return {
                            ...conv,
                            messages: [...conv.messages, messageAgent],
                            lastMessage: messageAgent.text,
                            lastMessageTime: new Date()
                        };
                    }
                    return conv;
                }));
            }, 1000);
        }
    };

    const gererTouche = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            envoyerMessage();
        }
    };

    const creerNouvelleConversation = () => {
        const nouvelleConv: Chat = {
            id: Date.now(),
            title: `Support ${conversations.length + 1}`,
            messages: [
                { id: 1, text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?", isAgent: true, timestamp: new Date() }
            ],
            lastMessage: "Bonjour ! Je suis votre assistant virtuel...",
            lastMessageTime: new Date(),
            isActive: true
        };

        setConversations(prevConversations => prevConversations.map(conv => ({ ...conv, isActive: false })).concat(nouvelleConv));
        setConversationActuelle(nouvelleConv.id);
        setAfficherListe(false); // Hide chat list on mobile after creating new chat
    };

    const selectionnerConversation = (convId: number) => {
        setConversations(prevConversations => prevConversations.map(conv => ({ ...conv, isActive: conv.id === convId })));
        setConversationActuelle(convId);
        setAfficherListe(false); // Hide chat list on mobile after selecting chat
    };

    const formaterHeure = (date: Date) => {
        const maintenant = new Date();
        const diffHeures = (maintenant.getTime() - date.getTime()) / (1000 * 60 * 60);
        
        if (diffHeures < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffHeures < 48) {
            return 'Hier';
        } else {
            return date.toLocaleDateString();
        }
    };

    if (vueActuelle === 'chat') {
        return (
            <div className="h-[calc(100vh-80px)] md:h-[calc(100vh-120px)] bg-gray-50 rounded-lg md:rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-2 md:p-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <button 
                                onClick={() => setVueActuelle('main')}
                                className="p-1 md:p-1.5 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft className="w-4 h-4" />
                            </button>
                            <h1 className="text-base md:text-lg font-semibold text-gray-900">Support en ligne</h1>
                        </div>
                        <div className="flex items-center space-x-1">
                            {/* Mobile menu button */}
                            <button 
                                onClick={() => setAfficherListe(!afficherListe)}
                                className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
                            >
                                <Menu className="w-4 h-4" />
                            </button>
                            <button 
                                onClick={creerNouvelleConversation}
                                className="p-1 md:p-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex h-[calc(100%-50px)] md:h-[calc(100%-60px)]">
                    {/* Chat List - Mobile overlay */}
                    <div className={`${afficherListe ? 'block' : 'hidden'} md:block w-full md:w-72 bg-white border-r border-gray-200 absolute md:relative z-20 h-full shadow-lg md:shadow-none`}>
                        <div className="p-2 md:p-3 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un chat..."
                                    className="w-full pl-8 pr-3 py-1.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto h-full">
                            {conversations.map((conv) => (
                                <div
                                    key={conv.id}
                                    onClick={() => selectionnerConversation(conv.id)}
                                    className={`p-2 md:p-3 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                        conv.isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900 text-sm">{conv.title}</h3>
                                        <span className="text-xs text-gray-500">{formaterHeure(conv.lastMessageTime)}</span>
                                    </div>
                                    <p className="text-xs text-gray-600 mt-0.5 truncate">{conv.lastMessage}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 flex flex-col">
                        {conversation ? (
                            <>
                                {/* Chat Header */}
                                <div className="bg-white border-b border-gray-200 p-2 md:p-3">
                                    <div className="flex items-center justify-between">
                                        <button 
                                            onClick={() => setAfficherListe(true)}
                                            className="md:hidden p-1 hover:bg-gray-100 rounded-lg"
                                        >
                                            <ArrowLeft className="w-4 h-4" />
                                        </button>
                                        <h2 className="font-semibold text-gray-900 text-sm">{conversation.title}</h2>
                                        <div className="md:hidden w-8"></div> {/* Spacer for centering on mobile */}
                                    </div>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-2">
                                    {conversation.messages.map((message) => (
                                        <div 
                                            key={message.id} 
                                            className={`flex ${message.isAgent ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div 
                                                className={`max-w-[85%] md:max-w-xs p-2 md:p-2.5 rounded-lg ${
                                                    message.isAgent 
                                                        ? 'bg-gray-100 text-gray-900' 
                                                        : 'bg-blue-600 text-white'
                                                }`}
                                            >
                                                <p className="text-xs">{message.text}</p>
                                                <p className={`text-xs mt-0.5 ${
                                                    message.isAgent ? 'text-gray-500' : 'text-blue-100'
                                                }`}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="bg-white border-t border-gray-200 p-2 md:p-3">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={nouveauMessage}
                                            onChange={(e) => setNouveauMessage(e.target.value)}
                                            onKeyPress={gererTouche}
                                            placeholder="Tapez votre message..."
                                            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                                        />
                                        <button
                                            onClick={envoyerMessage}
                                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Send className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center p-4">
                                    <MessageCircle className="w-10 h-10 md:w-12 md:h-12 text-gray-300 mx-auto mb-2 md:mb-3" />
                                    <h3 className="text-sm md:text-base font-medium text-gray-900 mb-1 md:mb-2">Sélectionnez un chat</h3>
                                    <p className="text-xs md:text-sm text-gray-600">Choisissez une conversation ou créez-en une nouvelle</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-3 md:space-y-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Assistance</h2>
            <p className="text-xs md:text-sm text-gray-600">Centre d'aide et support utilisateur</p>
          </div>
          <div className="bg-white rounded-lg md:rounded-xl shadow-sm border border-gray-200 p-3 md:p-4">
            <div className="space-y-2 md:space-y-3">
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                <h3 className="text-sm md:text-base font-semibold text-gray-900">Support en ligne</h3>
              </div>
              <p className="text-xs md:text-sm text-gray-600">Besoin d'aide ? Notre équipe est là pour vous accompagner.</p>
              <div className="space-y-1.5 md:space-y-2">
                <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-0.5 md:mb-1 text-xs md:text-sm">FAQ</h4>
                  <p className="text-xs text-gray-600">Consultez nos questions fréquemment posées</p>
                </div>
                <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-0.5 md:mb-1 text-xs md:text-sm">Contact</h4>
                  <p className="text-xs text-gray-600">Contactez notre équipe support</p>
                </div>
                <div className="p-2 md:p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-0.5 md:mb-1 text-xs md:text-sm">Documentation</h4>
                  <p className="text-xs text-gray-600">Guide d'utilisation et tutoriels</p>
                </div>
                <button 
                  onClick={() => setVueActuelle('chat')}
                  className="w-full p-2 md:p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-xs md:text-sm"
                >
                  Échanger avec un agent
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}