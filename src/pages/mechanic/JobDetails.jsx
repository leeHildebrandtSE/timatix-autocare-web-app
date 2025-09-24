import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobDetails = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [workLog, setWorkLog] = useState([]);
  const [newLogEntry, setNewLogEntry] = useState('');
  const [partsUsed, setPartsUsed] = useState([]);
  const [customerNotes, setCustomerNotes] = useState('');

  useEffect(() => {
    // Mock data - replace with real API call using jobId
    setJob({
      id: 1,
      jobNumber: 'J2025-001',
      customer: {
        name: 'John Smith',
        phone: '+27 82 123 4567',
        email: 'john.smith@email.com',
        address: '123 Main Street, Cape Town, 8001'
      },
      vehicle: {
        make: 'Honda',
        model: 'Civic',
        year: 2020,
        licensePlate: 'ABC 123 GP',
        vin: 'JHMFC2F59LX012345',
        mileage: 45000,
        color: 'White'
      },
      service: {
        type: 'Oil Change & Filter',
        description: 'Standard oil change service with filter replacement',
        priority: 'High',
        estimatedTime: 90,
        actualTime: 75
      },
      status: 'In Progress',
      mechanic: 'Mike Johnson',
      startTime: '09:00',
      endTime: null,
      bookedDate: '2025-09-23',
      specialInstructions: 'Customer mentioned unusual engine noise during acceleration',
      progress: 60,
      costs: {
        parts: 45,
        labor: 75,
        total: 120
      }
    });

    setWorkLog([
      {
        id: 1,
        time: '09:15',
        mechanic: 'Mike Johnson',
        action: 'Started vehicle inspection',
        details: 'Checked engine oil level and condition. Oil appears dark and thick.'
      },
      {
        id: 2,
        time: '09:30',
        mechanic: 'Mike Johnson',
        action: 'Drained old oil',
        details: 'Removed drain plug and drained approximately 4.2L of old oil.'
      },
      {
        id: 3,
        time: '09:45',
        mechanic: 'Mike Johnson',
        action: 'Replaced oil filter',
        details: 'Removed old filter and installed new Bosch filter. Applied thin layer of new oil to gasket.'
      },
      {
        id: 4,
        time: '10:00',
        mechanic: 'Mike Johnson',
        action: 'Added new oil',
        details: 'Added 4.5L of 5W-30 synthetic oil. Checked level with dipstick.'
      }
    ]);

    setPartsUsed([
      {
        id: 1,
        name: 'Engine Oil 5W-30',
        quantity: 5,
        unit: 'Liters',
        unitPrice: 8,
        total: 40
      },
      {
        id: 2,
        name: 'Oil Filter - Bosch',
        quantity: 1,
        unit: 'Each',
        unitPrice: 15,
        total: 15
      }
    ]);

    setCustomerNotes('Vehicle serviced as requested. Engine noise investigated - appears to be normal transmission noise. Recommended next service in 6 months or 10,000km.');
  }, [jobId]);

  const getVehicleEmoji = (make) => {
    const emojiMap = {
      'Honda': '🚗',
      'Toyota': '🚙',
      'Ford': '🚐',
      'BMW': '🏎️'
    };
    return emojiMap[make] || '🚗';
  };

  const getVehicleColor = (make) => {
    const colorMap = {
      'Honda': 'from-red-500 to-red-600',
      'Toyota': 'from-red-600 to-red-700',
      'Ford': 'from-blue-500 to-blue-600',
      'BMW': 'from-gray-600 to-gray-700'
    };
    return colorMap[make] || 'from-gray-500 to-gray-600';
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
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'Waiting Parts': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const addLogEntry = () => {
    if (newLogEntry.trim()) {
      const newEntry = {
        id: workLog.length + 1,
        time: new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        mechanic: job.mechanic,
        action: 'Work Update',
        details: newLogEntry.trim()
      };
      setWorkLog([...workLog, newEntry]);
      setNewLogEntry('');
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg">
            🔍
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Loading Job Details...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-orange-50">
      {/* Header */}
      <div className="mechanic-job-details-header">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`w-16 h-16 bg-gradient-to-r ${getVehicleColor(job.vehicle.make)} rounded-2xl flex items-center justify-center text-3xl text-white shadow-lg vehicle-avatar-large`}>
                {getVehicleEmoji(job.vehicle.make)}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{job.jobNumber}</h1>
                <p className="text-orange-100 text-lg">{job.service.type} - {job.customer.name}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`px-4 py-2 rounded-xl text-sm font-medium border ${getStatusColor(job.status)}`}>
                {job.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">Job Progress</h2>
            <span className="text-2xl font-bold text-gray-800">{job.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div 
              className="bg-gradient-to-r from-orange-500 to-orange-600 h-4 rounded-full transition-all duration-500 relative overflow-hidden"
              style={{ width: `${job.progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Customer & Vehicle Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Customer & Vehicle Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Customer Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Name</div>
                      <div className="font-medium text-gray-800">{job.customer.name}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      <div className="font-medium text-gray-800">{job.customer.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Email</div>
                      <div className="font-medium text-gray-800">{job.customer.email}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="font-medium text-gray-800">{job.customer.address}</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Vehicle Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Vehicle</div>
                      <div className="font-medium text-gray-800">
                        {job.vehicle.year} {job.vehicle.make} {job.vehicle.model}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">License Plate</div>
                      <div className="font-medium text-gray-800">{job.vehicle.licensePlate}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">VIN</div>
                      <div className="font-medium text-gray-800">{job.vehicle.vin}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Mileage</div>
                      <div className="font-medium text-gray-800">{job.vehicle.mileage.toLocaleString()} km</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Color</div>
                      <div className="font-medium text-gray-800">{job.vehicle.color}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Service Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Service Type</div>
                    <div className="font-semibold text-gray-800 text-lg">{job.service.type}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Description</div>
                    <div className="text-gray-800">{job.service.description}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Priority</div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(job.service.priority)}`}>
                      {job.service.priority} Priority
                    </span>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-600">Assigned Mechanic</div>
                    <div className="font-medium text-gray-800">{job.mechanic}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Start Time</div>
                    <div className="font-medium text-gray-800">{job.startTime}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Estimated Time</div>
                    <div className="font-medium text-gray-800">{Math.floor(job.service.estimatedTime / 60)}h {job.service.estimatedTime % 60}m</div>
                  </div>
                </div>
              </div>
              {job.specialInstructions && (
                <div className="mt-6 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
                  <div className="font-medium text-yellow-800 mb-2">Special Instructions</div>
                  <div className="text-yellow-700 italic">"{job.specialInstructions}"</div>
                </div>
              )}
            </div>

            {/* Work Log */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Work Log</h2>
              <div className="space-y-4 mb-6">
                {workLog.map(entry => (
                  <div key={entry.id} className="border-l-4 border-orange-500 pl-4 py-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-800">{entry.time}</span>
                      <span className="text-gray-600">•</span>
                      <span className="text-gray-600">{entry.mechanic}</span>
                    </div>
                    <div className="font-medium text-gray-800 mb-1">{entry.action}</div>
                    <div className="text-gray-600">{entry.details}</div>
                  </div>
                ))}
              </div>
              
              {/* Add New Log Entry */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-4">Add Work Log Entry</h3>
                <div className="flex gap-4">
                  <textarea
                    value={newLogEntry}
                    onChange={(e) => setNewLogEntry(e.target.value)}
                    placeholder="Describe the work performed..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    rows="3"
                  />
                  <button
                    onClick={addLogEntry}
                    disabled={!newLogEntry.trim()}
                    className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors duration-200"
                  >
                    Add Entry
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Cost Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Cost Breakdown</h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Parts:</span>
                  <span className="font-semibold text-gray-800">${job.costs.parts}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Labor:</span>
                  <span className="font-semibold text-gray-800">${job.costs.labor}</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg">
                    <span className="font-semibold text-gray-800">Total:</span>
                    <span className="font-bold text-gray-800">${job.costs.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Parts Used */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Parts Used</h2>
              <div className="space-y-4">
                {partsUsed.map(part => (
                  <div key={part.id} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                    <div className="font-medium text-gray-800">{part.name}</div>
                    <div className="text-sm text-gray-600">
                      {part.quantity} {part.unit} × ${part.unitPrice} = ${part.total}
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition-colors duration-200">
                Add Parts
              </button>
            </div>

            {/* Customer Notes */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Customer Notes</h2>
              <textarea
                value={customerNotes}
                onChange={(e) => setCustomerNotes(e.target.value)}
                placeholder="Notes for the customer..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows="4"
              />
              <button className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-xl font-semibold transition-colors duration-200">
                Save Notes
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Generate Quote
                </button>
                <button className="w-full bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-colors duration-200">
                  Print Work Order
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;