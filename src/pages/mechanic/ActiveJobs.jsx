import React, { useState, useEffect } from 'react';

const ActiveJobs = () => {
  const [activeJobs, setActiveJobs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    setActiveJobs([
      {
        id: 1,
        jobNumber: 'J2025-001',
        customer: 'John Smith',
        phone: '+27 82 123 4567',
        vehicle: 'Honda Civic 2020',
        licensePlate: 'ABC 123 GP',
        service: 'Oil Change & Filter',
        priority: 'High',
        status: 'In Progress',
        startTime: '09:00',
        estimatedTime: 90,
        elapsedTime: 45,
        mechanic: 'Mike Johnson',
        partsCost: 45,
        laborCost: 75,
        specialInstructions: 'Customer mentioned unusual engine noise',
        progress: 60
      },
      {
        id: 2,
        jobNumber: 'J2025-002',
        customer: 'Sarah Johnson',
        phone: '+27 82 987 6543',
        vehicle: 'Toyota Corolla 2018',
        licensePlate: 'XYZ 789 GP',
        service: 'Brake Inspection & Replacement',
        priority: 'High',
        status: 'Waiting Parts',
        startTime: '10:30',
        estimatedTime: 120,
        elapsedTime: 30,
        mechanic: 'Tom Anderson',
        partsCost: 180,
        laborCost: 120,
        specialInstructions: 'Squeaking noise from front brakes',
        progress: 25
      },
      {
        id: 3,
        jobNumber: 'J2025-003',
        customer: 'Mike Davis',
        phone: '+27 82 555 1234',
        vehicle: 'Ford F-150 2019',
        licensePlate: 'DEF 456 GP',
        service: 'Engine Diagnostic',
        priority: 'Medium',
        status: 'In Progress',
        startTime: '11:00',
        estimatedTime: 180,
        elapsedTime: 90,
        mechanic: 'Chris Wilson',
        partsCost: 0,
        laborCost: 150,
        specialInstructions: 'Check engine light on',
        progress: 50
      },
      {
        id: 4,
        jobNumber: 'J2025-004',
        customer: 'Lisa Brown',
        phone: '+27 82 444 9876',
        vehicle: 'BMW X3 2021',
        licensePlate: 'GHI 789 GP',
        service: 'Major Service',
        priority: 'Low',
        status: 'Quality Check',
        startTime: '08:00',
        estimatedTime: 240,
        elapsedTime: 220,
        mechanic: 'David Lee',
        partsCost: 320,
        laborCost: 280,
        specialInstructions: 'Full service including transmission',
        progress: 95
      }
    ]);
  }, []);

  const getVehicleEmoji = (vehicle) => {
    if (vehicle.includes('Honda') || vehicle.includes('Toyota')) return '🚗';
    if (vehicle.includes('Ford') || vehicle.includes('F-150')) return '🚐';
    if (vehicle.includes('BMW')) return '🏎️';
    return '🚗';
  };

  const getVehicleColor = (vehicle) => {
    if (vehicle.includes('Honda') || vehicle.includes('Toyota')) return 'from-red-500 to-red-600';
    if (vehicle.includes('Ford')) return 'from-blue-500 to-blue-600';
    if (vehicle.includes('BMW')) return 'from-gray-600 to-gray-700';
    return 'from-gray-500 to-gray-600';
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Waiting Parts': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Quality Check': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Customer Approval': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  const filteredJobs = activeJobs.filter(job => {
    if (filter === 'all') return true;
    return job.status.toLowerCase().replace(' ', '_') === filter;
  });

  const sortedJobs = filteredJobs.sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { 'High': 3, 'Medium': 2, 'Low': 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'progress':
        return b.progress - a.progress;
      case 'time':
        return b.elapsedTime - a.elapsedTime;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="mechanic-active-jobs-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🔄
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Active Jobs</h1>
                <p className="text-orange-100 text-lg">Currently in progress and pending jobs</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white font-semibold text-lg">{activeJobs.length}</div>
                <div className="text-orange-100 text-sm">Active Jobs</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Filters and Controls */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Filter:</label>
              <select 
                value={filter} 
                onChange={(e) => setFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="all">All Jobs</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_parts">Waiting Parts</option>
                <option value="quality_check">Quality Check</option>
                <option value="customer_approval">Customer Approval</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="priority">Priority</option>
                <option value="progress">Progress</option>
                <option value="time">Time Elapsed</option>
              </select>
            </div>
          </div>

          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200">
            Refresh Jobs
          </button>
        </div>

        {/* Active Jobs List */}
        <div className="space-y-6">
          {sortedJobs.map(job => (
            <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
              <div className="p-6">
                {/* Job Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${getVehicleColor(job.vehicle)} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg vehicle-avatar-large`}>
                      {getVehicleEmoji(job.vehicle)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-xl font-bold text-gray-800">{job.jobNumber}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                          {job.priority} Priority
                        </span>
                      </div>
                      <p className="text-gray-800 font-semibold">{job.customer}</p>
                      <p className="text-gray-600">{job.vehicle} • {job.licensePlate}</p>
                      <p className="text-gray-500 text-sm">{job.phone}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
                      {job.status}
                    </span>
                    <p className="text-sm text-gray-600 mt-2">Started: {job.startTime}</p>
                    <p className="text-sm text-gray-600">Mechanic: {job.mechanic}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-semibold text-gray-800">{job.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-orange-500 to-orange-600 h-3 rounded-full transition-all duration-500 relative overflow-hidden"
                      style={{ width: `${job.progress}%` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Service Information</h4>
                    <div className="space-y-2">
                      <div>
                        <div className="text-sm text-gray-600">Service Type</div>
                        <div className="font-medium text-gray-800">{job.service}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Time Progress</div>
                        <div className="font-medium text-gray-800">
                          {formatTime(job.elapsedTime)} / {formatTime(job.estimatedTime)}
                        </div>
                      </div>
                      {job.specialInstructions && (
                        <div>
                          <div className="text-sm text-gray-600">Special Instructions</div>
                          <div className="text-gray-800 italic text-sm">"{job.specialInstructions}"</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-800 mb-3">Cost Breakdown</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Parts:</span>
                        <span className="font-medium text-gray-800">${job.partsCost}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Labor:</span>
                        <span className="font-medium text-gray-800">${job.laborCost}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between font-semibold">
                          <span className="text-gray-800">Total:</span>
                          <span className="text-gray-800">${job.partsCost + job.laborCost}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {job.status === 'In Progress' && (
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Complete Job
                        </button>
                        <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Request Parts
                        </button>
                      </>
                    )}
                    {job.status === 'Waiting Parts' && (
                      <>
                        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Resume Job
                        </button>
                        <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Update Status
                        </button>
                      </>
                    )}
                    {job.status === 'Quality Check' && (
                      <>
                        <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Approve & Complete
                        </button>
                        <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200">
                          Request Rework
                        </button>
                      </>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-xl hover:bg-blue-50 transition-colors duration-200 font-medium">
                      Contact Customer
                    </button>
                    <button className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {sortedJobs.length === 0 && (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-2xl flex items-center justify-center text-4xl mx-auto mb-6">
              🎉
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">No Active Jobs</h3>
            <p className="text-gray-600 text-lg mb-6">
              {filter === 'all' 
                ? 'All jobs are completed! Great work!' 
                : `No jobs with status "${filter.replace('_', ' ')}" found.`
              }
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-200">
              View All Jobs
            </button>
          </div>
        )}

        {/* Job Summary Stats */}
        {sortedJobs.length > 0 && (
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Active Jobs Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {sortedJobs.filter(job => job.status === 'In Progress').length}
                </div>
                <div className="text-sm text-gray-600">In Progress</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {sortedJobs.filter(job => job.status === 'Waiting Parts').length}
                </div>
                <div className="text-sm text-gray-600">Waiting Parts</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {sortedJobs.filter(job => job.status === 'Quality Check').length}
                </div>
                <div className="text-sm text-gray-600">Quality Check</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-800">
                  ${sortedJobs.reduce((total, job) => total + job.partsCost + job.laborCost, 0)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActiveJobs;