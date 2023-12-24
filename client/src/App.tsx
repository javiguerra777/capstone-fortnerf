import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import RegistrationRoutes from './features/registration/Registration.routes';
import GameRoutes from './features/game/Game.routes';
import DashboardRoutes from './features/dashboard/Dashboard.routes';
import NotFound from './common/components/NotFound';
import ProtectedRoutes from './common/components/ProtectedRoutes';
import { socket } from './common/service/socket';
import { RootState } from './store';
import { setConnected } from './store/UserSlice';

function App() {
  const dispatch = useDispatch();
  const { loggedIn } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  useEffect(() => {
    // only connect once in entire app when the app loads
    socket.on('connect', () => {
      dispatch(setConnected);
    });
    return () => {
      socket.off('connect');
    };
  }, []);
  return (
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
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
