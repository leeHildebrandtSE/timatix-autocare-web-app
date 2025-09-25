// src/hooks/useAuth.jsx - FIXED VERSION
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Fixed: Use named import

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};