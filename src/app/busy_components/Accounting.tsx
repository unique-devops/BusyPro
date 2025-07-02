import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import VoucherForm from './VoucherForm';
import LedgerTable from './LedgerTable';

const Accounting: React.FC = () => {
  const [showVoucherForm, setShowVoucherForm] = useState(false);
  const [activeView, setActiveView] = useState('ledger');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Accounting</h1>
          <p className="text-gray-600 mt-2">Manage your financial records and transactions</p>
        </div>
        <button
          onClick={() => setShowVoucherForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2"
        >
          <Plus className="h-5 w-5" />
          <span>New Voucher</span>
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['ledger', 'vouchers', 'journal'].map((tab) => (
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
                  placeholder="Search transactions..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <Filter className="h-5 w-5" />
                <span>Filter</span>
              </button>
            </div>
          </div>

          {activeView === 'ledger' && <LedgerTable />}
          {activeView === 'vouchers' && <div className="text-center py-12 text-gray-500">Voucher management coming soon...</div>}
          {activeView === 'journal' && <div className="text-center py-12 text-gray-500">Journal entries coming soon...</div>}
        </div>
      </div>

      {showVoucherForm && (
        <VoucherForm onClose={() => setShowVoucherForm(false)} />
      )}
    </div>
  );
};

export default Accounting;