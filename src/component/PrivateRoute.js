import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../config/AuthContext'; // Assuming you have an AuthContext

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();

  return currentUser ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
