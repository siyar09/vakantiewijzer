import React from 'react';
import { useAuth } from '../../context/AuthContext';
import LoginRequired from '../LoginRequired/LoginRequired';

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <Component {...rest} /> : <LoginRequired />;
};

export default ProtectedRoute;