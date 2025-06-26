import React from 'react';
import { Edit, Trash2, AlertTriangle, CheckCircle } from 'lucide-react';

const InventoryTable: React.FC = () => {
  const inventoryItems = [
    { 
      id: 1, 
      name: 'Wireless Headphones', 
      sku: 'WH-001', 
      category: 'Electronics', 
      quantity: 45, 
      minStock: 10, 
      price: 2499, 
      value: 112455,
      status: 'in-stock'
    },
    { 
      id: 2, 
      name: 'Office Chair', 
      sku: 'OC-002', 
      category: 'Furniture', 
      quantity: 8, 
      minStock: 15, 
      price: 8999, 
      value: 71992,
      status: 'low-stock'
    },
    { 
      id: 3, 
      name: 'Laptop Stand', 
      sku: 'LS-003', 
      category: 'Accessories', 
      quantity: 0, 
      minStock: 5, 
      price: 1299, 
      value: 0,
      status: 'out-of-stock'
    },
    { 
      id: 4, 
      name: 'Wireless Mouse', 
      sku: 'WM-004', 
      category: 'Electronics', 
      quantity: 72, 
      minStock: 20, 
      price: 799, 
      value: 57528,
      status: 'in-stock'
    },
    { 
      id: 5, 
      name: 'Desk Lamp', 
      sku: 'DL-005', 
      category: 'Lighting', 
      quantity: 15, 
      minStock: 10, 
      price: 1899, 
      value: 28485,
      status: 'in-stock'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-stock':
        return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      case 'low-stock':
      case 'out-of-stock':
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'low-stock':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'out-of-stock':
        return 'bg-red-50 text-red-700 border-red-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {inventoryItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div>
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-xs text-gray-500">SKU: {item.sku}</div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                {item.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="text-sm font-medium text-gray-900">{item.quantity}</div>
                <div className="text-xs text-gray-500">Min: {item.minStock}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                ₹{item.price.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                ₹{item.value.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                  {getStatusIcon(item.status)}
                  <span className="ml-1 capitalize">{item.status.replace('-', ' ')}</span>
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-800 transition-colors duration-150">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-800 transition-colors duration-150">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;