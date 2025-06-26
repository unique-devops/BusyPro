import React, { useEffect, useState } from 'react';
import { Plus, Package, TrendingDown, ShoppingCart, Truck, CreditCard } from 'lucide-react';
import PurchasePOS from './PurchasePOS';

const Purchase: React.FC = () => {
  const [showPOS, setShowPOS] = useState(false);

  const purchaseStats = [
    { label: 'Total Purchases', value: '₹1,58,420', change: '+5.2%', icon: ShoppingCart, color: 'blue' },
    { label: 'Orders', value: '89', change: '+12.1%', icon: Package, color: 'emerald' },
    { label: 'Suppliers', value: '24', change: '+3', icon: Truck, color: 'purple' },
    { label: 'Savings', value: '₹12,350', change: '+8.7%', icon: TrendingDown, color: 'indigo' }
  ];

  const recentPurchases = [
    { id: 'PO-001', supplier: 'Tech Solutions Ltd', amount: 45000, status: 'Delivered', date: '2025-01-15' },
    { id: 'PO-002', supplier: 'Office Supplies Co', amount: 12500, status: 'Pending', date: '2025-01-14' },
    { id: 'PO-003', supplier: 'Equipment Pro', amount: 28000, status: 'Shipped', date: '2025-01-14' },
    { id: 'PO-004', supplier: 'Furniture Plus', amount: 35000, status: 'Delivered', date: '2025-01-13' },
  ];
  useEffect(()=>{
    const handleKeyPress =(event: KeyboardEvent) => {
      if(event.altKey && event.key.toLowerCase() == 'p')
      {
        setShowPOS(true);
        return;
      }
    };
    document.addEventListener('keydown', handleKeyPress);
    return ()=> document.removeEventListener('keydown', handleKeyPress);
  },[])
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Shipped':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (showPOS) {
    return <PurchasePOS onClose={() => setShowPOS(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase Management</h1>
          <p className="text-gray-600 mt-2">Manage your procurement and supplier relationships</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowPOS(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Purchase POS</span>
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Purchase Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {purchaseStats.map((stat, index) => {
          const IconComponent = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${
                  stat.color === 'blue' ? 'bg-blue-50 text-blue-600' :
                  stat.color === 'emerald' ? 'bg-emerald-50 text-emerald-600' :
                  stat.color === 'purple' ? 'bg-purple-50 text-purple-600' :
                  'bg-indigo-50 text-indigo-600'
                }`}>
                  <IconComponent className="h-6 w-6" />
                </div>
              </div>
              <p className="text-sm text-emerald-600 mt-2">{stat.change} from last month</p>
            </div>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recent Purchase Orders</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-150">
            View All Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PO Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentPurchases.map((purchase) => (
                <tr key={purchase.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {purchase.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {purchase.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ₹{purchase.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(purchase.status)}`}>
                      {purchase.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {purchase.date}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Purchase;