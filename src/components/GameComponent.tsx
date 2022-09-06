import React, { useEffect } from 'react';
import Phaser from 'phaser';
// import { GridEngine } from 'grid-engine';
import FortNerf from '../phaser-game/scenes/FortNerf';

const config = {
  type: Phaser.AUTO,
  // scale: {
  //   mode: Phaser.Scale.ScaleModes.RESIZE,
  //   width: window.innerWidth,
  //   height: 600,
  // },
  width: window.innerWidth,
  height: 600,
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
function GameComponent() {
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    // when component unmounts
    return () => {
      phaserGame.destroy(true);
    };
  }, []);
  return <div id="main-game" />;
}

export default GameComponent;
