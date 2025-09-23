import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listVehicles } from "../api/mockApi";
import StatCard from "../components/StatCard";
import Button from "../components/ui/Button";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";

export default function VehicleDetails() {
  const [vehicle, setVehicle] = useState(null);
  const [list, setList] = useState([]);
  const [scheduling, setScheduling] = useState(false);
  const [viewingHistory, setViewingHistory] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSchedule = () => {
    setScheduling(true);
    showToast({ type: "info", message: "Navigating to booking..." });
    setTimeout(() => {
      navigate("/book");
      setScheduling(false);
    }, 800);
  };

  const handleViewHistory = () => {
    setViewingHistory(true);
    showToast({ type: "info", message: "Loading service history..." });
    setTimeout(() => {
      navigate("/history");
      setViewingHistory(false);
    }, 800);
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading your vehicles...");
        const vehicles = await listVehicles();
        if (!mounted) return;
        setList(vehicles);
        if (vehicles.length) {
          setVehicle(vehicles[0]);
          showToast({ type: "success", message: `Loaded ${vehicles.length} vehicle${vehicles.length > 1 ? 's' : ''}` });
        }
      } catch (err) {
        console.error("Failed to load vehicles", err);
        showToast({ type: "error", message: "Failed to load vehicles" });
      } finally {
        hideLoading();
        setScheduling(false);
        setViewingHistory(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  const handleVehicleSelect = (selectedVehicle) => {
    setVehicle(selectedVehicle);
    showToast({ 
      type: "info", 
      message: `Switched to ${selectedVehicle.makeModel}` 
    });
  };

  if (!vehicle) {
    return (
      <div className="screen-content">
        <div className="card text-center" style={{ padding: 'var(--spacing-12)' }}>
          <div style={{ 
            fontSize: 'var(--text-5xl)', 
            marginBottom: 'var(--spacing-6)',
            opacity: 0.5 
          }}>
            🚗
          </div>
          <h3 style={{ marginBottom: 'var(--spacing-4)' }}>Loading your vehicles...</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Please wait while we fetch your vehicle information
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="screen-content">
      {/* Enhanced Header */}
      <div className="screen-header vehicle-header client-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">🚗</span>
              <h1>{vehicle.makeModel}</h1>
            </div>
            <p className="header-subtitle">
              License: <strong>{vehicle.license}</strong> • VIN: <strong>{vehicle.vin}</strong>
            </p>
            <div className="status-badge">
              <div className="status-dot" />
              <span>Active • Last service: {vehicle.lastServiceDays} days ago</span>
            </div>
          </div>

          <div className="vehicle-actions">
            <Button variant="primary" onClick={handleSchedule} isLoading={scheduling}>
              {scheduling ? "Loading..." : "Schedule Service"}
            </Button>
            <Button variant="secondary" onClick={handleViewHistory} isLoading={viewingHistory}>
              {viewingHistory ? "Loading..." : "View History"}
            </Button>
          </div>
        </div>
      </div>

      <div className="vehicle-overview">
        {/* Enhanced Stats Grid */}
        <div className="vehicle-stats-grid">
          <StatCard 
            icon="📊" 
            value={vehicle.miles.toLocaleString()} 
            label="Total Miles" 
          />
          <StatCard 
            icon="⛽" 
            value={`${vehicle.mpg} MPG`} 
            label="Average" 
          />
          <StatCard 
            icon="🔧" 
            value={vehicle.services.toString()} 
            label="Services" 
          />
          <StatCard 
            icon="💰" 
            value={vehicle.totalSpent} 
            label="Total Spent" 
          />
        </div>

        {/* Enhanced Vehicle Selection */}
        <section className="mt-lg">
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            marginBottom: 'var(--spacing-6)'
          }}>
            <h3 style={{ 
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)',
              margin: 0
            }}>
              Your Vehicles
            </h3>
            <div style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              background: 'var(--bg-accent)',
              borderRadius: 'var(--border-radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-weight-medium)',
              color: 'var(--primary-color)'
            }}>
              {list.length} vehicle{list.length > 1 ? 's' : ''}
            </div>
          </div>
          
          <div className="vehicle-list">
            {list.map(v => (
              <div 
                key={v.id} 
                className={`vehicle-mini ${v.id === vehicle.id ? 'selected' : ''}`}
                onClick={() => handleVehicleSelect(v)}
                style={{ position: 'relative' }}
              >
                {v.id === vehicle.id && (
                  <div style={{
                    position: 'absolute',
                    top: 'var(--spacing-2)',
                    right: 'var(--spacing-2)',
                    width: '8px',
                    height: '8px',
                    background: 'var(--success-color)',
                    borderRadius: '50%',
                    border: '2px solid var(--bg-surface)'
                  }} />
                )}
                <div style={{ 
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-base)',
                  marginBottom: 'var(--spacing-1)',
                  color: v.id === vehicle.id ? 'var(--primary-color)' : 'var(--text-primary)'
                }}>
                  {v.makeModel}
                </div>
                <div style={{ 
                  fontSize: 'var(--text-sm)', 
                  color: 'var(--text-secondary)',
                  fontWeight: 'var(--font-weight-medium)'
                }}>
                  {v.license}
                </div>
                <div style={{
                  marginTop: 'var(--spacing-2)',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  justifyContent: 'space-between'
                }}>
                  <span>{v.miles.toLocaleString()} mi</span>
                  <span>{v.services} services</span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div style={{
            marginTop: 'var(--spacing-8)',
            padding: 'var(--spacing-6)',
            background: 'var(--bg-surface)',
            borderRadius: 'var(--border-radius-xl)',
            border: '1px solid var(--border-color)',
            boxShadow: 'var(--shadow-card)'
          }}>
            <h4 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-weight-semibold)',
              marginBottom: 'var(--spacing-4)',
              color: 'var(--text-primary)'
            }}>
              Quick Actions
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'var(--spacing-4)'
            }}>
              <button
                onClick={handleSchedule}
                style={{
                  padding: 'var(--spacing-4)',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--border-radius-lg)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-sm)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📅 Schedule Service
              </button>
              
              <button
                onClick={handleViewHistory}
                style={{
                  padding: 'var(--spacing-4)',
                  background: 'var(--bg-hover)',
                  color: 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-lg)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-base)',
                  fontWeight: 'var(--font-weight-semibold)',
                  fontSize: 'var(--text-sm)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = 'var(--shadow-md)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }}
              >
                📋 View History
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}