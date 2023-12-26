import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import RegistrationRoutes from './features/registration/Registration.routes';
import GameRoutes from './features/game/Game.routes';
import DashboardRoutes from './features/dashboard/Dashboard.routes';
import DirectMessagesRoutes from './features/direct-messages/DirectMessages.routes';
import NotFound from './common/components/NotFound';
import ProtectedRoutes from './common/components/ProtectedRoutes';
import { RootState } from './store';

function App() {
  const { loggedIn } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route index element={<Navigate to="/home" />} />
        <Route path="/home/*" element={<RegistrationRoutes />} />
        <Route
          path="/game/*"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <GameRoutes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <DashboardRoutes />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/direct-messages/*"
          element={
            <ProtectedRoutes loggedIn={loggedIn}>
              <DirectMessagesRoutes />
            </ProtectedRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
