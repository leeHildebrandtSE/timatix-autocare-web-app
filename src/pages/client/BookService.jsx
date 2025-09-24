import React, { useEffect, useState } from "react";
import { listVehicles, createBooking } from "../../api/mockApi";
import { useLoading } from "../../hooks/useLoading";
import Button from "../../components/ui/Button";
import { useToast } from "../../hooks/useToast";

export default function BookService() {
  const [vehicles, setVehicles] = useState([]);
  const [vehicleId, setVehicleId] = useState(null);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [serviceType, setServiceType] = useState("General Service");
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading available services...");
        const v = await listVehicles();
        if (!mounted) return;
        setVehicles(v);
        if (v.length) setVehicleId(v[0].id);
      } catch (err) {
        console.error("Failed to load vehicles", err);
        showToast({ type: "error", message: "Failed to load vehicles" });
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  async function submit(e) {
    e.preventDefault();
    setSubmitting(true);
    if (!vehicleId || !date || !time) {
      setStatus({ type: "error", message: "Choose vehicle, date and time." });
      setSubmitting(false);
      return;
    }
    const payload = {
      vehicleId: Number(vehicleId),
      date,
      time,
      notes,
      serviceType
    };
    try {
      const res = await createBooking(payload);
      setStatus({ type: "success", message: `Booking created (id ${res.id})` });
      setNotes("");
      setDate("");
      setTime("");
      showToast({ type: "success", message: `Booking created (id ${res.id})` });
      setSubmitting(false);
    } catch (err) {
      setStatus({ type: "error", message: err.message });
      showToast({ type: "error", message: err.message });
      setSubmitting(false);
    }
  }

  return (
    <div className="screen-content" id="service-booking">
      <div className="screen-header booking-header client-header">
        <div className="header-content">
          <div>
            <div className="header-title"><span className="header-emoji">📅</span><h1>Book a Service</h1></div>
            <p className="header-subtitle">Schedule your next service appointment</p>
          </div>
        </div>
      </div>

      <form className="booking-form" onSubmit={submit}>
        <div className="form-section">
          <h3>Select Vehicle</h3>
          <select value={vehicleId ?? ""} onChange={e => setVehicleId(e.target.value)}>
            {vehicles.map(v => <option key={v.id} value={v.id}>{v.makeModel} ({v.license})</option>)}
          </select>
        </div>

        <div className="form-section">
          <h3>Service Type</h3>
          <select value={serviceType} onChange={e => setServiceType(e.target.value)}>
            <option>General Service</option>
            <option>Oil Change</option>
            <option>Brake Check</option>
            <option>Diagnostics</option>
          </select>
        </div>

        <div className="form-section">
          <h3>Date & Time</h3>
          <div style={{ display: "flex", gap: 12 }}>
            <input type="date" value={date} onChange={e => setDate(e.target.value)} />
            <select value={time} onChange={e => setTime(e.target.value)}>
              <option value="">Select time</option>
              <option value="08:00">08:00</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:00">11:00</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h3>Notes</h3>
          <textarea value={notes} onChange={e => setNotes(e.target.value)} rows="4" />
        </div>

        <div className="form-section">
            <h3>Booking Summary</h3>
            <div className="booking-summary" style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-color)",
                borderRadius: "var(--border-radius-md)",
                padding: "var(--spacing-md)",
                marginBottom: "var(--spacing-md)"
            }}>
                <div className="summary-row"><span>Vehicle:</span> <span>{vehicles.find(v => v.id === Number(vehicleId))?.makeModel || "Select vehicle"}</span></div>
                <div className="summary-row"><span>Service:</span> <span>{serviceType}</span></div>
                <div className="summary-row"><span>Date:</span> <span>{date || "Select date"}</span></div>
                <div className="summary-row"><span>Time:</span> <span>{time || "Select time"}</span></div>
                <div className="summary-row"><span>Estimated Cost:</span> <span>{serviceType === "Oil Change" ? "R 950" : "R 1200+"}</span></div>
            </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <Button variant="primary" type="submit" isLoading={submitting}>Confirm Booking</Button>
          {status && <div style={{ marginTop: 8, color: status.type === "error" ? "crimson" : "green" }}>{status.message}</div>}
        </div>
      </form>
    </div>
  );
}

