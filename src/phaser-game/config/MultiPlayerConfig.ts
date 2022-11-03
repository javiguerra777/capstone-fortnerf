import Phaser from 'phaser';
import FortNerf from '../scenes/FortNerf';
import EndGame from '../scenes/EndGame';
import HomeScene from '../scenes/HomeScene';

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
    arcade: {
      debug: true,
      enableSleeping: true,
    },
  },
  parent: 'main-game',
  scene: [HomeScene, FortNerf, EndGame],
};

export default config;
