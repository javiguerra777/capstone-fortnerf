import React from 'react';
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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />}>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/userinfo" element={<UserInfo />} />
        <Route path="/createserver" element={<CreateNewServer />} />
        <Route path="/emailvalidation" element={<ValidateEmail />} />
        <Route path="/game/:id" element={<Game />} />
      </Route>
    </Routes>
  );
}

export default App;
