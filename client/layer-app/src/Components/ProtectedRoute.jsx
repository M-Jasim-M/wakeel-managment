import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserSession } from './UserSessionContext';

function ProtectedRoutes({ children }) {
  const userSession = useUserSession();
  const userTypeData = JSON.parse(localStorage.getItem('userSession'));
  const userType = userTypeData ? userTypeData.user.userType : null;

  // If there is no session or userType is not 'layer', navigate to the login page
  if (!userSession.token || userType !== 'layer') {
    return <Navigate to="/login" />;
  }

  // Render the children only if there is a session and userType is 'layer'
  return children;
}

export default ProtectedRoutes;
