import React from 'react';
import { 
  Home, 
  Calculator, 
  Package, 
  ShoppingBag, 
  ShoppingCart, 
  FileText, 
  Settings,
  Building2
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, shortcut: 'Alt + D' },
    { id: 'accounting', label: 'Accounting', icon: Calculator, shortcut: 'Alt + A' },
    { id: 'inventory', label: 'Inventory', icon: Package, shortcut: 'Alt + I' },
    { id: 'sales', label: 'Sales', icon: ShoppingBag, shortcut: 'Alt + S' },
    { id: 'purchase', label: 'Purchase', icon: ShoppingCart, shortcut: 'Alt + P' },
    { id: 'reports', label: 'Reports', icon: FileText, shortcut: 'Alt + R' },
    { id: 'settings', label: 'Settings', icon: Settings, shortcut: 'Alt + T' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-50">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Building2 className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">BusyPro</h1>
            <p className="text-sm text-gray-500">ERP Solution</p>
          </div>
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-200 group ${
                activeTab === item.id
                  ? 'bg-blue-50 border-r-3 border-blue-600 text-blue-700'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
              title={`${item.label} (${item.shortcut})`}
            >
              <div className="flex items-center">
                <IconComponent className="h-5 w-5 mr-3" />
                <span className="font-medium">{item.label}</span>
              </div>
              <kbd className={`px-1.5 py-0.5 text-xs rounded border transition-opacity duration-200 ${
                activeTab === item.id 
                  ? 'bg-blue-100 text-blue-600 border-blue-200 opacity-100' 
                  : 'bg-gray-100 text-gray-500 border-gray-200 opacity-0 group-hover:opacity-100'
              }`}>
                {item.shortcut.replace('Alt + ', '')}
              </kbd>
            </button>
          );
        })}
      </nav>
      
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="text-center">
          <p className="text-xs text-gray-500">© 2025 BusyPro ERP</p>
          <p className="text-xs text-gray-400 mt-1">Version 2.1.0</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;