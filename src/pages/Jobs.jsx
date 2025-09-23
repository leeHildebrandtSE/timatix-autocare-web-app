import React, { useEffect, useState } from "react";
import { listJobs } from "../api/mockApi";
import { useLoading } from "../hooks/useLoading";
import { useToast } from "../hooks/useToast";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { showLoading, hideLoading } = useLoading();
  const { showToast } = useToast();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading jobs...");
        const data = await listJobs();
        if (!mounted) return;
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs", err);
        showToast({ type: "error", message: "Failed to load jobs" });
      } finally {
        hideLoading();
      }
    })();

    return () => {
      mounted = false;
    };
  }, [showLoading, hideLoading, showToast]);

  return (
    <div className="screen-content">
      <div className="screen-header">
        <div className="header-content">
          <div>
            <div className="header-title">
              <span className="header-emoji">⚙️</span>
              <h1>Jobs</h1>
            </div>
            <p className="header-subtitle">Active service jobs and assignments</p>
          </div>
        </div>
      </div>

      <div className="job-list">
        {jobs.length === 0 ? (
          <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
            <h3>No jobs available</h3>
            <p>There are currently no active jobs.</p>
          </div>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <div className="job-header">
                <div className="job-info">
                  <h3>{job.title || `Job #${job.id}`}</h3>
                  <p>Mechanic: {job.mechanic}</p>
                  <p>Status: {job.status}</p>
                </div>
                <div className="job-badges">
                  <span className={`job-badge status-${job.status?.toLowerCase().replace('_', '-') || 'pending'}`}>
                    {job.status || 'PENDING'}
                  </span>
                </div>
              </div>
              <div className="job-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${job.progress || 0}%` }}
                  ></div>
                </div>
                <span>{job.progress || 0}% Complete</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}