import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const RecentTransactions: React.FC = () => {
  const transactions = [
    { id: 1, type: 'income', description: 'Sales Payment - INV-001', amount: 15000, date: '2025-01-15' },
    { id: 2, type: 'expense', description: 'Office Rent', amount: 25000, date: '2025-01-14' },
    { id: 3, type: 'income', description: 'Consulting Fee', amount: 8500, date: '2025-01-14' },
    { id: 4, type: 'expense', description: 'Equipment Purchase', amount: 12000, date: '2025-01-13' },
    { id: 5, type: 'income', description: 'Product Sales', amount: 22000, date: '2025-01-13' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-150">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-full ${
                transaction.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'
              }`}>
                {transaction.type === 'income' ? 
                  <ArrowUpRight className="h-4 w-4" /> : 
                  <ArrowDownRight className="h-4 w-4" />
                }
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className={`text-sm font-semibold ${
              transaction.type === 'income' ? 'text-emerald-600' : 'text-red-600'
            }`}>
              {transaction.type === 'income' ? '+' : '-'}₹{transaction.amount.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-150">
        View All Transactions
      </button>
    </div>
  );
};

export default RecentTransactions;