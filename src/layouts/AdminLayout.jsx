// AdminLayout.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdminNavbar from '../components/navigation/AdminNavbar';
import AdminDashboard from '../pages/admin/AdminDashboard';
import Users from '../pages/admin/Users';
import Jobs from '../pages/admin/Jobs';
import Reports from '../pages/admin/Reports';
import Settings from '../pages/admin/Settings';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <Routes>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<Users />} />
        <Route path="jobs" element={<Jobs />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;