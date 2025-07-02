import React, { useEffect, useState } from 'react';
import { Plus, TrendingUp, ShoppingBag, DollarSign, Users, CreditCard } from 'lucide-react';
import SalesPOS from './SalesPOS';

const Sales: React.FC = () => {
  const [showPOS, setShowPOS] = useState(false);

  const salesStats = [
    { label: 'Total Sales', value: '₹2,45,680', change: '+12.5%', icon: DollarSign, color: 'blue' },
    { label: 'Orders', value: '156', change: '+8.2%', icon: ShoppingBag, color: 'emerald' },
    { label: 'Customers', value: '89', change: '+15.3%', icon: Users, color: 'purple' },
    { label: 'Growth', value: '18.5%', change: '+2.1%', icon: TrendingUp, color: 'indigo' }
  ];

  const recentOrders = [
    { id: 'ORD-001', customer: 'John Doe', amount: 15000, status: 'Completed', date: '2025-01-15' },
    { id: 'ORD-002', customer: 'Jane Smith', amount: 8500, status: 'Pending', date: '2025-01-14' },
    { id: 'ORD-003', customer: 'Bob Wilson', amount: 22000, status: 'Processing', date: '2025-01-14' },
    { id: 'ORD-004', customer: 'Alice Brown', amount: 12000, status: 'Completed', date: '2025-01-13' },
  ];

  useEffect(()=>{
    const handleKeyPress =(event: KeyboardEvent) => {
      if(event.altKey && event.key.toLowerCase() == 's')
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
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Pending':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'Processing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  if (showPOS) {
    return <SalesPOS onClose={() => setShowPOS(false)} />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sales Management</h1>
          <p className="text-gray-600 mt-2">Track your sales performance and manage orders</p>
        </div>
        <div className="flex space-x-3">
          <button 
            onClick={() => setShowPOS(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
          >
            <CreditCard className="h-5 w-5" />
            <span>Sales POS</span>
          </button>
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {salesStats.map((stat, index) => {
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
          <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-150">
            View All Orders
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors duration-150">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customer}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                    ₹{order.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {order.date}
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

export default Sales;