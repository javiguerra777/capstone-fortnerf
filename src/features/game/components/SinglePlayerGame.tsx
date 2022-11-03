import React, { useEffect } from 'react';
import Phaser from 'phaser';
import config from '../phaser-game/single-player/config/SinglePlayerConfig';

function SinglePlayerGame() {
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    return () => {
      phaserGame.destroy(true);
    };
  }, []);
  return (
    <div
      id="single-mode"
      style={{ width: '100vw', height: '65vh' }}
    />
  );
}

export default SinglePlayerGame;
