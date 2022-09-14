import React, { useEffect } from 'react';
import Phaser from 'phaser';
// import { GridEngine } from 'grid-engine';
import FortNerf from '../phaser-game/scenes/FortNerf';

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
  // plugins: {
  //   scene: [
  //     {
  //       key: 'gridEngine',
  //       plugin: GridEngine,
  //       mapping: 'gridEngine',
  //     },
  //   ],
  // },
  parent: 'main-game',
  scene: [FortNerf],
};
type styleProps = {
  width: string;
};
function GameComponent({ width }: styleProps) {
  const clickEvent = () => {
    console.log('hello I am clicked');
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
      onKeyDown={clickEvent}
      aria-label="canvas element"
    />
  );
}

export default GameComponent;
