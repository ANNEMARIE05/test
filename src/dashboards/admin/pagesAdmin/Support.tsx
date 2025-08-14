import React, { useState, useEffect } from 'react';
import { 
    MessageSquare as MessageIcon, 
    ArrowLeft as ReplyIcon, 
    User as PersonIcon,
    Mail as EmailIcon,
    Phone as PhoneIcon,
    X as CloseIcon,
    Search as SearchIcon,
    Plus
} from 'lucide-react';

interface Message {
    id: string;
    subject: string;
    content: string;
    sender: {
        name: string;
        email: string;
        phone?: string;
    };
    timestamp: Date;
    status: 'new' | 'in-progress' | 'resolved';
    priority: 'low' | 'medium' | 'high';
    responses?: Response[];
}

interface Response {
    id: string;
    content: string;
    sender: 'admin' | 'user';
    timestamp: Date;
}

export default function Support() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
    const [replyDialogOpen, setReplyDialogOpen] = useState(false);
    const [newMessageDialogOpen, setNewMessageDialogOpen] = useState(false);
    const [replyContent, setReplyContent] = useState('');
    const [newMessage, setNewMessage] = useState({
        subject: '',
        content: '',
        recipient: ''
    });
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    // Mock data - replace with actual API calls
    useEffect(() => {
        const mockMessages: Message[] = [
            {
                id: '1',
                subject: 'Problème avec la connexion',
                content: 'Je n\'arrive pas à me connecter à mon compte depuis hier. Pouvez-vous m\'aider ?',
                sender: {
                    name: 'Jean Dupont',
                    email: 'jean.dupont@email.com',
                    phone: '0123456789'
                },
                timestamp: new Date('2024-01-15T10:30:00'),
                status: 'new',
                priority: 'high',
                responses: []
            },
            {
                id: '2',
                subject: 'Question sur les fonctionnalités',
                content: 'Bonjour, j\'aimerais savoir comment utiliser la nouvelle fonctionnalité de reporting.',
                sender: {
                    name: 'Marie Martin',
                    email: 'marie.martin@email.com'
                },
                timestamp: new Date('2024-01-14T15:45:00'),
                status: 'in-progress',
                priority: 'medium',
                responses: [
                    {
                        id: 'resp1',
                        content: 'Bonjour Marie, je vais vous expliquer comment utiliser cette fonctionnalité...',
                        sender: 'admin',
                        timestamp: new Date('2024-01-14T16:00:00')
                    }
                ]
            },
            {
                id: '3',
                subject: 'Demande de modification',
                content: 'Serait-il possible d\'ajouter une option pour exporter les données en PDF ?',
                sender: {
                    name: 'Pierre Durand',
                    email: 'pierre.durand@email.com',
                    phone: '0987654321'
                },
                timestamp: new Date('2024-01-13T09:15:00'),
                status: 'resolved',
                priority: 'low',
                responses: [
                    {
                        id: 'resp2',
                        content: 'Merci pour votre suggestion. Cette fonctionnalité est en cours de développement.',
                        sender: 'admin',
                        timestamp: new Date('2024-01-13T10:00:00')
                    }
                ]
            }
        ];
        setMessages(mockMessages);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'new': return 'bg-red-500';
            case 'in-progress': return 'bg-yellow-500';
            case 'resolved': return 'bg-green-500';
            default: return 'bg-gray-500';
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'new': return '🆕';
            case 'in-progress': return '⏳';
            case 'resolved': return '✅';
            default: return '📧';
        }
    };

    const filteredMessages = messages.filter(message => {
        const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            message.sender.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleReply = () => {
        if (selectedMessage && replyContent.trim()) {
            const newResponse: Response = {
                id: Date.now().toString(),
                content: replyContent,
                sender: 'admin',
                timestamp: new Date()
            };

            const updatedMessage = {
                ...selectedMessage,
                status: 'in-progress' as const,
                responses: [...(selectedMessage.responses || []), newResponse]
            };

            setMessages(messages.map(msg => 
                msg.id === selectedMessage.id ? updatedMessage : msg
            ));
            setSelectedMessage(updatedMessage);
            setReplyContent('');
            setReplyDialogOpen(false);
        }
    };

    const handleSendNewMessage = () => {
        if (newMessage.subject.trim() && newMessage.content.trim() && newMessage.recipient.trim()) {
            const message: Message = {
                id: Date.now().toString(),
                subject: newMessage.subject,
                content: newMessage.content,
                sender: {
                    name: 'Administrateur',
                    email: 'admin@company.com'
                },
                timestamp: new Date(),
                status: 'new',
                priority: 'medium',
                responses: []
            };

            setMessages([message, ...messages]);
            setNewMessage({ subject: '', content: '', recipient: '' });
            setNewMessageDialogOpen(false);
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
                    onClick={() => setNewMessageDialogOpen(true)}
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full py-1 sm:py-1.5 pl-5 sm:pl-6 pr-2 border border-gray-200 rounded-md text-xs sm:text-sm bg-white transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
                <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="py-1 sm:py-1.5 px-1.5 sm:px-2 border border-gray-200 rounded-md text-xs sm:text-sm bg-white cursor-pointer min-w-[70px] sm:min-w-[80px] transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                    <option value="all">Tous</option>
                    <option value="new">Nouveau</option>
                    <option value="in-progress">En cours</option>
                    <option value="resolved">Résolu</option>
                </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-1.5 sm:gap-2 h-[calc(100vh-120px)] sm:h-[calc(100vh-140px)]">
                {/* Liste des messages */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-1.5 sm:p-2 border-b border-gray-200 bg-gray-50">
                        <h3 className="m-0 text-xs sm:text-sm font-semibold text-gray-700">
                            Messages ({filteredMessages.length})
                        </h3>
                    </div>
                    <div className="overflow-auto h-[calc(100%-35px)] sm:h-[calc(100%-40px)]">
                        {filteredMessages.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-16 sm:h-20 text-gray-400">
                                <MessageIcon size={16} className="sm:w-5 sm:h-5" />
                                <p className="mt-1 sm:mt-1.5 mb-0 text-xs sm:text-sm">Aucun message trouvé</p>
                            </div>
                        ) : (
                            filteredMessages.map((message) => (
                                <div
                                    key={message.id}
                                    className={`p-1.5 sm:p-2 border-b border-gray-100 cursor-pointer transition-all duration-200 border-l-3 ${
                                        selectedMessage?.id === message.id 
                                            ? 'bg-blue-50 border-l-blue-500' 
                                            : 'border-l-transparent hover:bg-gray-50'
                                    }`}
                                    onClick={() => setSelectedMessage(message)}
                                >
                                    <div className="flex items-start gap-1.5 sm:gap-2">
                                        <div className="relative w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-md flex items-center justify-center text-white text-xs sm:text-sm">
                                            {getStatusIcon(message.status)}
                                            {message.responses && message.responses.length > 0 && (
                                                <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white rounded-full w-2.5 h-2.5 sm:w-3 sm:h-3 text-[8px] sm:text-[9px] flex items-center justify-center font-semibold border border-white">
                                                    {message.responses.length}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center gap-0.5 mb-0.5 flex-wrap">
                                                <span className="text-xs sm:text-sm font-semibold text-gray-900 overflow-hidden text-ellipsis whitespace-nowrap flex-1 min-w-0">
                                                    {message.subject}
                                                </span>
                                                <span className={`${getStatusColor(message.status)} text-white px-0.5 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold uppercase`}>
                                                    {message.status}
                                                </span>
                                            </div>
                                            <div className="text-[10px] sm:text-[11px] text-gray-500 mb-0.5 font-medium">
                                                {message.sender.name}
                                            </div>
                                            <div className="text-[9px] sm:text-[10px] text-gray-400">
                                                {message.timestamp.toLocaleDateString('fr-FR', {
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
                    {selectedMessage ? (
                        <>
                            <div className="p-1.5 sm:p-2 border-b border-gray-200 bg-gray-50">
                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h3 className="m-0 mb-1 sm:mb-1.5 text-sm sm:text-base font-bold text-gray-900">
                                            {selectedMessage.subject}
                                        </h3>
                                        <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                                            <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                <PersonIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                    {selectedMessage.sender.name}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                <EmailIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                    {selectedMessage.sender.email}
                                                </span>
                                            </div>
                                            {selectedMessage.sender.phone && (
                                                <div className="flex items-center gap-0.5 px-1 sm:px-1.5 py-0.5 bg-white rounded border border-gray-200">
                                                    <PhoneIcon size={8} className="text-gray-500 sm:w-2.5 sm:h-2.5" />
                                                    <span className="text-[10px] sm:text-[11px] text-gray-700 font-medium">
                                                        {selectedMessage.sender.phone}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <button
                                        className="bg-transparent border-none cursor-pointer p-0.5 rounded text-gray-500 transition-all duration-200 hover:bg-gray-100 hover:text-gray-700"
                                        onClick={() => setSelectedMessage(null)}
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
                                            {selectedMessage.sender.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                                                {selectedMessage.sender.name}
                                            </div>
                                            <div className="text-[10px] sm:text-[11px] text-gray-500">
                                                {selectedMessage.timestamp.toLocaleString('fr-FR')}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
                                        {selectedMessage.content}
                                    </p>
                                </div>

                                {/* Réponses */}
                                {selectedMessage.responses?.map((response) => (
                                    <div 
                                        key={response.id} 
                                        className={`${
                                            response.sender === 'admin' ? 'bg-white ml-2 sm:ml-3' : 'bg-gray-100 mr-2 sm:mr-3'
                                        } p-1.5 sm:p-2 rounded-md mb-1.5 sm:mb-2 border border-gray-200 shadow-sm relative`}
                                    >
                                        {response.sender === 'admin' && (
                                            <div className="absolute -top-0.5 left-1 sm:left-2 bg-blue-500 text-white px-0.5 sm:px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-semibold">
                                                Admin
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1 sm:gap-1.5 mb-1 sm:mb-1.5">
                                            <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm ${
                                                response.sender === 'admin' 
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                                            }`}>
                                                {response.sender === 'admin' ? 'A' : selectedMessage.sender.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                                                    {response.sender === 'admin' ? 'Administrateur' : selectedMessage.sender.name}
                                                </div>
                                                <div className="text-[10px] sm:text-[11px] text-gray-500">
                                                    {response.timestamp.toLocaleString('fr-FR')}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="m-0 text-sm sm:text-base leading-relaxed text-gray-700">
                                            {response.content}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            <div className="p-1.5 sm:p-2 border-t border-gray-200 bg-gray-50">
                                <button
                                    className="bg-blue-500 text-white border-none py-1.5 sm:py-2 px-2 sm:px-3 rounded-md cursor-pointer w-full flex items-center justify-center gap-0.5 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                    onClick={() => setReplyDialogOpen(true)}
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
            {replyDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-1.5 sm:p-3">
                    <div className="bg-white rounded-xl p-2.5 sm:p-4 w-full max-w-[350px] sm:max-w-[400px] max-h-[50vh] sm:max-h-[45vh] overflow-auto shadow-xl border border-gray-200">
                        <h2 className="m-0 mb-1.5 sm:mb-2 text-sm sm:text-base font-bold text-gray-900">
                            Répondre au message
                        </h2>
                        <textarea
                            className="w-full min-h-[70px] sm:min-h-[80px] p-1.5 sm:p-2 border border-gray-200 rounded-md text-sm sm:text-base font-inherit resize-y transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Votre réponse..."
                            value={replyContent}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setReplyContent(e.target.value)}
                            autoFocus
                        />
                        <div className="flex gap-1 justify-end mt-1.5 sm:mt-2">
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border border-gray-200 bg-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                                onClick={() => setReplyDialogOpen(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border-none bg-blue-500 text-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                onClick={handleReply}
                            >
                                Envoyer
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Dialog nouveau message */}
            {newMessageDialogOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm p-1.5 sm:p-3">
                    <div className="bg-white rounded-xl p-2.5 sm:p-4 w-full max-w-[350px] sm:max-w-[400px] max-h-[50vh] sm:max-h-[45vh] overflow-auto shadow-xl border border-gray-200">
                        <h2 className="m-0 mb-1.5 sm:mb-2 text-sm sm:text-base font-bold text-gray-900">
                            Nouveau Message
                        </h2>
                        <input
                            className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md text-xs sm:text-sm mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Destinataire"
                            value={newMessage.recipient}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage({...newMessage, recipient: e.target.value})}
                            autoFocus
                        />
                        <input
                            className="w-full p-1.5 sm:p-2 border border-gray-200 rounded-md text-xs sm:text-sm mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Sujet"
                            value={newMessage.subject}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewMessage({...newMessage, subject: e.target.value})}
                        />
                        <textarea
                            className="w-full min-h-[70px] sm:min-h-[80px] p-1.5 sm:p-2 border border-gray-200 rounded-md text-sm sm:text-base font-inherit resize-y mb-1.5 sm:mb-2 transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                            placeholder="Message"
                            value={newMessage.content}
                            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewMessage({...newMessage, content: e.target.value})}
                        />
                        <div className="flex gap-1 justify-end">
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border border-gray-200 bg-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold text-gray-700 transition-all duration-300 hover:border-gray-300 hover:bg-gray-50"
                                onClick={() => setNewMessageDialogOpen(false)}
                            >
                                Annuler
                            </button>
                            <button
                                className="py-0.5 sm:py-1 px-1.5 sm:px-2 border-none bg-blue-500 text-white rounded-md cursor-pointer text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                                onClick={handleSendNewMessage}
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