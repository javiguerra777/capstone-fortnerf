import Phaser from 'phaser';
import store from '../../store';
import { socket } from '../../service/socket';

class EndGame extends Phaser.Scene {
  gameRoom!: string;

  constructor() {
    super('EndGame');
  }

  preload() {
    const state = store.getState();
    const { id } = state.game;
    this.gameRoom = id;
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
    // method that starts new scene
    const endGame = async () => {
      try {
        socket.emit('return_to_lobby', { room: this.gameRoom });
      } catch (err) {
        // want catch block to do nothing
      }
    };
    this.add
      .text(500, 400, 'Return To Lobby')
      .setInteractive()
      .on('pointerdown', endGame);
  }
}

export default EndGame;
