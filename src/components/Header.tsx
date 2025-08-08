import { 
  Menu,
  Bell,
  Settings,
  User
} from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  title?: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

export default function Header({ 
  onMenuClick, 
  title = "Dashboard",
  user = { name: "Administrateur" }
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-30">
      <div className="flex items-center">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="ml-4 lg:ml-0 text-lg font-semibold text-gray-900 capitalize">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100">
          <Bell className="w-5 h-5" />
        </button>
        <button className="p-2 text-gray-400 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100">
          <Settings className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-sm">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden sm:block">{user.name}</span>
        </div>
      </div>
    </header>
  );
} 