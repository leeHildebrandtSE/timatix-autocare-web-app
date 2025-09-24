import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [businessStats, setBusinessStats] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);
  const [todaysRevenue, setTodaysRevenue] = useState(0);
  const [monthlyMetrics, setMonthlyMetrics] = useState({});
  const [systemHealth, setSystemHealth] = useState({});

  // Mock data - replace with real API calls
  useEffect(() => {
    setBusinessStats({
      totalJobs: 156,
      activeJobs: 12,
      totalCustomers: 89,
      totalMechanics: 8,
      monthlyRevenue: 45780,
      avgJobValue: 285
    });

    setRecentActivity([
      {
        id: 1,
        type: 'job_completed',
        message: 'Oil Change completed for John Smith - Honda Civic',
        time: '2 minutes ago',
        mechanic: 'Mike Johnson',
        value: 120
      },
      {
        id: 2,
        type: 'new_customer',
        message: 'New customer registered: Sarah Davis',
        time: '15 minutes ago',
        details: 'Toyota Camry 2021'
      },
      {
        id: 3,
        type: 'job_started',
        message: 'Brake Service started for Mark Wilson - BMW X5',
        time: '32 minutes ago',
        mechanic: 'Tom Anderson',
        estimatedValue: 450
      },
      {
        id: 4,
        type: 'payment_received',
        message: 'Payment received: $85.00',
        time: '1 hour ago',
        customer: 'Lisa Brown'
      }
    ]);

    setTodaysRevenue(1240);

    setMonthlyMetrics({
      jobsCompleted: 234,
      newCustomers: 23,
      avgWaitTime: '2.5 hours',
      customerSatisfaction: 4.7,
      revenueGrowth: 12.5
    });

    setSystemHealth({
      serverStatus: 'Healthy',
      databaseConnections: 45,
      activeUsers: 23,
      lastBackup: '2 hours ago',
      systemLoad: 68
    });
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'job_completed': return '✅';
      case 'new_customer': return '👤';
      case 'job_started': return '🔧';
      case 'payment_received': return '💰';
      default: return '📋';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'job_completed': return 'bg-green-100 text-green-800';
      case 'new_customer': return 'bg-blue-100 text-blue-800';
      case 'job_started': return 'bg-yellow-100 text-yellow-800';
      case 'payment_received': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
      {/* Header */}
      <div className="admin-dashboard-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                👨‍💼
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-purple-100 text-lg">Business Overview & System Management</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white font-semibold text-lg">${todaysRevenue}</div>
                <div className="text-purple-100 text-sm">Today's Revenue</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Key Business Metrics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-3xl font-bold">{businessStats.totalJobs}</div>
                <div className="text-blue-100 text-sm">Total Jobs</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">🔄</div>
                <div className="text-3xl font-bold">{businessStats.activeJobs}</div>
                <div className="text-yellow-100 text-sm">Active Jobs</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">👥</div>
                <div className="text-3xl font-bold">{businessStats.totalCustomers}</div>
                <div className="text-green-100 text-sm">Customers</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <div className="text-3xl font-bold">{businessStats.totalMechanics}</div>
                <div className="text-orange-100 text-sm">Mechanics</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold">${businessStats.monthlyRevenue?.toLocaleString()}</div>
                <div className="text-purple-100 text-sm">Monthly Revenue</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="text-center">
                <div className="text-3xl mb-2">💳</div>
                <div className="text-2xl font-bold">${businessStats.avgJobValue}</div>
                <div className="text-indigo-100 text-sm">Avg Job Value</div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Performance</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{monthlyMetrics.jobsCompleted}</div>
                  <div className="text-gray-600 text-sm">Jobs Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{monthlyMetrics.newCustomers}</div>
                  <div className="text-gray-600 text-sm">New Customers</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{monthlyMetrics.avgWaitTime}</div>
                  <div className="text-gray-600 text-sm">Avg Wait Time</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center text-2xl">
                  ⭐
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">{monthlyMetrics.customerSatisfaction}/5</div>
                  <div className="text-gray-600 text-sm">Satisfaction</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl">
                  📈
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-800">+{monthlyMetrics.revenueGrowth}%</div>
                  <div className="text-gray-600 text-sm">Revenue Growth</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Activity</h2>
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="p-4 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${getActivityColor(activity.type)}`}>
                        {getActivityIcon(activity.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-800 font-medium">{activity.message}</p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-gray-500 text-sm">{activity.time}</p>
                          {activity.value && (
                            <span className="text-green-600 font-semibold">${activity.value}</span>
                          )}
                          {activity.estimatedValue && (
                            <span className="text-blue-600 font-semibold">Est. ${activity.estimatedValue}</span>
                          )}
                        </div>
                        {(activity.mechanic || activity.customer || activity.details) && (
                          <p className="text-gray-600 text-sm mt-1">
                            {activity.mechanic && `Mechanic: ${activity.mechanic}`}
                            {activity.customer && `Customer: ${activity.customer}`}
                            {activity.details && activity.details}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* System Health */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">System Health</h2>
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-gray-700 font-medium">Server Status</span>
                  </div>
                  <span className="text-green-600 font-semibold">{systemHealth.serverStatus}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Database Connections</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{systemHealth.databaseConnections}/100</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Active Users</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{systemHealth.activeUsers}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-gray-700 font-medium">Last Backup</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{systemHealth.lastBackup}</span>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-700 font-medium">System Load</span>
                    <span className="text-gray-800 font-semibold">{systemHealth.systemLoad}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${systemHealth.systemLoad}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="font-semibold text-gray-800 mb-4">Quick Actions</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                    View Reports
                  </button>
                  <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                    Backup Now
                  </button>
                  <button className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                    Manage Users
                  </button>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-200">
                    System Settings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;