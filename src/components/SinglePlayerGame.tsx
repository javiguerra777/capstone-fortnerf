import React, { useEffect } from 'react';
import Phaser from 'phaser';
import SingleMode from '../phaser-game/scenes/SingleMode';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%',
  },
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    gravity: { y: 0 },
    debug: false,
  },
  parent: 'single-mode',
  scene: [SingleMode],
};
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
