import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingBag, Users } from 'lucide-react';
import Chart from './Chart';
import RecentTransactions from './RecentTransactions';
import KPICard from './KPICard';
import { KPICardProps } from './KPICard';

const Dashboard: React.FC = () => {
  const kpiData : KPICardProps[]= [
    {
      title: 'Total Revenue',
      value: '₹2,45,680',
      change: '+12.5%',
      trend: 'up' as const,
      icon: DollarSign,
      color: 'blue'
    },
    {
      title: 'Total Expenses',
      value: '₹1,58,420',
      change: '-8.2%',
      trend: 'down' as const,
      icon: TrendingDown,
      color: 'red'
    },
    {
      title: 'Inventory Value',
      value: '₹3,21,450',
      change: '+5.8%',
      trend: 'up' as const,
      icon: Package,
      color: 'emerald'
    },
    {
      title: 'Active Customers',
      value: '1,247',
      change: '+18.3%',
      trend: 'up' as const,
      icon: Users,
      color: 'purple'
    }
  ];

  const chartData = [
    { month: 'Jan', revenue: 45000, expenses: 32000 },
    { month: 'Feb', revenue: 52000, expenses: 38000 },
    { month: 'Mar', revenue: 48000, expenses: 35000 },
    { month: 'Apr', revenue: 61000, expenses: 42000 },
    { month: 'May', revenue: 55000, expenses: 39000 },
    { month: 'Jun', revenue: 67000, expenses: 45000 },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your business overview.</p>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Last updated</div>
          <p className="text-sm font-medium text-gray-900" suppressHydrationWarning>{new Date().toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
          <KPICard key={index} {...kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Chart data={chartData} />
        </div>
        <div>
          <RecentTransactions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;