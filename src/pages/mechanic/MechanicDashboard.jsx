import React, { useState, useEffect } from 'react';

const MechanicDashboard = () => {
  const [todaysJobs, setTodaysJobs] = useState([]);
  const [activeJob, setActiveJob] = useState(null);
  const [workingTime, setWorkingTime] = useState(0);
  const [todaysStats, setTodaysStats] = useState({
    completed: 0,
    pending: 0,
    inProgress: 0,
    totalHours: 0
  });

  // Mock data - replace with real API calls
  useEffect(() => {
    setTodaysJobs([
      {
        id: 1,
        jobNumber: 'J2025-001',
        customer: 'John Smith',
        vehicle: 'Honda Civic 2020',
        service: 'Oil Change & Filter',
        priority: 'Medium',
        estimatedTime: '1.5 hours',
        status: 'Pending',
        bookedTime: '09:00',
        specialInstructions: 'Customer mentioned unusual engine noise'
      },
      {
        id: 2,
        jobNumber: 'J2025-002',
        customer: 'Sarah Johnson',
        vehicle: 'Toyota Corolla 2018',
        service: 'Brake Inspection',
        priority: 'High',
        estimatedTime: '2 hours',
        status: 'In Progress',
        bookedTime: '10:30',
        specialInstructions: 'Squeaking noise from front brakes'
      },
      {
        id: 3,
        jobNumber: 'J2025-003',
        customer: 'Mike Davis',
        vehicle: 'Ford F-150 2019',
        service: 'Tire Rotation',
        priority: 'Low',
        estimatedTime: '45 minutes',
        status: 'Completed',
        bookedTime: '08:00',
        specialInstructions: 'Check tire pressure'
      }
    ]);

    setActiveJob({
      id: 2,
      startTime: '10:30',
      elapsedMinutes: 45
    });

    setTodaysStats({
      completed: 1,
      pending: 1,
      inProgress: 1,
      totalHours: 2.5
    });

    // Timer for active job
    const interval = setInterval(() => {
      setWorkingTime(prev => prev + 1);
    }, 60000); // Update every minute

    return () => clearInterval(interval);
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
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const startJob = (jobId) => {
    setActiveJob({ id: jobId, startTime: new Date().toLocaleTimeString(), elapsedMinutes: 0 });
    setTodaysJobs(jobs => jobs.map(job => 
      job.id === jobId ? { ...job, status: 'In Progress' } : job
    ));
  };

  const completeJob = (jobId) => {
    setActiveJob(null);
    setTodaysJobs(jobs => jobs.map(job => 
      job.id === jobId ? { ...job, status: 'Completed' } : job
    ));
    setTodaysStats(stats => ({
      ...stats,
      completed: stats.completed + 1,
      inProgress: Math.max(0, stats.inProgress - 1)
    }));
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="mechanic-dashboard-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                🔧
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Mechanic Dashboard</h1>
                <p className="text-orange-100 text-lg">Today's Job Queue & Active Work</p>
              </div>
            </div>
            {activeJob && (
              <div className="text-right">
                <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                  <div className="text-white font-semibold text-lg">{formatTime(activeJob.elapsedMinutes + workingTime)}</div>
                  <div className="text-orange-100 text-sm">Active Job Time</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Today's Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Performance</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  ✅
                </div>
                <div>
                  <div className="text-3xl font-bold">{todaysStats.completed}</div>
                  <div className="text-green-100 text-sm">Completed</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🔄
                </div>
                <div>
                  <div className="text-3xl font-bold">{todaysStats.inProgress}</div>
                  <div className="text-blue-100 text-sm">In Progress</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  ⏳
                </div>
                <div>
                  <div className="text-3xl font-bold">{todaysStats.pending}</div>
                  <div className="text-yellow-100 text-sm">Pending</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  ⏱️
                </div>
                <div>
                  <div className="text-3xl font-bold">{todaysStats.totalHours}</div>
                  <div className="text-purple-100 text-sm">Hours Worked</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Active Job Timer */}
        {activeJob && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Job</h2>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl">
                    ⏱️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">Job #{activeJob.id} in Progress</h3>
                    <p className="text-blue-100">Started at {activeJob.startTime}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold">{formatTime(activeJob.elapsedMinutes + workingTime)}</div>
                  <div className="text-blue-100">Elapsed Time</div>
                </div>
              </div>
              <div className="mt-4 flex gap-4">
                <button 
                  onClick={() => completeJob(activeJob.id)}
                  className="bg-white text-blue-600 px-6 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Complete Job
                </button>
                <button className="bg-white/20 text-white px-6 py-2 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200">
                  Pause Timer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Today's Jobs Queue */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Job Queue</h2>
          <div className="space-y-4">
            {todaysJobs.map(job => (
              <div key={job.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-16 h-16 bg-gradient-to-r ${getVehicleColor(job.vehicle)} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg vehicle-avatar-large`}>
                        {getVehicleEmoji(job.vehicle)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-xl font-semibold text-gray-800">{job.jobNumber}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(job.priority)}`}>
                            {job.priority}
                          </span>
                        </div>
                        <p className="text-gray-600 font-medium">{job.customer}</p>
                        <p className="text-gray-500 text-sm">{job.vehicle}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(job.status)}`}>
                        {job.status}
                      </span>
                      <div className="text-sm text-gray-600 mt-2">{job.bookedTime}</div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Service Details</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <div className="text-sm text-gray-600">Service Type</div>
                        <div className="font-medium text-gray-800">{job.service}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-600">Estimated Time</div>
                        <div className="font-medium text-gray-800">{job.estimatedTime}</div>
                      </div>
                    </div>
                    {job.specialInstructions && (
                      <div className="mt-3">
                        <div className="text-sm text-gray-600">Special Instructions</div>
                        <div className="text-gray-800 italic">"{job.specialInstructions}"</div>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    {job.status === 'Pending' && (
                      <button 
                        onClick={() => startJob(job.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200"
                      >
                        Start Job
                      </button>
                    )}
                    {job.status === 'In Progress' && activeJob?.id === job.id && (
                      <button 
                        onClick={() => completeJob(job.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200"
                      >
                        Complete Job
                      </button>
                    )}
                    {job.status === 'Completed' && (
                      <div className="flex items-center gap-2 text-green-600">
                        <span className="text-xl">✅</span>
                        <span className="font-semibold">Completed</span>
                      </div>
                    )}
                    <button className="text-gray-500 hover:text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {todaysJobs.length === 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                🎉
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">All caught up!</h3>
              <p className="text-gray-600">No jobs scheduled for today</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MechanicDashboard;