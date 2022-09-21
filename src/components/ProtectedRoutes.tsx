import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedProps = {
  loggedIn: boolean;
  children: ReactNode;
};

function ProtectedRoutes({ loggedIn, children }: ProtectedProps) {
  if (!loggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

export default ProtectedRoutes;
