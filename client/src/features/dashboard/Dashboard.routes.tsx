import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFound from '../../common/components/NotFound';
import CreateNewServer from './pages/CreateNewServer';
import Dashboard from './pages/Dashboard';
import UserInfo from './pages/UserInfo';

export default function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/createserver" element={<CreateNewServer />} />
      <Route path="/userinfo" element={<UserInfo />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
