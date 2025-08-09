import { 
  MessageCircle,
  Send,
  Plus,
  ArrowLeft,
  Search
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
    const [currentView, setCurrentView] = useState<'main' | 'chat'>('main');
    const [chats, setChats] = useState<Chat[]>([
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
    const [currentChatId, setCurrentChatId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");

    const currentChat = chats.find(chat => chat.id === currentChatId);

    const handleSendMessage = () => {
        if (newMessage.trim() && currentChatId) {
            const userMessage = {
                id: Date.now(),
                text: newMessage,
                isAgent: false,
                timestamp: new Date()
            };

            setChats(prevChats => prevChats.map(chat => {
                if (chat.id === currentChatId) {
                    return {
                        ...chat,
                        messages: [...chat.messages, userMessage],
                        lastMessage: newMessage,
                        lastMessageTime: new Date()
                    };
                }
                return chat;
            }));

            setNewMessage("");

            // Simuler une réponse de l'agent
            setTimeout(() => {
                const agentMessage = {
                    id: Date.now() + 1,
                    text: "Merci pour votre message. Un agent va vous répondre dans les plus brefs délais.",
                    isAgent: true,
                    timestamp: new Date()
                };

                setChats(prevChats => prevChats.map(chat => {
                    if (chat.id === currentChatId) {
                        return {
                            ...chat,
                            messages: [...chat.messages, agentMessage],
                            lastMessage: agentMessage.text,
                            lastMessageTime: new Date()
                        };
                    }
                    return chat;
                }));
            }, 1000);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const createNewChat = () => {
        const newChat: Chat = {
            id: Date.now(),
            title: `Support ${chats.length + 1}`,
            messages: [
                { id: 1, text: "Bonjour ! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui ?", isAgent: true, timestamp: new Date() }
            ],
            lastMessage: "Bonjour ! Je suis votre assistant virtuel...",
            lastMessageTime: new Date(),
            isActive: true
        };

        setChats(prevChats => prevChats.map(chat => ({ ...chat, isActive: false })).concat(newChat));
        setCurrentChatId(newChat.id);
    };

    const selectChat = (chatId: number) => {
        setChats(prevChats => prevChats.map(chat => ({ ...chat, isActive: chat.id === chatId })));
        setCurrentChatId(chatId);
    };

    const formatTime = (date: Date) => {
        const now = new Date();
        const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Hier';
        } else {
            return date.toLocaleDateString();
        }
    };

    if (currentView === 'chat') {
        return (
            <div className="h-[calc(100vh-120px)] bg-gray-50 rounded-xl border border-gray-200 overflow-hidden">
                {/* Header */}
                <div className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <button 
                                onClick={() => setCurrentView('main')}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">Support en ligne</h1>
                        </div>
                        <button 
                            onClick={createNewChat}
                            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="flex h-[calc(100%-80px)]">
                    {/* Chat List */}
                    <div className="w-80 bg-white border-r border-gray-200">
                        <div className="p-4 border-b border-gray-200">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    placeholder="Rechercher un chat..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="overflow-y-auto h-full">
                            {chats.map((chat) => (
                                <div
                                    key={chat.id}
                                    onClick={() => selectChat(chat.id)}
                                    className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                                        chat.isActive ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-medium text-gray-900">{chat.title}</h3>
                                        <span className="text-xs text-gray-500">{formatTime(chat.lastMessageTime)}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1 truncate">{chat.lastMessage}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="flex-1 flex flex-col">
                        {currentChat ? (
                            <>
                                {/* Chat Header */}
                                <div className="bg-white border-b border-gray-200 p-4">
                                    <h2 className="font-semibold text-gray-900">{currentChat.title}</h2>
                                </div>

                                {/* Messages */}
                                <div className="flex-1 overflow-y-auto p-4 space-y-3">
                                    {currentChat.messages.map((message) => (
                                        <div 
                                            key={message.id} 
                                            className={`flex ${message.isAgent ? 'justify-start' : 'justify-end'}`}
                                        >
                                            <div 
                                                className={`max-w-xs p-3 rounded-lg ${
                                                    message.isAgent 
                                                        ? 'bg-gray-100 text-gray-900' 
                                                        : 'bg-blue-600 text-white'
                                                }`}
                                            >
                                                <p className="text-sm">{message.text}</p>
                                                <p className={`text-xs mt-1 ${
                                                    message.isAgent ? 'text-gray-500' : 'text-blue-100'
                                                }`}>
                                                    {message.timestamp.toLocaleTimeString()}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Message Input */}
                                <div className="bg-white border-t border-gray-200 p-4">
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            value={newMessage}
                                            onChange={(e) => setNewMessage(e.target.value)}
                                            onKeyPress={handleKeyPress}
                                            placeholder="Tapez votre message..."
                                            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <button
                                            onClick={handleSendMessage}
                                            className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <Send className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex items-center justify-center">
                                <div className="text-center">
                                    <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">Sélectionnez un chat</h3>
                                    <p className="text-gray-600">Choisissez une conversation ou créez-en une nouvelle</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Assistance</h2>
            <p className="text-gray-600">Centre d'aide et support utilisateur</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Support en ligne</h3>
              </div>
              <p className="text-gray-600">Besoin d'aide ? Notre équipe est là pour vous accompagner.</p>
              <div className="space-y-3">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">FAQ</h4>
                  <p className="text-sm text-gray-600">Consultez nos questions fréquemment posées</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Contact</h4>
                  <p className="text-sm text-gray-600">Contactez notre équipe support</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Documentation</h4>
                  <p className="text-sm text-gray-600">Guide d'utilisation et tutoriels</p>
                </div>
                <button 
                  onClick={() => setCurrentView('chat')}
                  className="w-full p-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Échanger avec un agent
                </button>
              </div>
            </div>
          </div>
        </div>
      );
}