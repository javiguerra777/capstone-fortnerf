import Phaser from 'phaser';
import SingleMode from '../scenes/SingleMode';

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

export default config;
