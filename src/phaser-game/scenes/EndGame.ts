import Phaser from 'phaser';

class EndGame extends Phaser.Scene {
  constructor() {
    super('EndGame');
  }

  preload() {
    this.load.image(
      'background',
      '/assets/backgrounds/endgame-bkg.jpg',
    );
  }

  create() {
    this.add.image(1000, 1000, 'background');
    this.add.text(200, 200, 'Game Over', {
      fontFamily: 'Georgia, "Goudy Bookletter 1911, Times, serif',
      color: '#19de65',
    });
  }
}

export default EndGame;
