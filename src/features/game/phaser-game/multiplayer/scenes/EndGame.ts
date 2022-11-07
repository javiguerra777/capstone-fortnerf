import Phaser from 'phaser';
import store from '../../../../../app/redux';
import { socket } from '../../../../../service/socket';
import TextBox from '../../objects/TextBox';

type UserScore = {
  score: number;
  username: string;
};
class EndGame extends Phaser.Scene {
  gameRoom!: string;

  gameOverText!: Phaser.GameObjects.Text;

  returnToLobbyText!: Phaser.GameObjects.Text;

  textGroup!: Phaser.Physics.Arcade.Group;

  error!: string;

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
    const { width } = this.sys.game.canvas;
    this.add.image(1000, 1000, 'background');
    this.textGroup = this.physics.add.group();
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
        socket.emit('GameOver', this.gameRoom);
        socket.emit('return_to_lobby', { room: this.gameRoom });
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
    // socket methods
    socket.emit('end_game_scores', this.gameRoom);

    socket.on('all_scores', async (data) => {
      try {
        let count = 0;
        data
          ?.sort((a: UserScore, b: UserScore) => b.score - a.score)
          .forEach((user: UserScore) => {
            const score = new TextBox(
              this,
              width / 2,
              150 + 50 * count,
              `Player: ${user.username} score: ${user.score}`,
            );
            score.setFontSize(20);
            this.textGroup.add(score);
            count += 1;
          });
      } catch (err) {
        this.error = err.message;
      }
    });
  }

  update() {
    const { width } = this.sys.game.canvas;
    this.gameOverText.setX(width / 2 - 200);
    this.returnToLobbyText.setX(width / 2 + 200);
    if (this.textGroup.children.entries) {
      this.textGroup.children.entries.forEach((text: any) => {
        text.setX(width / 2);
      });
    }
  }
}

export default EndGame;
