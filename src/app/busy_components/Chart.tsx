import React from 'react';

interface ChartData {
  month: string;
  revenue: number;
  expenses: number;
}

interface ChartProps {
  data: ChartData[];
}

const Chart: React.FC<ChartProps> = ({ data }) => {
  const maxValue = Math.max(...data.flatMap(d => [d.revenue, d.expenses]));
  const scale = 200 / maxValue;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Revenue vs Expenses</h2>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-red-500 rounded mr-2"></div>
            <span className="text-sm text-gray-600">Expenses</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-end justify-between h-64 space-x-4">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div className="flex items-end space-x-1 h-48">
              <div 
                className="bg-blue-500 rounded-t hover:bg-blue-600 transition-colors duration-200 w-6"
                style={{ height: `${item.revenue * scale}px` }}
                title={`Revenue: ₹${item.revenue.toLocaleString()}`}
              />
              <div 
                className="bg-red-500 rounded-t hover:bg-red-600 transition-colors duration-200 w-6"
                style={{ height: `${item.expenses * scale}px` }}
                title={`Expenses: ₹${item.expenses.toLocaleString()}`}
              />
            </div>
            <span className="text-xs text-gray-600 mt-2 font-medium">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Chart;