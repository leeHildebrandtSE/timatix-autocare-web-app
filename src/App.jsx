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
    <>
      {isLoading && <LoadingSpinner message={message} />}
      <NavBar />
      <main style={{ padding: 20 }}>
        <Routes>
          <Route path="/" element={<VehicleDetails />} />
          <Route path="/book" element={<BookService />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/users" element={<Users />} />
          <Route path="/history" element={<ServiceHistory />} />
        </Routes>
      </main>
    </>
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