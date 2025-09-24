import React, { useEffect, useState } from "react";
import { listBookings, listVehicles } from "../../api/mockApi";
import { useLoading } from "../../hooks/useLoading";
import { useToast } from "../../hooks/useToast";
import Button from "../../components/ui/Button";

export default function ServiceHistory() {
  const [history, setHistory] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [filters, setFilters] = useState({
    vehicle: "all",
    service: "all",
    timeRange: "all"
  });
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading service history...");
        const [bookingsData, vehiclesData] = await Promise.all([
          listBookings(),
          listVehicles()
        ]);
        
        if (!mounted) return;
        
        // Transform bookings into service history with mock data
        const serviceHistory = bookingsData.map((booking, index) => ({
          id: booking.id,
          vehicleId: booking.vehicleId,
          vehicle: vehiclesData.find(v => v.id === booking.vehicleId)?.makeModel || 'Unknown Vehicle',
          service: booking.serviceType,
          date: booking.date,
          cost: getServiceCost(booking.serviceType),
          status: booking.status === 'CONFIRMED' ? 'completed' : 'pending',
          description: getServiceDescription(booking.serviceType),
          tags: getServiceTags(booking.serviceType),
          mechanic: getMechanic(index),
          duration: getServiceDuration(booking.serviceType)
        }));

        setHistory(serviceHistory);
        setVehicles(vehiclesData);
      } catch (err) {
        console.error("Failed to load service history", err);
        showToast({ type: "error", message: "Failed to load service history" });
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  // Helper functions for mock data
  const getServiceCost = (serviceType) => {
    const costs = {
      'General Service': 'R 1,250',
      'Oil Change': 'R 450',
      'Brake Check': 'R 850',
      'Diagnostics': 'R 650'
    };
    return costs[serviceType] || 'R 950';
  };

  const getServiceDescription = (serviceType) => {
    const descriptions = {
      'General Service': 'Complete vehicle inspection and maintenance service including fluid checks and basic repairs.',
      'Oil Change': 'Engine oil and filter replacement with multi-point inspection.',
      'Brake Check': 'Comprehensive brake system inspection including pads, rotors, and brake fluid.',
      'Diagnostics': 'Computer diagnostic scan and troubleshooting of vehicle systems.'
    };
    return descriptions[serviceType] || 'Standard automotive service performed.';
  };

  const getServiceTags = (serviceType) => {
    const tagMap = {
      'General Service': ['Routine Maintenance', 'Multi-Point Inspection'],
      'Oil Change': ['Engine Service', 'Preventive Care'],
      'Brake Check': ['Safety Check', 'Brake System'],
      'Diagnostics': ['Computer Scan', 'Troubleshooting']
    };
    return tagMap[serviceType] || ['Service'];
  };

  const getMechanic = (index) => {
    const mechanics = ['Thabo Mthembu', 'Sarah Johnson', 'Mike Wilson', 'Lisa Chen'];
    return mechanics[index % mechanics.length];
  };

  const getServiceDuration = (serviceType) => {
    const durations = {
      'General Service': '2.5 hours',
      'Oil Change': '45 minutes',
      'Brake Check': '1.5 hours',
      'Diagnostics': '1 hour'
    };
    return durations[serviceType] || '1 hour';
  };

  const filteredHistory = history.filter(record => {
    if (filters.vehicle !== "all" && record.vehicleId !== parseInt(filters.vehicle)) return false;
    if (filters.service !== "all" && !record.service.toLowerCase().includes(filters.service.toLowerCase())) return false;
    if (filters.timeRange !== "all") {
      const recordDate = new Date(record.date);
      const now = new Date();
      const diffTime = Math.abs(now - recordDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      switch (filters.timeRange) {
        case "week": if (diffDays > 7) return false; break;
        case "month": if (diffDays > 30) return false; break;
        case "quarter": if (diffDays > 90) return false; break;
        default: break;
      }
    }
    return true;
  });

  const getHistoryStats = () => {
    return {
      totalServices: history.length,
      totalSpent: history.reduce((sum, record) => {
        const cost = parseInt(record.cost.replace(/[^\d]/g, ''));
        return sum + cost;
      }, 0),
      avgService: history.length ? Math.round(
        history.reduce((sum, record) => {
          const cost = parseInt(record.cost.replace(/[^\d]/g, ''));
          return sum + cost;
        }, 0) / history.length
      ) : 0,
      avgDays: history.length > 1 ? Math.round(
        history.reduce((sum, record, index) => {
          if (index === 0) return sum;
          const prevDate = new Date(history[index - 1].date);
          const currDate = new Date(record.date);
          const diffTime = Math.abs(currDate - prevDate);
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          return sum + diffDays;
        }, 0) / (history.length - 1)
      ) : 0
    };
  };

  const stats = getHistoryStats();

  return (
    <div className="screen-content active" id="service-history">
      <div className="screen-header history-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">📋</span>
              <h1>Service History</h1>
            </div>
            <p className="header-subtitle">Complete record of all automotive services</p>
            <div className="status-badge">
              <div className="status-dot"></div>
              {stats.totalServices} total services • R {stats.totalSpent.toLocaleString()} lifetime value
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="history-filters">
        <div>
          <label htmlFor="vehicle-filter">Vehicle:</label>
          <select 
            id="vehicle-filter"
            className="filter-select"
            value={filters.vehicle}
            onChange={(e) => setFilters(prev => ({ ...prev, vehicle: e.target.value }))}
          >
            <option value="all">All Vehicles</option>
            {vehicles.map(vehicle => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.makeModel}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="service-filter">Service Type:</label>
          <select 
            id="service-filter"
            className="filter-select"
            value={filters.service}
            onChange={(e) => setFilters(prev => ({ ...prev, service: e.target.value }))}
          >
            <option value="all">All Services</option>
            <option value="oil">Oil Change</option>
            <option value="general">General Service</option>
            <option value="brake">Brake Check</option>
            <option value="diagnostic">Diagnostics</option>
          </select>
        </div>

        <div>
          <label htmlFor="time-filter">Time Range:</label>
          <select 
            id="time-filter"
            className="filter-select"
            value={filters.timeRange}
            onChange={(e) => setFilters(prev => ({ ...prev, timeRange: e.target.value }))}
          >
            <option value="all">All Time</option>
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="quarter">Last Quarter</option>
          </select>
        </div>
      </div>

      {/* Service History Timeline */}
      <div className="history-timeline">
        {filteredHistory.length === 0 ? (
          <div className="timeline-item">
            <div className="service-card" style={{ textAlign: 'center', padding: '40px' }}>
              <h3>No service records found</h3>
              <p>There are no services matching the current filters.</p>
              <Button 
                variant="primary" 
                onClick={() => setFilters({ vehicle: "all", service: "all", timeRange: "all" })}
                style={{ marginTop: '16px' }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        ) : (
          filteredHistory.map((record) => (
            <div key={record.id} className="timeline-item">
              <div className="timeline-date">
                {new Date(record.date).toLocaleDateString('en-ZA', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
              <div className={`service-card ${record.status}`}>
                <div className="service-header">
                  <div className="service-info">
                    <h3>{record.service}</h3>
                    <p>{record.vehicle} • Mechanic: {record.mechanic}</p>
                    <p>Duration: {record.duration}</p>
                  </div>
                  <div className="service-cost">{record.cost}</div>
                </div>
                <div className="service-details">
                  <p>{record.description}</p>
                  <div className="service-tags">
                    {record.tags.map((tag, index) => (
                      <span key={index} className="tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* History Summary */}
      {filteredHistory.length > 0 && (
        <div className="history-summary">
          <h3>Service Summary</h3>
          <div className="summary-stats">
            <div className="summary-stat">
              <div className="stat-icon">🔧</div>
              <div className="stat-value">{stats.totalServices}</div>
              <div className="stat-label">Total Services</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">💰</div>
              <div className="stat-value">R {stats.totalSpent.toLocaleString()}</div>
              <div className="stat-label">Total Spent</div>
            </div>
            <div className="summary-stat">
              <div className="stat-icon">📊</div>
              <div className="stat-value">R {stats.avgService.toLocaleString()}</div>
              <div className="stat-label">Avg Service</div>
            </div>
            {stats.avgDays > 0 && (
              <div className="summary-stat">
                <div className="stat-icon">⏱️</div>
                <div className="stat-value">{stats.avgDays}</div>
                <div className="stat-label">Days Between Services</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}