import React, { useState, useEffect } from 'react';

const Reports = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [businessMetrics, setBusinessMetrics] = useState({});
  const [revenueData, setRevenueData] = useState([]);
  const [topServices, setTopServices] = useState([]);
  const [customerMetrics, setCustomerMetrics] = useState({});
  const [mechanicPerformance, setMechanicPerformance] = useState([]);

  useEffect(() => {
    // Mock data - replace with real API calls
    setBusinessMetrics({
      totalRevenue: 87500,
      jobsCompleted: 234,
      newCustomers: 45,
      avgJobValue: 374,
      customerSatisfaction: 4.7,
      repeatCustomers: 73,
      revenueGrowth: 12.5,
      profitMargin: 28.3
    });

    setRevenueData([
      { month: 'Jan', revenue: 75000, jobs: 198, avgValue: 379 },
      { month: 'Feb', revenue: 82000, jobs: 215, avgValue: 381 },
      { month: 'Mar', revenue: 78500, jobs: 205, avgValue: 383 },
      { month: 'Apr', revenue: 85000, jobs: 225, avgValue: 378 },
      { month: 'May', revenue: 92000, jobs: 248, avgValue: 371 },
      { month: 'Jun', revenue: 87500, jobs: 234, avgValue: 374 }
    ]);

    setTopServices([
      { service: 'Oil Change', count: 89, revenue: 8900, avgTime: 45 },
      { service: 'Brake Service', count: 56, revenue: 25200, avgTime: 120 },
      { service: 'Tire Rotation', count: 67, revenue: 6700, avgTime: 30 },
      { service: 'Major Service', count: 34, revenue: 20400, avgTime: 180 },
      { service: 'Engine Diagnostic', count: 23, revenue: 11500, avgTime: 90 }
    ]);

    setCustomerMetrics({
      totalCustomers: 342,
      activeCustomers: 278,
      newThisMonth: 45,
      avgVisitsPerYear: 2.8,
      topSpender: { name: 'John Smith', amount: 2340 },
      satisfaction: 4.7,
      complaints: 3,
      referrals: 28
    });

    setMechanicPerformance([
      { 
        name: 'Mike Johnson', 
        jobsCompleted: 68, 
        avgTime: 95, 
        efficiency: 94, 
        customerRating: 4.8,
        revenue: 25600 
      },
      { 
        name: 'Tom Anderson', 
        jobsCompleted: 72, 
        avgTime: 102, 
        efficiency: 89, 
        customerRating: 4.6,
        revenue: 27200 
      },
      { 
        name: 'Chris Wilson', 
        jobsCompleted: 59, 
        avgTime: 88, 
        efficiency: 96, 
        customerRating: 4.9,
        revenue: 22100 
      },
      { 
        name: 'David Lee', 
        jobsCompleted: 61, 
        avgTime: 98, 
        efficiency: 91, 
        customerRating: 4.5,
        revenue: 23400 
      }
    ]);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-ZA', { 
      style: 'currency', 
      currency: 'ZAR' 
    }).format(amount);
  };

  const formatPercent = (value) => {
    return `${value}%`;
  };

  const getGrowthColor = (growth) => {
    return growth >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 95) return 'text-green-600';
    if (efficiency >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push('⭐');
    }
    if (hasHalfStar) {
      stars.push('⭐');
    }
    return stars.join('');
  };

  const exportReport = () => {
    // Mock export functionality
    alert(`Exporting ${selectedReport} report for ${selectedPeriod}...`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="admin-reports-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Business Reports</h1>
                <p className="text-purple-100 text-lg">Analytics & Performance Insights</p>
              </div>
            </div>
            <button 
              onClick={exportReport}
              className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200"
            >
              Export Report
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Period:</label>
              <select 
                value={selectedPeriod} 
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Report:</label>
              <select 
                value={selectedReport} 
                onChange={(e) => setSelectedReport(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="overview">Business Overview</option>
                <option value="revenue">Revenue Analysis</option>
                <option value="services">Service Performance</option>
                <option value="customers">Customer Analytics</option>
                <option value="mechanics">Staff Performance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Key Metrics Cards */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  💰
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatCurrency(businessMetrics.totalRevenue)}</div>
                  <div className="text-green-100 text-sm">Total Revenue</div>
                  <div className={`text-xs font-medium ${getGrowthColor(businessMetrics.revenueGrowth)}`}>
                    +{businessMetrics.revenueGrowth}% from last period
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🔧
                </div>
                <div>
                  <div className="text-2xl font-bold">{businessMetrics.jobsCompleted}</div>
                  <div className="text-blue-100 text-sm">Jobs Completed</div>
                  <div className="text-blue-200 text-xs font-medium">
                    Avg: {formatCurrency(businessMetrics.avgJobValue)}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  👥
                </div>
                <div>
                  <div className="text-2xl font-bold">{businessMetrics.newCustomers}</div>
                  <div className="text-purple-100 text-sm">New Customers</div>
                  <div className="text-purple-200 text-xs font-medium">
                    {businessMetrics.repeatCustomers} returning
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div>
                  <div className="text-2xl font-bold">{businessMetrics.customerSatisfaction}/5</div>
                  <div className="text-orange-100 text-sm">Satisfaction</div>
                  <div className="text-orange-200 text-xs font-medium">
                    {getRatingStars(businessMetrics.customerSatisfaction)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Report Content */}
        {selectedReport === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Revenue Trend */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Trend</h3>
              <div className="space-y-4">
                {revenueData.slice(-6).map((data, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-800">{data.month}</div>
                      <div className="text-sm text-gray-600">{data.jobs} jobs</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-800">{formatCurrency(data.revenue)}</div>
                      <div className="text-sm text-gray-600">Avg: {formatCurrency(data.avgValue)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Profit Analysis */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Profit Analysis</h3>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Revenue:</span>
                  <span className="font-bold text-gray-800">{formatCurrency(businessMetrics.totalRevenue)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Operating Costs:</span>
                  <span className="font-bold text-gray-800">{formatCurrency(businessMetrics.totalRevenue * 0.717)}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-gray-800">Net Profit:</span>
                    <span className="font-bold text-green-600">{formatCurrency(businessMetrics.totalRevenue * 0.283)}</span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600">Profit Margin:</span>
                    <span className="font-semibold text-green-600">{formatPercent(businessMetrics.profitMargin)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'services' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Service Performance Analysis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Service</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Jobs</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Revenue</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Avg Time</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Profit/Job</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {topServices.map((service, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-xl">
                            🔧
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{service.service}</div>
                            <div className="text-sm text-gray-600">#{index + 1} most popular</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800">{service.count}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800">{formatCurrency(service.revenue)}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-600">{service.avgTime} min</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(Math.round(service.revenue / service.count * 0.28))}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {selectedReport === 'customers' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Customer Overview</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center text-white text-xl">
                      👥
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Total Customers</div>
                      <div className="text-sm text-gray-600">All registered</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">{customerMetrics.totalCustomers}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center text-white text-xl">
                      ✅
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Active Customers</div>
                      <div className="text-sm text-gray-600">Serviced this year</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{customerMetrics.activeCustomers}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center text-white text-xl">
                      🆕
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">New This Month</div>
                      <div className="text-sm text-gray-600">First time customers</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-purple-600">{customerMetrics.newThisMonth}</div>
                </div>

                <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xl">
                      🔄
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">Referrals</div>
                      <div className="text-sm text-gray-600">Word of mouth</div>
                    </div>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">{customerMetrics.referrals}</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Customer Insights</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Average Visits Per Year</span>
                    <span className="font-bold text-gray-800">{customerMetrics.avgVisitsPerYear}</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Customer Satisfaction</span>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-800">{customerMetrics.satisfaction}/5</span>
                      <span>{getRatingStars(customerMetrics.satisfaction)}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-600">Complaints This Month</span>
                    <span className="font-bold text-red-600">{customerMetrics.complaints}</span>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-green-800 font-semibold mb-2">Top Customer</div>
                  <div className="flex items-center justify-between">
                    <span className="text-green-700">{customerMetrics.topSpender.name}</span>
                    <span className="font-bold text-green-600">
                      {formatCurrency(customerMetrics.topSpender.amount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedReport === 'mechanics' && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">Staff Performance Analysis</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800">Mechanic</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Jobs</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Avg Time</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Efficiency</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Rating</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-800">Revenue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {mechanicPerformance.map((mechanic, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white text-xl user-profile-photo">
                            🔧
                          </div>
                          <div>
                            <div className="font-semibold text-gray-800">{mechanic.name}</div>
                            <div className="text-sm text-gray-600">Senior Mechanic</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-gray-800">{mechanic.jobsCompleted}</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-gray-600">{mechanic.avgTime} min</span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className={`font-semibold ${getEfficiencyColor(mechanic.efficiency)}`}>
                          {formatPercent(mechanic.efficiency)}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-1">
                          <span className="font-semibold text-gray-800">{mechanic.customerRating}</span>
                          <span className="text-yellow-500">⭐</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="font-semibold text-green-600">
                          {formatCurrency(mechanic.revenue)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Export Summary */}
        <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-gray-800">Export Options</h3>
              <p className="text-gray-600">Generate detailed reports for analysis</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                PDF Report
              </button>
              <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                Excel Export
              </button>
              <button className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors duration-200">
                Email Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;