import Phaser from 'phaser';
import getStore from '../../utils/store';
import { socket } from '../../../../../common/service/socket';
import Box from '../../objects/DialogueBox';

class EndGame extends Phaser.Scene {
  gameRoom!: string;

  gameOverText!: Box;

  returnToLobbyText!: Box;

  error!: string;

  winnerText!: Box;

  constructor() {
    super('EndGame');
  }

  preload() {
    const {
      game: { id },
    } = getStore();
    this.gameRoom = id;
    this.load.image(
      'background',
      '/assets/backgrounds/endgame-bkg.jpg',
    );
  }

  create(gameData: any) {
    this.scene.remove('FortNerf');
    const { width } = this.sys.game.canvas;
    this.add.image(1000, 1000, 'background');
    this.gameOverText = new Box(
      this,
      width / 2,
      40,
      'div',
      `color: white; font-size: 40px; width: 100%; text-align: center; padding-bottom: 10px; border-bottom: solid 2px white;`,
      'Game Over',
    );
    // method that starts new scene
    const endGame = async () => {
      try {
        await socket.emit('GameOver', this.gameRoom);
        await socket.emit('return_to_lobby', { room: this.gameRoom });
      } catch (err) {
        console.log(err.message);
        this.error = err.message;
      }
    };
    this.winnerText = new Box(
      this,
      width / 2,
      150,
      'div',
      'color: gold; font-size: 50px; background: whitesmoke; padding: 10px; border: groove 5px gold; border-radius: 10px; text-shadow: 0 0 3px #FF0000, 0 0 5px #0000FF',
      `Winner: ${gameData.winner || 'winner'} !!`,
    );
    this.returnToLobbyText = new Box(
      this,
      width / 2,
      400,
      'button',
      'color: white; background: none; border: solid 2px white; font-size: 50px; border-radius: 10px;',
      'Return To Lobby',
    )
      .setInteractive()
      .on('pointerdown', endGame);
  }

  update() {
    const { width } = this.sys.game.canvas;
    this.gameOverText.setX(width / 2);
    this.returnToLobbyText.setX(width / 2);
    this.winnerText.setX(width / 2);
  }
}

export default EndGame;
