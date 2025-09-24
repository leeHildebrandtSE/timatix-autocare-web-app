import React, { useState, useEffect } from 'react';

const ClientDashboard = () => {
  const [vehicles, setVehicles] = useState([]);
  const [upcomingServices, setUpcomingServices] = useState([]);
  const [recentServices, setRecentServices] = useState([]);
  const [totalSpent, setTotalSpent] = useState(0);

  // Mock data - replace with real API calls
  useEffect(() => {
    setVehicles([
      {
        id: 1,
        make: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'ABC 123 GP',
        mileage: 45000,
        nextService: '2025-10-15',
        status: 'Good',
        lastService: '2025-07-15'
      },
      {
        id: 2,
        make: 'Toyota',
        model: 'Corolla',
        year: 2018,
        licensePlate: 'XYZ 789 GP',
        mileage: 78000,
        nextService: '2025-11-01',
        status: 'Due Soon',
        lastService: '2025-06-20'
      }
    ]);

    setUpcomingServices([
      {
        id: 1,
        vehicleId: 1,
        type: 'Oil Change',
        date: '2025-10-15',
        estimatedCost: 120,
        priority: 'Medium'
      },
      {
        id: 2,
        vehicleId: 2,
        type: 'Major Service',
        date: '2025-11-01',
        estimatedCost: 450,
        priority: 'High'
      }
    ]);

    setRecentServices([
      {
        id: 1,
        date: '2025-09-10',
        vehicle: 'Honda Civic',
        service: 'Brake Inspection',
        cost: 85,
        status: 'Completed'
      },
      {
        id: 2,
        date: '2025-08-22',
        vehicle: 'Toyota Corolla',
        service: 'Tire Rotation',
        cost: 60,
        status: 'Completed'
      }
    ]);

    setTotalSpent(2340);
  }, []);

  const getVehicleEmoji = (make) => {
    const emojiMap = {
      'Honda': '🚗',
      'Toyota': '🚙',
      'Ford': '🚐',
      'BMW': '🏎️',
      'Mazda': '🚗',
      'Audi': '🏎️',
      'Volkswagen': '🚙'
    };
    return emojiMap[make] || '🚗';
  };

  const getVehicleColor = (make) => {
    const colorMap = {
      'Honda': 'from-red-500 to-red-600',
      'Toyota': 'from-red-600 to-red-700',
      'Ford': 'from-blue-500 to-blue-600',
      'BMW': 'from-blue-600 to-blue-700',
      'Mazda': 'from-red-500 to-red-600',
      'Audi': 'from-gray-600 to-gray-700',
      'Volkswagen': 'from-blue-500 to-blue-600'
    };
    return colorMap[make] || 'from-gray-500 to-gray-600';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800 border-green-200';
      case 'Due Soon': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="client-dashboard-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                👤
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">My Dashboard</h1>
                <p className="text-blue-100 text-lg">Welcome back! Here's your vehicle overview</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white font-semibold text-lg">${totalSpent}</div>
                <div className="text-blue-100 text-sm">Total Spent This Year</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📅
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Book Service</div>
                  <div className="text-blue-100 text-sm">Schedule maintenance</div>
                </div>
              </div>
            </button>
            
            <button className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🔧
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Emergency Service</div>
                  <div className="text-green-100 text-sm">Need help now?</div>
                </div>
              </div>
            </button>
            
            <button className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div className="text-left">
                  <div className="font-semibold text-lg">Service History</div>
                  <div className="text-purple-100 text-sm">View past services</div>
                </div>
              </div>
            </button>
          </div>
        </div>

        {/* My Vehicles */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">My Vehicles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {vehicles.map(vehicle => (
              <div key={vehicle.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${getVehicleColor(vehicle.make)} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg vehicle-avatar-large`}>
                        {getVehicleEmoji(vehicle.make)}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800">
                          {vehicle.make} {vehicle.model}
                        </h3>
                        <p className="text-gray-600">{vehicle.year} • {vehicle.licensePlate}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="text-sm text-gray-600">Mileage</div>
                      <div className="font-semibold text-gray-800">{vehicle.mileage.toLocaleString()} km</div>
                    </div>
                    <div className="bg-slate-50 rounded-xl p-3">
                      <div className="text-sm text-gray-600">Next Service</div>
                      <div className="font-semibold text-gray-800">{new Date(vehicle.nextService).toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      Last service: {new Date(vehicle.lastService).toLocaleDateString()}
                    </span>
                    <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Services */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Services</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {upcomingServices.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {upcomingServices.map(service => (
                  <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                          🔧
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{service.type}</h3>
                          <p className="text-gray-600">
                            Vehicle #{service.vehicleId} • {new Date(service.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800 text-lg">${service.estimatedCost}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(service.priority)}`}>
                          {service.priority} Priority
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  ✅
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
                <p className="text-gray-600">No upcoming services scheduled</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Services */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Services</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            {recentServices.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentServices.map(service => (
                  <div key={service.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl">
                          ✅
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-800 text-lg">{service.service}</h3>
                          <p className="text-gray-600">
                            {service.vehicle} • {new Date(service.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-800 text-lg">${service.cost}</div>
                        <span className="text-green-600 text-sm font-medium">
                          {service.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  📝
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No service history yet</h3>
                <p className="text-gray-600">Your completed services will appear here</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;