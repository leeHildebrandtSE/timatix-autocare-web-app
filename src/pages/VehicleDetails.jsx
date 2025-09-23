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
    navigate("/book");
  };

  const handleViewHistory = () => {
    setViewingHistory(true);
    navigate("/history");
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading vehicles...");
        const vehicles = await listVehicles();
        if (!mounted) return;
        setList(vehicles);
        if (vehicles.length) setVehicle(vehicles[0]);
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

  if (!vehicle) {
    return (
      <div style={{ minHeight: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading vehicle...</div>
      </div>
    );
  }

  return (
    <div className="screen-content active" id="vehicle-details">
      <div className="screen-header vehicle-header client-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">🚗</span>
              <h1>{vehicle.makeModel}</h1>
            </div>
            <p className="header-subtitle">License: {vehicle.license} • VIN: {vehicle.vin}</p>
            <div className="status-badge">
              <div className="status-dot" />
              Active • Last service: {vehicle.lastServiceDays} days ago
            </div>
          </div>

          <div className="vehicle-actions">
            <Button variant="primary" onClick={handleSchedule} isLoading={scheduling} type="button">
              Schedule Service
            </Button>
            <Button variant="secondary" onClick={handleViewHistory} isLoading={viewingHistory} type="button">
              View History
            </Button>
          </div>
        </div>
      </div>

      <div className="vehicle-overview">
        <div className="vehicle-stats-grid" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <StatCard icon="📊" value={`${vehicle.miles.toLocaleString()}`} label="Total Miles" />
          <StatCard icon="⛽" value={`${vehicle.mpg}`} label="MPG Average" />
          <StatCard icon="🔧" value={vehicle.services} label="Services" />
          <StatCard icon="💰" value={vehicle.totalSpent} label="Total Spent" />
        </div>

        <section style={{ marginTop: 20 }}>
          <h3>Your vehicles</h3>
          <div className="vehicle-list" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {list.map(v => (
              <div 
                key={v.id} 
                className="vehicle-mini" 
                onClick={() => setVehicle(v)} 
                style={{ 
                  cursor: "pointer", 
                  padding: 10, 
                  border: v.id === vehicle.id ? "2px solid #667eea" : "1px solid #e5e7eb", 
                  borderRadius: 8,
                  backgroundColor: "var(--bg-surface)"
                }}
              >
                <div style={{ fontWeight: 600 }}>{v.makeModel}</div>
                <div style={{ fontSize: 12 }}>{v.license}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}