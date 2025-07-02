import React, { useState, useEffect, useRef } from 'react';
import { Search, ArrowLeft, Save, Calculator } from 'lucide-react';
import ItemMaster from './ItemMaster';

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

interface SaleItem extends Item {
  quantity: number;
  discount: number;
  total: number;
}

interface SalesPOSProps {
  onClose: () => void;
}

const SalesPOS: React.FC<SalesPOSProps> = ({ onClose }) => {
  const [items, setItems] = useState<SaleItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showItemMaster, setShowItemMaster] = useState(false);
  const [selectedItemIndex, setSelectedItemIndex] = useState(0);
  const [editingField, setEditingField] = useState<'quantity' | 'discount' | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [invoiceNumber, setInvoiceNumber] = useState('INV-' + Date.now());
  
  const searchInputRef = useRef<HTMLInputElement>(null);
  const quantityInputRef = useRef<HTMLInputElement>(null);
  const discountInputRef = useRef<HTMLInputElement>(null);

  // Sample items database
  const itemsDatabase: Item[] = [
    { id: '1', name: 'Wireless Headphones', code: 'WH001', price: 2499, stock: 45, unit: 'PCS', category: 'Electronics', gst: 18 },
    { id: '2', name: 'Office Chair', code: 'OC002', price: 8999, stock: 8, unit: 'PCS', category: 'Furniture', gst: 12 },
    { id: '3', name: 'Laptop Stand', code: 'LS003', price: 1299, stock: 25, unit: 'PCS', category: 'Accessories', gst: 18 },
    { id: '4', name: 'Wireless Mouse', code: 'WM004', price: 799, stock: 72, unit: 'PCS', category: 'Electronics', gst: 18 },
    { id: '5', name: 'Desk Lamp', code: 'DL005', price: 1899, stock: 15, unit: 'PCS', category: 'Lighting', gst: 12 },
    { id: '6', name: 'USB Cable', code: 'UC006', price: 299, stock: 100, unit: 'PCS', category: 'Accessories', gst: 18 },
    { id: '7', name: 'Monitor Stand', code: 'MS007', price: 1599, stock: 20, unit: 'PCS', category: 'Accessories', gst: 18 },
    { id: '8', name: 'Keyboard', code: 'KB008', price: 1299, stock: 35, unit: 'PCS', category: 'Electronics', gst: 18 },
  ];

  const filteredItems = itemsDatabase.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      // ESC to close or cancel
      if (event.key === 'Escape') {
        if (showItemMaster) {
          setShowItemMaster(false);
          setSearchTerm('');
          if (searchInputRef.current) searchInputRef.current.focus();
        } else if (editingField) {
          setEditingField(null);
          if (searchInputRef.current) searchInputRef.current.focus();
        } else {
          onClose();
        }
        return;
      }

      //Open ItemMaster on AnyThing Type
      if (event.key.length === 1 && !['Backspace', 'Enter'].includes(event.key)) {        
        if (filteredItems.length > 0 && !showItemMaster && !editingField) {                    
          setShowItemMaster(true);
        }
        return;
      }

      // Don't handle other shortcuts when editing fields
      if (event.target instanceof HTMLInputElement && editingField) {
        if (event.key === 'Enter') {
          setEditingField(null);
          if (searchInputRef.current) searchInputRef.current.focus();
        }
        return;
      }

      // Enter to select item or open master
      if (event.key === 'Enter') {
        if (filteredItems.length > 0 && !showItemMaster) {
          setShowItemMaster(true);
        } else if (showItemMaster) {
          // This will be handled by ItemMaster component
        }
        return;
      }

      // F2 to save
      if (event.key === 'F2') {
        event.preventDefault();
        handleSave();
        return;
      }

      // F4 to edit quantity
      if (event.key === 'F4' && items.length > 0) {
        event.preventDefault();
        setEditingField('quantity');
        setTimeout(() => quantityInputRef.current?.focus(), 100);
        return;
      }

      // F5 to edit discount
      if (event.key === 'F5' && items.length > 0) {
        event.preventDefault();
        setEditingField('discount');
        setTimeout(() => discountInputRef.current?.focus(), 100);
        return;
      }

      // Arrow keys for item navigation
      if (!showItemMaster && items.length > 0) {
        if (event.key === 'ArrowUp') {
          event.preventDefault();
          setSelectedItemIndex(prev => Math.max(0, prev - 1));
        } else if (event.key === 'ArrowDown') {
          event.preventDefault();
          setSelectedItemIndex(prev => Math.min(items.length - 1, prev + 1));
        }
      }

      // Delete key to remove item
      if (event.key === 'Delete' && items.length > 0 && !editingField) {
        event.preventDefault();
        removeItem(selectedItemIndex);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [searchTerm, filteredItems, showItemMaster, items, selectedItemIndex, editingField]);

  const addItem = (item: Item) => {
    const existingItemIndex = items.findIndex(i => i.id === item.id);
    
    if (existingItemIndex >= 0) {
      const updatedItems = [...items];
      updatedItems[existingItemIndex].quantity += 1;
      updatedItems[existingItemIndex].total = calculateItemTotal(updatedItems[existingItemIndex]);
      setItems(updatedItems);
    } else {
      const newItem: SaleItem = {
        ...item,
        quantity: 1,
        discount: 0,
        total: item.price
      };
      setItems([...items, newItem]);
      setSelectedItemIndex(items.length);
    }
    
    setShowItemMaster(false);
    setSearchTerm('');
    if (searchInputRef.current) searchInputRef.current.focus();
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    setSelectedItemIndex(Math.max(0, Math.min(selectedItemIndex, updatedItems.length - 1)));
  };

  const updateItemQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) return;
    const updatedItems = [...items];
    updatedItems[index].quantity = quantity;
    updatedItems[index].total = calculateItemTotal(updatedItems[index]);
    setItems(updatedItems);
  };

  const updateItemDiscount = (index: number, discount: number) => {
    if (discount < 0 || discount > 100) return;
    const updatedItems = [...items];
    updatedItems[index].discount = discount;
    updatedItems[index].total = calculateItemTotal(updatedItems[index]);
    setItems(updatedItems);
  };

  const calculateItemTotal = (item: SaleItem) => {
    const subtotal = item.price * item.quantity;
    const discountAmount = (subtotal * item.discount) / 100;
    return subtotal - discountAmount;
  };

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = items.reduce((sum, item) => sum + ((item.price * item.quantity * item.discount) / 100), 0);
    const taxableAmount = subtotal - discountAmount;
    const gstAmount = items.reduce((sum, item) => {
      const itemSubtotal = item.price * item.quantity;
      const itemDiscount = (itemSubtotal * item.discount) / 100;
      const itemTaxable = itemSubtotal - itemDiscount;
      return sum + ((itemTaxable * item.gst) / 100);
    }, 0);
    const total = taxableAmount + gstAmount;

    return { subtotal, discountAmount, taxableAmount, gstAmount, total };
  };

  const handleSave = () => {
    if (items.length === 0) return;
    
    const totals = calculateTotals();
    const saleData = {
      invoiceNumber,
      customerName,
      items,
      totals,
      date: new Date().toISOString()
    };
    
    console.log('Sale saved:', saleData);
    // Here you would typically save to your backend
    onClose();
  };

  const totals = calculateTotals();

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button onClick={onClose} className="hover:bg-blue-700 p-2 rounded">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <h1 className="text-xl font-bold">Sales POS</h1>
          <span className="text-blue-200">Invoice: {invoiceNumber}</span>
        </div>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="px-3 py-1 rounded bg-white text-gray-900 text-sm"
          />
          <button
            onClick={handleSave}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Save (F2)</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Left Panel - Item Entry */}
        <div className="w-1/2 border-r border-gray-200 p-4">
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search items by name or code... (Press Enter to open master)"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
              />
            </div>
          </div>

          {/* Quick suggestions */}
          {searchTerm && !showItemMaster && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quick Add (Press Enter for more options)</h3>
              <div className="space-y-1 max-h-40 overflow-y-auto">
                {filteredItems.slice(0, 5).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => addItem(item)}
                    className="w-full text-left p-2 hover:bg-gray-50 rounded border border-gray-200 text-sm"
                  >
                    <div className="flex justify-between">
                      <span className="font-medium">{item.name}</span>
                      <span className="text-gray-500">₹{item.price}</span>
                    </div>
                    <div className="text-xs text-gray-500">{item.code} • Stock: {item.stock}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Keyboard shortcuts help */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-gray-900 mb-2">Keyboard Shortcuts</h3>
            <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
              <div><kbd className="bg-white px-1 rounded">Enter</kbd> Open Item Master</div>
              <div><kbd className="bg-white px-1 rounded">Esc</kbd> Cancel/Close</div>
              <div><kbd className="bg-white px-1 rounded">F2</kbd> Save Invoice</div>
              <div><kbd className="bg-white px-1 rounded">F4</kbd> Edit Quantity</div>
              <div><kbd className="bg-white px-1 rounded">F5</kbd> Edit Discount</div>
              <div><kbd className="bg-white px-1 rounded">Del</kbd> Remove Item</div>
              <div><kbd className="bg-white px-1 rounded">↑↓</kbd> Navigate Items</div>
            </div>
          </div>
        </div>

        {/* Right Panel - Invoice */}
        <div className="w-1/2 p-4 flex flex-col">
          <h2 className="text-lg font-semibold mb-4">Invoice Items</h2>
          
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Calculator className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No items added yet</p>
                <p className="text-sm">Search and add items to start billing</p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 sticky top-0">
                    <tr>
                      <th className="text-left p-2">Item</th>
                      <th className="text-center p-2">Qty</th>
                      <th className="text-center p-2">Rate</th>
                      <th className="text-center p-2">Disc%</th>
                      <th className="text-right p-2">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item, index) => (
                      <tr
                        key={item.id}
                        className={`border-b ${selectedItemIndex === index ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}`}
                      >
                        <td className="p-2">
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-gray-500">{item.code}</div>
                        </td>
                        <td className="p-2 text-center">
                          {editingField === 'quantity' && selectedItemIndex === index ? (
                            <input
                              ref={quantityInputRef}
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateItemQuantity(index, parseInt(e.target.value) || 0)}
                              className="w-16 px-1 py-1 border rounded text-center"
                              min="1"
                            />
                          ) : (
                            <span>{item.quantity}</span>
                          )}
                        </td>
                        <td className="p-2 text-center">₹{item.price}</td>
                        <td className="p-2 text-center">
                          {editingField === 'discount' && selectedItemIndex === index ? (
                            <input
                              ref={discountInputRef}
                              type="number"
                              value={item.discount}
                              onChange={(e) => updateItemDiscount(index, parseFloat(e.target.value) || 0)}
                              className="w-16 px-1 py-1 border rounded text-center"
                              min="0"
                              max="100"
                              step="0.1"
                            />
                          ) : (
                            <span>{item.discount}%</span>
                          )}
                        </td>
                        <td className="p-2 text-right font-medium">₹{item.total.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>₹{totals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-red-600">
                    <span>Discount:</span>
                    <span>-₹{totals.discountAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxable Amount:</span>
                    <span>₹{totals.taxableAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST:</span>
                    <span>₹{totals.gstAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t pt-2">
                    <span>Total:</span>
                    <span>₹{totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Item Master Modal */}
      {showItemMaster && (
        <ItemMaster
          searchTerm={searchTerm}
          items={filteredItems}
          onSelectItem={addItem}
          onClose={() => {
            setShowItemMaster(false);
            setSearchTerm('');
            if (searchInputRef.current) searchInputRef.current.focus();
          }}
        />
      )}
    </div>
  );
};

export default SalesPOS;