import React, { useEffect, useCallback } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Contact from './pages/Contact';
import About from './pages/About';
import ValidateEmail from './pages/ValidateEmail';
import HomeNavBar from '../../common/components/HomeNavBar';
import NotFound from '../../common/components/NotFound';
import UseGetUserFromStore from '../../common/hooks/UseGetUserFromStore.hook';

export default function RegistrationRoutes() {
  const navigate = useNavigate();
  const { loggedIn } = UseGetUserFromStore();
  const handleLoggedIn = useCallback(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, [loggedIn, navigate]);
  useEffect(() => {
    handleLoggedIn();
  }, [handleLoggedIn]);
  return (
    <div className="w-screen h-screen overflow-auto bg-black text-white flex flex-col">
      <HomeNavBar />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/emailvalidation" element={<ValidateEmail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
