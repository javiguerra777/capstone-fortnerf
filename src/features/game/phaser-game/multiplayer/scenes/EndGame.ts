import Phaser from 'phaser';
import getStore from '../../utils/store';
import { socket } from '../../../../../common/service/socket';
import TextBox from '../../objects/TextBox';

class EndGame extends Phaser.Scene {
  gameRoom!: string;

  gameOverText!: Phaser.GameObjects.Text;

  returnToLobbyText!: Phaser.GameObjects.Text;

  error!: string;

  winnerText!: TextBox;

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
    console.log(gameData);
    this.scene.remove('FortNerf');
    const { width } = this.sys.game.canvas;
    this.add.image(1000, 1000, 'background');
    this.gameOverText = new TextBox(
      this,
      width / 2 - 200,
      100,
      'Game Over',
    );
    this.gameOverText.setFontSize(30);
    // method that starts new scene
    const endGame = async () => {
      try {
        await socket.emit('GameOver', this.gameRoom);
        await socket.emit('return_to_lobby', { room: this.gameRoom });
      } catch (err) {
        this.error = err.message;
      }
    };
    this.returnToLobbyText = new TextBox(
      this,
      width / 2 + 200,
      100,
      'Return To Lobby',
    )
      .setInteractive()
      .on('pointerdown', endGame);
    this.returnToLobbyText.setFontSize(30);

    this.winnerText = new TextBox(
      this,
      width / 2,
      300,
      `Winner: ${gameData.winner}`,
    ).setFontSize(15);
  }

  update() {
    const { width } = this.sys.game.canvas;
    this.gameOverText.setX(width / 2 - 200);
    this.returnToLobbyText.setX(width / 2 + 200);
    this.winnerText.setX(width / 2);
  }
}

export default EndGame;
