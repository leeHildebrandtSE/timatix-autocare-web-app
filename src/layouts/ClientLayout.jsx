// ClientLayout.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ClientNavbar from '../components/navigation/ClientNavbar';
import ClientDashboard from '../pages/client/ClientDashboard';
import BookService from '../pages/client/BookService';
import ServiceHistory from '../pages/client/ServiceHistory';
import VehicleDetails from '../pages/client/VehicleDetails';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <ClientNavbar />
      <Routes>
        <Route path="dashboard" element={<ClientDashboard />} />
        <Route path="book-service" element={<BookService />} />
        <Route path="service-history" element={<ServiceHistory />} />
        <Route path="vehicles/:id" element={<VehicleDetails />} />
        <Route path="vehicles" element={<VehicleDetails />} />
        <Route path="*" element={<Navigate to="/client/dashboard" replace />} />
      </Routes>
    </div>
  );
};

export default ClientLayout;