import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DirectMessages from './pages/DirectMessages';
import SideBar from './components/SideBar';
import NotFound from '../../common/components/NotFound';

export default function DirectMessagesRoutes() {
  return (
    <div className="flex flex-row overflow-auto h-screen w-screen">
      <SideBar />
      <Routes>
        <Route index element={<DirectMessages />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}
