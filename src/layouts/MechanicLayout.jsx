// MechanicLayout.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MechanicNavbar from '../components/navigation/MechanicNavbar';
import MechanicDashboard from '../pages/mechanic/MechanicDashboard';
import ActiveJobs from '../pages/mechanic/ActiveJobs';
import JobDetails from '../pages/mechanic/JobDetails';
import TimeTracking from '../pages/mechanic/TimeTracking';

const MechanicLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <MechanicNavbar />
      <Routes>
        <Route path="dashboard" element={<MechanicDashboard />} />
        <Route path="active-jobs" element={<ActiveJobs />} />
        <Route path="jobs/:jobId" element={<JobDetails />} />
        <Route path="time-tracking" element={<TimeTracking />} />
        <Route path="*" element={<Navigate to="/mechanic/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default MechanicLayout;