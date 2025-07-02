'use client'

import { useEffect, useState } from "react";
import Dashboard from "./busy_components/Dashboard";
import Sidebar from "./busy_components/Sidebar";
import Accounting from "./busy_components/Accounting";
import Inventory from "./busy_components/Inventory";
import Sales from "./busy_components/Sales";
import Purchase from "./busy_components/Purchase";
import Reports from "./busy_components/Reports";
import Settings from "./busy_components/Settings";


export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // Only trigger shortcuts when not typing in input fields
      if (event.target instanceof HTMLInputElement || 
          event.target instanceof HTMLTextAreaElement || 
          event.target instanceof HTMLSelectElement) {
        return;
      }

      // Check for Alt key combinations
      if (event.altKey) {
        event.preventDefault();
        
        switch (event.key.toLowerCase()) {
          case 'd':
            setActiveTab('dashboard');
            break;
          case 'a':
            setActiveTab('accounting');
            break;
          case 'i':
            setActiveTab('inventory');
            break;
          case 's':
            setActiveTab('sales');
            break;
          case 'p':
            setActiveTab('purchase');
            break;
          case 'r':
            setActiveTab('reports');
            break;
          case 't':
            setActiveTab('settings');
            break;
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);
  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'accounting':
        return <Accounting />;
      case 'inventory':
        return <Inventory />;
      case 'sales':
        return <Sales />;
      case 'purchase':
        return <Purchase />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
    <main className="flex-1 ml-64 p-8">
      {renderContent()}
    </main>
    
    {/* Keyboard shortcuts help overlay */}
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 max-w-xs">
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
      <div className="space-y-1 text-xs text-gray-600">
        <div className="flex justify-between">
          <span>Dashboard</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + D</kbd>
        </div>
        <div className="flex justify-between">
          <span>Accounting</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + A</kbd>
        </div>
        <div className="flex justify-between">
          <span>Inventory</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + I</kbd>
        </div>
        <div className="flex justify-between">
          <span>Sales</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + S</kbd>
        </div>
        <div className="flex justify-between">
          <span>Purchase</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + P</kbd>
        </div>
        <div className="flex justify-between">
          <span>Reports</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + R</kbd>
        </div>
        <div className="flex justify-between">
          <span>Settings</span>
          <kbd className="px-1 py-0.5 bg-gray-100 rounded text-xs">Alt + T</kbd>
        </div>
      </div>
    </div>
  </div>
    
  );
}
