import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
// import FortNerf from '../phaser-game/scenes/FortNerf';
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
  parent: 'main-game',
  scene: [SingleMode],
};
type styleProps = {
  width: string;
};
function GameComponent({ width }: styleProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const clickEvent = () => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
    // window.addEventListener('keydown',);
  };
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    // when component unmounts
    return () => {
      phaserGame.destroy(true);
    };
  }, []);
  return (
    <div
      id="main-game"
      style={{ height: '94vh', width }}
      role="button"
      onClick={clickEvent}
      tabIndex={0}
      onKeyDown={() => null}
      aria-label="canvas element"
      ref={canvasRef}
    />
  );
}

export default GameComponent;
