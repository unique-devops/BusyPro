import React, { useState, useEffect } from 'react';
import { Search, Package, X, ArrowLeft, ArrowRight } from 'lucide-react';

interface Item {
  id: string;
  name: string;
  code: string;
  price: number;
  stock: number;
  unit: string;
  category: string;
  gst: number;
}

interface ItemMasterProps {
  searchTerm: string;
  items: Item[];
  onSelectItem: (item: Item) => void;
  onClose: () => void;
}

const ItemMaster: React.FC<ItemMasterProps> = ({ searchTerm, items, onSelectItem, onClose }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(localSearchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(localSearchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onClose();
          break;
        case 'Enter':
          if (filteredItems.length > 0) {
            onSelectItem(filteredItems[selectedIndex]);
          }
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 1));
          break;
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => Math.min(filteredItems.length - 1, prev + 1));
          break;
        case 'PageUp':
          event.preventDefault();
          setSelectedIndex(prev => Math.max(0, prev - 10));
          break;
        case 'PageDown':
          event.preventDefault();
          setSelectedIndex(prev => Math.min(filteredItems.length - 1, prev + 10));
          break;
        case 'Home':
          event.preventDefault();
          setSelectedIndex(0);
          break;
        case 'End':
          event.preventDefault();
          setSelectedIndex(filteredItems.length - 1);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [filteredItems, selectedIndex, onSelectItem, onClose]);

  // Auto-scroll selected item into view
  useEffect(() => {
    const selectedElement = document.getElementById(`item-${selectedIndex}`);
    if (selectedElement) {
      selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const getStockStatusColor = (stock: number) => {
    if (stock === 0) return 'text-red-600 bg-red-50';
    if (stock < 10) return 'text-yellow-600 bg-yellow-50';
    return 'text-emerald-600 bg-emerald-50';
  };

  const getStockStatusText = (stock: number) => {
    if (stock === 0) return 'Out of Stock';
    if (stock < 10) return 'Low Stock';
    return 'In Stock';
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-5/6 flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <Package className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Item Master</h2>
            <span className="text-sm text-gray-500">({filteredItems.length} items found)</span>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search items by name, code, or category..."
              value={localSearchTerm}
              onChange={(e) => {
                setLocalSearchTerm(e.target.value);
                setSelectedIndex(0);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              autoFocus
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No items found</p>
                <p className="text-sm">Try adjusting your search terms</p>
              </div>
            </div>
          ) : (
            <div className="p-4">
              <div className="grid gap-2">
                {filteredItems.map((item, index) => (
                  <div
                    key={item.id}
                    id={`item-${index}`}
                    onClick={() => onSelectItem(item)}
                    className={`p-4 rounded-lg border cursor-pointer transition-all duration-150 ${
                      selectedIndex === index
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-gray-900">{item.name}</h3>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.code}
                          </span>
                          <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                            {item.category}
                          </span>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Unit: {item.unit}</span>
                          <span>GST: {item.gst}%</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStockStatusColor(item.stock)}`}>
                            {getStockStatusText(item.stock)} ({item.stock})
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">per {item.unit}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">↑↓</kbd>
                <span>Navigate</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">Enter</kbd>
                <span>Select</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">Esc</kbd>
                <span>Cancel</span>
              </div>
              <div className="flex items-center space-x-1">
                <kbd className="px-2 py-1 bg-white rounded border text-xs">PgUp/PgDn</kbd>
                <span>Fast Navigate</span>
              </div>
            </div>
            {filteredItems.length > 0 && (
              <div className="text-sm text-gray-600">
                Item {selectedIndex + 1} of {filteredItems.length}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemMaster;