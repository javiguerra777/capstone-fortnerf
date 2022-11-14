import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import config from '../phaser-game/multiplayer/config/MultiPlayerConfig';

type styleProps = {
  width: string;
};
function GameComponent({ width }: styleProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    // when component unmounts
    return () => {
      phaserGame.destroy(false, false);
    };
  }, []);
  return (
    <div
      id="main-game"
      style={{ height: '94vh', width }}
      aria-label="canvas element"
      ref={gameRef}
    />
  );
}

export default GameComponent;
