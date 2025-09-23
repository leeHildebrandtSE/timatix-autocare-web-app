import { useContext } from 'react';
import { LoadingContext } from '../contexts/LoadingContext'; // Adjust the path as needed

// Hook to use loading context
export const useLoading = () => {
  return useContext(LoadingContext);
};