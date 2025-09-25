// src/components/RoleBasedRoute.jsx - FIXED VERSION
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // Fixed import path

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    // Redirect to user's appropriate dashboard
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
  }
  
  return children;
};

export default RoleBasedRoute;