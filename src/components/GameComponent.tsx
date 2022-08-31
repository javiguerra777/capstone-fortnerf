import React, { useEffect } from 'react';
import Phaser from 'phaser';
import HelloWorldScene from '../phaser-game/scenes/HelloWorldScene';

const config = {
  type: Phaser.AUTO,
  // scale: {
  //   mode: Phaser.Scale.ScaleModes.RESIZE,
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // },
  width: 800,
  height: 600,
  backgroundColor: '#93cbee',
  physics: {
    default: 'arcade',
    gravity: { y: 0 },
    debug: false,
  },
  parent: 'main-game',
  autoFocus: true,
  scene: [HelloWorldScene],
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
