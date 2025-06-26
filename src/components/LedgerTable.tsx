import React from 'react';
import { Edit, Trash2, Eye } from 'lucide-react';

const LedgerTable: React.FC = () => {
  const ledgerEntries = [
    { id: 1, date: '2025-01-15', account: 'Sales', debit: 0, credit: 15000, balance: 45000, description: 'Product Sales', reference: 'INV-001' },
    { id: 2, date: '2025-01-14', account: 'Office Rent', debit: 25000, credit: 0, balance: 30000, description: 'Monthly office rent', reference: 'RENT-001' },
    { id: 3, date: '2025-01-14', account: 'Consulting', debit: 0, credit: 8500, balance: 55000, description: 'Consulting services', reference: 'CONS-001' },
    { id: 4, date: '2025-01-13', account: 'Equipment', debit: 12000, credit: 0, balance: 46500, description: 'Office equipment purchase', reference: 'EQP-001' },
    { id: 5, date: '2025-01-13', account: 'Sales', debit: 0, credit: 22000, balance: 58500, description: 'Bulk order sales', reference: 'INV-002' },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Debit</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Credit</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {ledgerEntries.map((entry) => (
            <tr key={entry.id} className="hover:bg-gray-50 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.date}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{entry.account}</div>
                <div className="text-xs text-gray-500">{entry.reference}</div>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{entry.description}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {entry.debit > 0 ? (
                  <span className="text-red-600 font-medium">₹{entry.debit.toLocaleString()}</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                {entry.credit > 0 ? (
                  <span className="text-emerald-600 font-medium">₹{entry.credit.toLocaleString()}</span>
                ) : (
                  <span className="text-gray-400">-</span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900">
                ₹{entry.balance.toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-center">
                <div className="flex justify-center space-x-2">
                  <button className="text-blue-600 hover:text-blue-800 transition-colors duration-150">
                    <Eye className="h-4 w-4" />
                  </button>
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

export default LedgerTable;