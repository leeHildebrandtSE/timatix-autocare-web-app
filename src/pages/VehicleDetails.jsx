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

  // Helper function to get vehicle avatar/photo
  const getVehicleAvatar = (vehicle) => {
    const vehiclePhotos = {
      'Honda Civic 2019': '🚗',
      'Toyota RAV4 2021': '🚙', 
      'Ford F-150 2020': '🛻',
      'BMW X3 2022': '🚗',
      'Mazda CX-5 2021': '🚙'
    };
    
    // You can replace these with actual image URLs later
    const makeModel = vehicle?.makeModel || '';
    return vehiclePhotos[makeModel] || '🚗';
  };

  // Helper function to get vehicle color theme based on make
  const getVehicleColorTheme = (vehicle) => {
    const makeModel = vehicle?.makeModel || '';
    
    if (makeModel.includes('Honda')) return { primary: '#e60012', secondary: '#b8001a' };
    if (makeModel.includes('Toyota')) return { primary: '#eb0a1e', secondary: '#c4081a' };
    if (makeModel.includes('Ford')) return { primary: '#003478', secondary: '#002a63' };
    if (makeModel.includes('BMW')) return { primary: '#1c69d4', secondary: '#1557b8' };
    if (makeModel.includes('Mazda')) return { primary: '#cc0633', secondary: '#a8052b' };
    
    // Default theme
    return { primary: 'var(--primary-color)', secondary: 'var(--secondary-color)' };
  };

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

  const vehicleTheme = getVehicleColorTheme(vehicle);

  return (
    <div className="screen-content">
      {/* Enhanced Header with Vehicle Avatar */}
      <div className="screen-header vehicle-header client-header">
        <div className="header-content">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--spacing-6)' }}>
            {/* Vehicle Avatar/Photo */}
            <div className="vehicle-avatar-large" style={{
              position: 'relative',
              width: '120px',
              height: '120px',
              borderRadius: 'var(--border-radius-2xl)',
              background: `linear-gradient(135deg, ${vehicleTheme.primary}, ${vehicleTheme.secondary})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '4rem',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3), 0 4px 16px rgba(255, 255, 255, 0.1) inset',
              border: '3px solid rgba(255, 255, 255, 0.2)',
              flexShrink: 0,
              transition: 'all var(--transition-base)',
              overflow: 'hidden'
            }}>
              {/* You can replace this with <img> tag when you have real photos */}
              <span style={{ 
                textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
                animation: 'vehicleFloat 3s ease-in-out infinite' 
              }}>
                {getVehicleAvatar(vehicle)}
              </span>
              
              {/* Status indicator */}
              <div style={{
                position: 'absolute',
                top: '8px',
                right: '8px',
                width: '20px',
                height: '20px',
                background: 'var(--success-color)',
                borderRadius: 'var(--border-radius-full)',
                border: '3px solid rgba(255, 255, 255, 0.9)',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                animation: 'statusPulse 2s ease-in-out infinite'
              }} />

              {/* Reflection overlay */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 50%, rgba(0,0,0,0.1) 100%)',
                borderRadius: 'var(--border-radius-2xl)'
              }} />
            </div>

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

        {/* Enhanced Vehicle Selection with Avatars */}
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
            {list.map(v => {
              const vTheme = getVehicleColorTheme(v);
              return (
                <div 
                  key={v.id} 
                  className={`vehicle-mini ${v.id === vehicle.id ? 'selected' : ''}`}
                  onClick={() => handleVehicleSelect(v)}
                  style={{ position: 'relative' }}
                >
                  {/* Vehicle Mini Avatar */}
                  <div className="vehicle-avatar-mini" style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: 'var(--border-radius-xl)',
                    background: `linear-gradient(135deg, ${vTheme.primary}, ${vTheme.secondary})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '2rem',
                    margin: '0 auto var(--spacing-3)',
                    boxShadow: v.id === vehicle.id 
                      ? '0 4px 20px rgba(99, 102, 241, 0.4), 0 2px 10px rgba(0, 0, 0, 0.1)' 
                      : 'var(--shadow-md)',
                    border: v.id === vehicle.id 
                      ? '2px solid var(--primary-color)' 
                      : '2px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all var(--transition-base)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <span style={{ textShadow: '0 1px 4px rgba(0, 0, 0, 0.3)' }}>
                      {getVehicleAvatar(v)}
                    </span>
                    
                    {/* Selected indicator */}
                    {v.id === vehicle.id && (
                      <div style={{
                        position: 'absolute',
                        top: '4px',
                        right: '4px',
                        width: '12px',
                        height: '12px',
                        background: 'var(--success-color)',
                        borderRadius: '50%',
                        border: '2px solid white',
                        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)'
                      }} />
                    )}

                    {/* Mini reflection */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 60%)',
                      borderRadius: 'var(--border-radius-xl)'
                    }} />
                  </div>

                  <div style={{ 
                    fontWeight: 'var(--font-weight-semibold)',
                    fontSize: 'var(--text-base)',
                    marginBottom: 'var(--spacing-1)',
                    color: v.id === vehicle.id ? 'var(--primary-color)' : 'var(--text-primary)',
                    textAlign: 'center'
                  }}>
                    {v.makeModel}
                  </div>
                  <div style={{ 
                    fontSize: 'var(--text-sm)', 
                    color: 'var(--text-secondary)',
                    fontWeight: 'var(--font-weight-medium)',
                    textAlign: 'center',
                    marginBottom: 'var(--spacing-2)'
                  }}>
                    {v.license}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}>
                    <span>{v.miles.toLocaleString()} mi</span>
                    <span>{v.services} services</span>
                  </div>
                </div>
              );
            })}
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