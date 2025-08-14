import React from 'react';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Code, 
  Mail, 
  User, 
  LogOut,
  X,
  Shield,
  MessageCircle,
  Settings,
  History
} from "lucide-react";

export type SidebarItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
  active?: boolean;
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
  items?: SidebarItem[];
  title?: string;
}

export default function Sidebar({ 
  isOpen, 
  onClose, 
  activeSection, 
  onSectionChange, 
  onLogout,
  items = [],
  title = "OCR"
}: SidebarProps) {
  const defaultItems: SidebarItem[] = [
    { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'users', label: 'Gestion utilisateurs', icon: <Users className="w-3.5 h-3.5" /> },
    { id: 'documents', label: 'Gestion documents', icon: <FileText className="w-3.5 h-3.5" /> },
    { id: 'api', label: 'Gestion d\'API', icon: <Code className="w-3.5 h-3.5" /> },
    { id: 'email', label: 'Gestion d\'email', icon: <Mail className="w-3.5 h-3.5" /> },
    { id: 'history', label: 'Historique', icon: <History className="w-3.5 h-3.5" /> },
    { id: 'settings', label: 'Paramètres', icon: <Settings className="w-3.5 h-3.5" /> },
    { id: 'profile', label: 'Profile', icon: <User className="w-3.5 h-3.5" /> },
    { id: 'support', label: 'Support', icon: <MessageCircle className="w-3.5 h-3.5" /> },
  ];

  const sidebarItems = items.length > 0 ? items : defaultItems;

  return (
    <>
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-white shadow-sm">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-sm">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {title}
              </h1>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-2.5 py-4 space-y-0.5 overflow-y-auto">
            {sidebarItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-left transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-r-2 border-blue-500 shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 hover:shadow-sm'
                }`}
              >
                <div className={`p-1 rounded-md ${
                  activeSection === item.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Logout */}
          <div className="p-2.5 border-t border-gray-200 bg-white shadow-sm">
            <button
              onClick={onLogout}
              className="w-full flex items-center space-x-2.5 px-2.5 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-all duration-200 hover:shadow-sm"
            >
              <div className="p-1 rounded-md bg-red-100">
                <LogOut className="w-3.5 h-3.5" />
              </div>
              <span className="font-medium text-sm">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
} 