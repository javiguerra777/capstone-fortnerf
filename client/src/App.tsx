import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import RegistrationRoutes from './features/registration/Registration.routes';
import CreateNewServer from './pages/CreateNewServer';
import Dashboard from './pages/Dashboard';
import UserInfo from './pages/UserInfo';
import Game from './pages/Game';
import SinglePlayer from './pages/SinglePlayer';
import NotFound from './pages/NotFound';
import ProtectedRoutes from './components/ProtectedRoutes';
import { socket } from './service/socket';
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
      <Route path="/*" element={<RegistrationRoutes />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoutes loggedIn={loggedIn}>
            <Dashboard />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/userinfo"
        element={
          <ProtectedRoutes loggedIn={loggedIn}>
            <UserInfo />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/createserver"
        element={
          <ProtectedRoutes loggedIn={loggedIn}>
            <CreateNewServer />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/game/:id"
        element={
          <ProtectedRoutes loggedIn={loggedIn}>
            <Game />
          </ProtectedRoutes>
        }
      />
      <Route
        path="/singleplayer"
        element={
          <ProtectedRoutes loggedIn={loggedIn}>
            <SinglePlayer />
          </ProtectedRoutes>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
