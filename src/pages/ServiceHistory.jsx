import React, { useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";
import { useLoading } from "../hooks/useLoading";

export default function ServiceHistory() {
  const [history, setHistory] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading service history...");
        const data = await mockApi.getServiceHistory();
        if (!mounted) return;
        setHistory(data);
      } catch (err) {
        console.error("Failed to load service history", err);
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading]);

  return (
    <div className="container">
      <h1 className="page-title">Service History</h1>
      <div className="history-list">
        {history.map((record) => (
          <div key={record.id} className="history-card">
            <h3>{record.vehicle}</h3>
            <p>{record.service}</p>
            <span className="history-date">
              📅 {new Date(record.date).toLocaleDateString()}
            </span>
            <span className={`status-badge ${record.status}`}>
              {record.status === "completed" && "✔ Completed"}
              {record.status === "pending" && "⏳ Pending"}
              {record.status === "cancelled" && "❌ Cancelled"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
