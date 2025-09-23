import React, { useEffect, useState } from "react";
import { mockApi } from "../services/mockApi";
import { useLoading } from "../hooks/useLoading";

export default function Jobs() {
  const [jobs, setJobs] = useState([]);
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        showLoading("Loading jobs...");
        const data = await mockApi.getJobs();
        if (!mounted) return;
        setJobs(data);
      } catch (err) {
        console.error("Failed to load jobs", err);
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
      <h1 className="page-title">Jobs</h1>
      <div className="job-list">
        {jobs.map((job) => (
          <div key={job.id} className="job-card">
            <div className="job-header">
              <div className="job-info">
                <h3>{job.title}</h3>
                <p>Vehicle: {job.vehicle}</p>
              </div>
              <span className={`job-status ${job.status}`}>{job.status}</span>
            </div>
            <div className="job-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${job.progress}%` }}></div>
              </div>
              <span>{job.progress}% Complete</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
