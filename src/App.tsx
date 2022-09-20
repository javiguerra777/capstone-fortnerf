/* eslint-disable react/jsx-no-constructed-context-values */
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
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
import UserContext from './context/Context';
import ProtectedRoutes from './components/ProtectedRoutes';
import { User } from './types/AppTypes';

function App() {
  const [user, setUser] = useState<User>({
    username: '',
    name: '',
    email: '',
    loggedIn: false,
  });
  return (
    <UserContext.Provider
      value={{ user, setUser } as unknown as User}
    >
      <Routes>
        <Route path="/" element={<Main />}>
          <Route index element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/emailvalidation"
            element={<ValidateEmail />}
          />
          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoutes loggedIn={user.loggedIn}>
                <Dashboard />
              </ProtectedRoutes>
            }
          />

          <Route
            path="/userinfo"
            element={
              <ProtectedRoutes loggedIn={user.loggedIn}>
                <UserInfo />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/createserver"
            element={
              <ProtectedRoutes loggedIn={user.loggedIn}>
                <CreateNewServer />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/game/:id"
            element={
              <ProtectedRoutes loggedIn={user.loggedIn}>
                <Game />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/singleplayer"
            element={
              <ProtectedRoutes loggedIn={user.loggedIn}>
                <SinglePlayer />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
