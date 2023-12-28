import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import RegistrationRoutes from './features/registration/Registration.routes';
import GameRoutes from './features/game/Game.routes';
import DashboardRoutes from './features/dashboard/Dashboard.routes';
import DirectMessagesRoutes from './features/direct-messages/DirectMessages.routes';
import NotFound from './common/components/NotFound';
import ProtectedRoutes from './common/components/ProtectedRoutes';
import UseGetUserFromStore from './common/hooks/UseGetUserFromStore.hook';
import { socket } from './common/service/socket';
import DirectMessageNotifications from './common/components/DirectMessageNotifications';

function App() {
  const { loggedIn, id } = UseGetUserFromStore();
  useEffect(() => {
    if (id) {
      socket.emit('joinMyRoom', id);
    }
  }, [id]);
  return (
    <>
      <ToastContainer />
      <DirectMessageNotifications />
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
