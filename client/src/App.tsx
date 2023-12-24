import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { shallowEqual, useSelector, useDispatch } from 'react-redux';
import Main from './pages/Main';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Contact from './pages/Contact';
import About from './pages/About';
import CreateNewServer from './pages/CreateNewServer';
import Dashboard from './pages/Dashboard';
import UserInfo from './pages/UserInfo';
import ValidateEmail from './pages/ValidateEmail';
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
      <Route path="/" element={<Main />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/emailvalidation" element={<ValidateEmail />} />
        {/* Protected Routes */}
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
      </Route>
      {/* Not Found Page */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
