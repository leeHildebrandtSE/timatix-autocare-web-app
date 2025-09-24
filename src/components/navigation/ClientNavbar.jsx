// ClientNavbar.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const ClientNavbar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const isActive = (path) => location.pathname.includes(path);
  
  const navItems = [
    { path: '/client/dashboard', name: 'Dashboard', icon: '🏠' },
    { path: '/client/vehicles', name: 'My Vehicles', icon: '🚗' },
    { path: '/client/book-service', name: 'Book Service', icon: '📅' },
    { path: '/client/service-history', name: 'History', icon: '📋' }
  ];
  
  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/client/dashboard" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              T
            </div>
            <span className="text-xl font-bold text-gray-800">Timatix AutoCare</span>
          </Link>
          
          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  isActive(item.path.split('/')[2])
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <span>{item.icon}</span>
                <span>{item.name}</span>
              </Link>
            ))}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center gap-4">
            <Link
              to="/profile"
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <span className="hidden md:block font-medium text-gray-700">{user?.name}</span>
            </Link>
            <button
              onClick={logout}
              className="text-gray-600 hover:text-red-600 px-3 py-2 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default ClientNavbar;