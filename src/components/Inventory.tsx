import React, { useState } from 'react';
import { Plus, Search, Filter, Package, AlertTriangle } from 'lucide-react';
import InventoryTable from './InventoryTable';

const Inventory: React.FC = () => {
  const [activeView, setActiveView] = useState('items');

  const inventoryStats = [
    { label: 'Total Items', value: '248', change: '+12', color: 'blue' },
    { label: 'Low Stock', value: '18', change: '-5', color: 'red' },
    { label: 'Out of Stock', value: '3', change: '0', color: 'gray' },
    { label: 'Total Value', value: '₹3,21,450', change: '+8.5%', color: 'emerald' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-2">Track and manage your stock levels</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
          <Plus className="h-5 w-5" />
          <span>Add Item</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {inventoryStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${
                stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                stat.color === 'red' ? 'bg-red-50 text-red-600' :
                stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                'bg-gray-50 text-gray-600'
              }`}>
                {stat.color === 'red' ? <AlertTriangle className="h-6 w-6" /> : <Package className="h-6 w-6" />}
              </div>
            </div>
            <p className={`text-sm mt-2 ${
              stat.change.startsWith('+') ? 'text-emerald-600' : 
              stat.change.startsWith('-') ? 'text-red-600' : 'text-gray-500'
            }`}>
              {stat.change} from last month
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['items', 'categories', 'suppliers', 'movements'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveView(tab)}
                className={`py-4 px-2 border-b-2 font-medium text-sm capitalize transition-colors duration-200 ${
                  activeView === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search inventory..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {activeView === 'items' && <InventoryTable />}
          {activeView !== 'items' && (
            <div className="text-center py-12 text-gray-500">
              {activeView.charAt(0).toUpperCase() + activeView.slice(1)} management coming soon...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inventory;