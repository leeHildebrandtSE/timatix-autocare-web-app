// ===== 1. APP.JS - MAIN ROUTING SETUP =====

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';

// Layout Components
import ClientLayout from './layouts/ClientLayout';
import MechanicLayout from './layouts/MechanicLayout';
import AdminLayout from './layouts/AdminLayout';

// Shared Components
import Login from './pages/shared/Login';
import Profile from './pages/shared/Profile';

// Route Guards
import ProtectedRoute from './components/ProtectedRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          
          {/* Protected Routes with Role-Based Access */}
          <Route 
            path="/client/*" 
            element={
              <RoleBasedRoute allowedRoles={['CLIENT']}>
                <ClientLayout />
              </RoleBasedRoute>
            } 
          />
          
          <Route 
            path="/mechanic/*" 
            element={
              <RoleBasedRoute allowedRoles={['MECHANIC']}>
                <MechanicLayout />
              </RoleBasedRoute>
            } 
          />
          
          <Route 
            path="/admin/*" 
            element={
              <RoleBasedRoute allowedRoles={['ADMIN', 'OPS_MANAGER']}>
                <AdminLayout />
              </RoleBasedRoute>
            } 
          />
          
          {/* Shared Protected Routes */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />
          
          {/* Default Redirects */}
          <Route path="/" element={<RoleBasedRedirect />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// ===== 2. ROLE-BASED REDIRECT COMPONENT =====

const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Redirect based on user role
  switch (user.role) {
    case 'CLIENT':
      return <Navigate to="/client/dashboard" replace />;
    case 'MECHANIC':
      return <Navigate to="/mechanic/dashboard" replace />;
    case 'ADMIN':
    case 'OPS_MANAGER':
      return <Navigate to="/admin/dashboard" replace />;
    default:
      return <Navigate to="/login" replace />;
  }
};

export default App;