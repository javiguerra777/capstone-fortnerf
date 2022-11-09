import Phaser from 'phaser';
import HomeScene from '../scenes/HomeScene';
import FortNerf from '../scenes/FortNerf';
import EndGame from '../scenes/EndGame';

const config = {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.RESIZE,
    width: '100%',
    height: '100%',
  },
  dom: {
    createContainer: true,
  },
  backgroundColor: '#ffffff',
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
      enableSleeping: true,
    },
  },
  parent: 'main-game',
  scene: [HomeScene, FortNerf, EndGame],
};

export default config;
