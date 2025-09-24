import React, { useState, useEffect } from 'react';

const TimeTracking = () => {
  const [activeTimer, setActiveTimer] = useState(null);
  const [todaysTime, setTodaysTime] = useState([]);
  const [weeklyStats, setWeeklyStats] = useState({});
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    // Mock data - replace with real API calls
    setTodaysTime([
      {
        id: 1,
        jobNumber: 'J2025-001',
        customer: 'John Smith',
        vehicle: 'Honda Civic 2020',
        service: 'Oil Change',
        startTime: '09:00',
        endTime: '10:15',
        duration: 75,
        status: 'Completed',
        billable: true
      },
      {
        id: 2,
        jobNumber: 'J2025-002',
        customer: 'Sarah Johnson', 
        vehicle: 'Toyota Corolla 2018',
        service: 'Brake Inspection',
        startTime: '10:30',
        endTime: null,
        duration: 45,
        status: 'In Progress',
        billable: true
      },
      {
        id: 3,
        jobNumber: 'BREAK-001',
        customer: null,
        vehicle: null,
        service: 'Lunch Break',
        startTime: '12:00',
        endTime: '13:00',
        duration: 60,
        status: 'Completed',
        billable: false
      }
    ]);

    setActiveTimer({
      jobId: 2,
      startTime: '10:30',
      elapsedMinutes: 45
    });

    setWeeklyStats({
      totalHours: 38.5,
      billableHours: 32.0,
      jobs: 15,
      avgJobTime: 128,
      efficiency: 83
    });

    // Update current time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timeInterval);
  }, []);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins.toString().padStart(2, '0')}m`;
  };

  const formatClock = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const startTimer = (jobId, jobNumber) => {
    if (activeTimer) {
      // Stop current timer first
      stopTimer();
    }
    
    setActiveTimer({
      jobId: jobId,
      startTime: formatClock(new Date()).slice(0, 5), // Remove seconds
      elapsedMinutes: 0
    });
    
    // Update the job status
    setTodaysTime(times => times.map(time => 
      time.id === jobId ? { ...time, status: 'In Progress', startTime: formatClock(new Date()).slice(0, 5) } : time
    ));
  };

  const stopTimer = () => {
    if (activeTimer) {
      const currentEndTime = formatClock(new Date()).slice(0, 5);
      setTodaysTime(times => times.map(time => 
        time.id === activeTimer.jobId 
          ? { 
              ...time, 
              status: 'Completed', 
              endTime: currentEndTime,
              duration: time.duration + activeTimer.elapsedMinutes
            } 
          : time
      ));
      setActiveTimer(null);
    }
  };

  const addBreak = (breakType) => {
    const newBreak = {
      id: Date.now(),
      jobNumber: `${breakType.toUpperCase()}-${String(Date.now()).slice(-3)}`,
      customer: null,
      vehicle: null,
      service: breakType,
      startTime: formatClock(new Date()).slice(0, 5),
      endTime: null,
      duration: 0,
      status: 'In Progress',
      billable: false
    };
    
    setTodaysTime([...todaysTime, newBreak]);
    setActiveTimer({
      jobId: newBreak.id,
      startTime: newBreak.startTime,
      elapsedMinutes: 0
    });
  };

  const getVehicleEmoji = (vehicle) => {
    if (!vehicle) return '☕'; // For breaks
    if (vehicle.includes('Honda') || vehicle.includes('Toyota')) return '🚗';
    if (vehicle.includes('Ford')) return '🚐';
    if (vehicle.includes('BMW')) return '🏎️';
    return '🚗';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Paused': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Calculate current elapsed time for active timer
  const getCurrentElapsed = () => {
    if (!activeTimer) return 0;
    const now = new Date();
    const startTime = new Date();
    const [hours, minutes] = activeTimer.startTime.split(':').map(Number);
    startTime.setHours(hours, minutes, 0, 0);
    
    const elapsed = Math.floor((now - startTime) / (1000 * 60));
    return elapsed;
  };

  const totalTodayMinutes = todaysTime.reduce((total, time) => {
    if (time.status === 'Completed') {
      return total + time.duration;
    } else if (time.id === activeTimer?.jobId) {
      return total + time.duration + getCurrentElapsed();
    }
    return total + time.duration;
  }, 0);

  const billableTodayMinutes = todaysTime.reduce((total, time) => {
    if (!time.billable) return total;
    if (time.status === 'Completed') {
      return total + time.duration;
    } else if (time.id === activeTimer?.jobId) {
      return total + time.duration + getCurrentElapsed();
    }
    return total + time.duration;
  }, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="mechanic-time-tracking-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                ⏱️
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Time Tracking</h1>
                <p className="text-orange-100 text-lg">Track your work time and productivity</p>
              </div>
            </div>
            <div className="text-right">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2">
                <div className="text-white font-semibold text-2xl">{formatClock(currentTime)}</div>
                <div className="text-orange-100 text-sm">Current Time</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Active Timer */}
        {activeTimer && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Timer</h2>
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-8 rounded-2xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center text-3xl animate-pulse">
                    ⏱️
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Timer Running</h3>
                    <p className="text-blue-100">
                      {todaysTime.find(t => t.id === activeTimer.jobId)?.jobNumber || 'Unknown Job'}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-bold">{formatTime(getCurrentElapsed())}</div>
                  <div className="text-blue-100">Elapsed Time</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={stopTimer}
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200"
                >
                  Stop Timer
                </button>
                <button className="bg-white/20 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition-colors duration-200">
                  Pause Timer
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Today's Stats */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Summary</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  ⏰
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatTime(totalTodayMinutes)}</div>
                  <div className="text-green-100 text-sm">Total Time</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  💰
                </div>
                <div>
                  <div className="text-2xl font-bold">{formatTime(billableTodayMinutes)}</div>
                  <div className="text-blue-100 text-sm">Billable Time</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  🔧
                </div>
                <div>
                  <div className="text-2xl font-bold">{todaysTime.filter(t => t.billable).length}</div>
                  <div className="text-purple-100 text-sm">Jobs Worked</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-2xl">
                  📊
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {billableTodayMinutes > 0 ? Math.round((billableTodayMinutes / totalTodayMinutes) * 100) : 0}%
                  </div>
                  <div className="text-orange-100 text-sm">Efficiency</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Time Log */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Today's Time Log</h2>
            <div className="space-y-4">
              {todaysTime.map(timeEntry => (
                <div key={timeEntry.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                          {getVehicleEmoji(timeEntry.vehicle)}
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-800">{timeEntry.jobNumber}</h3>
                          {timeEntry.customer && (
                            <>
                              <p className="text-gray-600">{timeEntry.customer}</p>
                              <p className="text-gray-500 text-sm">{timeEntry.vehicle}</p>
                            </>
                          )}
                          <p className="text-gray-600 font-medium">{timeEntry.service}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(timeEntry.status)}`}>
                          {timeEntry.status}
                        </span>
                        {!timeEntry.billable && (
                          <div className="text-xs text-gray-500 mt-1">Non-billable</div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <div className="text-gray-600">Start</div>
                        <div className="font-semibold text-gray-800">{timeEntry.startTime}</div>
                      </div>
                      <div>
                        <div className="text-gray-600">End</div>
                        <div className="font-semibold text-gray-800">
                          {timeEntry.endTime || (timeEntry.id === activeTimer?.jobId ? 'Running...' : 'Not set')}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-600">Duration</div>
                        <div className="font-semibold text-gray-800">
                          {timeEntry.id === activeTimer?.jobId 
                            ? formatTime(timeEntry.duration + getCurrentElapsed())
                            : formatTime(timeEntry.duration)
                          }
                        </div>
                      </div>
                    </div>

                    {timeEntry.status !== 'Completed' && timeEntry.id !== activeTimer?.jobId && (
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <button 
                          onClick={() => startTimer(timeEntry.id, timeEntry.jobNumber)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl font-semibold transition-colors duration-200"
                        >
                          Resume Timer
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {todaysTime.length === 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4">
                  ⏰
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No time logged today</h3>
                <p className="text-gray-600">Start working on a job to begin tracking time</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => addBreak('Lunch Break')}
                  disabled={!!activeTimer}
                  className="w-full bg-green-500 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Start Lunch Break
                </button>
                <button 
                  onClick={() => addBreak('Short Break')}
                  disabled={!!activeTimer}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Start Short Break
                </button>
                <button 
                  onClick={() => addBreak('Meeting')}
                  disabled={!!activeTimer}
                  className="w-full bg-purple-500 hover:bg-purple-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors duration-200"
                >
                  Start Meeting
                </button>
              </div>
            </div>

            {/* Weekly Stats */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">This Week</h3>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Hours:</span>
                  <span className="font-semibold text-gray-800">{weeklyStats.totalHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Billable Hours:</span>
                  <span className="font-semibold text-gray-800">{weeklyStats.billableHours}h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Jobs Completed:</span>
                  <span className="font-semibold text-gray-800">{weeklyStats.jobs}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Avg Job Time:</span>
                  <span className="font-semibold text-gray-800">{formatTime(weeklyStats.avgJobTime)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className="font-semibold text-gray-800">{weeklyStats.efficiency}%</span>
                </div>
              </div>
            </div>

            {/* Export Options */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Export Time</h3>
              <div className="space-y-3">
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Export Today
                </button>
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Export This Week
                </button>
                <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Time Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking;