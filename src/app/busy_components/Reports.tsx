import React, { useState } from 'react';
import { Download, Filter, Calendar, FileText, BarChart3, PieChart } from 'lucide-react';

const Reports: React.FC = () => {
  const [selectedReport, setSelectedReport] = useState('financial');

  const reportTypes = [
    { id: 'financial', name: 'Financial Reports', icon: BarChart3, description: 'P&L, Balance Sheet, Cash Flow' },
    { id: 'sales', name: 'Sales Reports', icon: PieChart, description: 'Sales analysis and trends' },
    { id: 'inventory', name: 'Inventory Reports', icon: FileText, description: 'Stock levels and movements' },
    { id: 'tax', name: 'Tax Reports', icon: Calendar, description: 'GST and tax compliance reports' }
  ];

  const financialReports = [
    { name: 'Profit & Loss Statement', period: 'Current Month', status: 'Ready' },
    { name: 'Balance Sheet', period: 'As of Jan 15, 2025', status: 'Ready' },
    { name: 'Cash Flow Statement', period: 'Last 6 Months', status: 'Processing' },
    { name: 'Trial Balance', period: 'Current Month', status: 'Ready' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600 mt-2">Generate comprehensive business reports</p>
        </div>
        <div className="flex space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200">
            <Filter className="h-5 w-5" />
            <span>Filter</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-2">
            <Download className="h-5 w-5" />
            <span>Export</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {reportTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => setSelectedReport(type.id)}
              className={`p-6 rounded-xl border-2 text-left transition-all duration-200 ${
                selectedReport === type.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300 bg-white'
              }`}
            >
              <div className={`p-3 rounded-lg inline-flex mb-4 ${
                selectedReport === type.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
              }`}>
                <IconComponent className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">
            {reportTypes.find(r => r.id === selectedReport)?.name}
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <select className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option>This Month</option>
                <option>Last Month</option>
                <option>Last Quarter</option>
                <option>Last Year</option>
              </select>
            </div>
          </div>
        </div>

        {selectedReport === 'financial' && (
          <div className="space-y-4">
            {financialReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-150">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <FileText className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{report.name}</h3>
                    <p className="text-sm text-gray-500">{report.period}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    report.status === 'Ready' 
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                  }`}>
                    {report.status}
                  </span>
                  <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-150">
                    View Report
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedReport !== 'financial' && (
          <div className="text-center py-12 text-gray-500">
            {reportTypes.find(r => r.id === selectedReport)?.name} coming soon...
          </div>
        )}
      </div>
    </div>
  );
};

export default Reports;