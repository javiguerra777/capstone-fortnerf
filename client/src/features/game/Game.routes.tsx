import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Game from './pages/Game';
import SinglePlayer from './pages/SinglePlayer';
import NotFound from '../../common/components/NotFound';

export default function GameRoutes() {
  return (
    <Routes>
      <Route path="/game/:id" element={<Game />} />
      <Route path="/singleplayer" element={<SinglePlayer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
