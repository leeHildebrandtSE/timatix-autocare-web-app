// ===== UPDATED App.jsx - FIXED IMPORTS AND STRUCTURE =====

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './providers/AuthProvider'; // Fixed: Import from providers
import { useAuth } from './hooks/useAuth'; // Fixed: Import hook from hooks directory
import { LoadingProvider } from './providers/LoadingProvider';
import { ToastProvider } from './context/ToastContext';
import ErrorBoundary from './components/ErrorBoundary'; // Added error boundary
import LoadingSpinner from './components/common/LoadingSpinner';
import ToastContainer from './components/ui/ToastContainer';

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
    <ErrorBoundary>
      <AuthProvider>
        <LoadingProvider>
          <ToastProvider>
            <Router>
              <div className="App">
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
                
                {/* Global UI Components */}
                <LoadingSpinner />
                <ToastContainer />
              </div>
            </Router>
          </ToastProvider>
        </LoadingProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

// ===== ROLE-BASED REDIRECT COMPONENT =====
const RoleBasedRedirect = () => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your dashboard...</p>
        </div>
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
      console.warn('Unknown user role:', user.role);
      return <Navigate to="/login" replace />;
  }
};

export default App;