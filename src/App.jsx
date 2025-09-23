import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import VehicleDetails from "./pages/VehicleDetails";
import BookService from "./pages/BookService";
import Jobs from "./pages/Jobs";
import Users from "./pages/Users";
import ServiceHistory from "./pages/ServiceHistory";
import LoadingSpinner from "./components/common/LoadingSpinner";
import { LoadingProvider } from "./context/LoadingProvider";
import { useLoading } from "./hooks/useLoading";
import { ToastProvider } from "./context/ToastContext";
import ToastContainer from "./components/ui/ToastContainer";

function AppContent() {
  const { isLoading, message } = useLoading();

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column',
      background: 'var(--bg-secondary)'
    }}>
      {isLoading && <LoadingSpinner message={message} />}
      <NavBar />
      <main style={{ 
        flex: 1, 
        padding: 'var(--spacing-6)',
        paddingTop: 'var(--spacing-8)'
      }}>
        <Routes>
          <Route path="/" element={<VehicleDetails />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/history" element={<ServiceHistory />} />
        </Routes>
      </main>
      
      {/* Subtle background pattern */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: `
          radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.05) 0%, transparent 25%),
          radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.05) 0%, transparent 25%)
        `,
        pointerEvents: 'none',
        zIndex: -1
      }} />
    </div>
  );
}

export default function App() {
  return (
    <LoadingProvider>
      <ToastProvider>
        <BrowserRouter>
          <AppContent />
          <ToastContainer />
        </BrowserRouter>
      </ToastProvider>
    </LoadingProvider>
  );
}