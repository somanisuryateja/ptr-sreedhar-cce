import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import API_BASE_URL from '../utils/api';

const ProtectedRoute = ({ children }) => {
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');

      // If no token or user data, redirect to login
      if (!token || !user) {
        setIsValid(false);
        setIsValidating(false);
        return;
      }

      try {
        // Validate token with backend
        const response = await fetch(`${API_BASE_URL}/api/validate-token`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setIsValid(true);
        } else {
          // Token is invalid, clear storage and redirect
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setIsValid(false);
        }
      } catch (error) {
        // Network error or token invalid
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setIsValid(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, []);

  // Show loading while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0D784D] mx-auto mb-4"></div>
          <p className="text-gray-600">Validating session...</p>
        </div>
      </div>
    );
  }

  // If not valid, redirect to login
  if (!isValid) {
    return <Navigate to="/login" replace />;
  }

  // If valid, render the protected component
  return children;
};

export default ProtectedRoute;
