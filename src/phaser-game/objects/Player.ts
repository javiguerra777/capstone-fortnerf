import Phaser from 'phaser';
import { PLAYER_MOVEMENT, style } from '../utils/constants';
import createAnimation from '../utils/animations';

class Player extends Phaser.Physics.Arcade.Sprite {
  direction = 'down';

  keys!: Phaser.Types.Input.Keyboard.CursorKeys;

  playerText;

  movedLastFrame = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    texture: string,
  ) {
    super(scene, x, y, texture);
    this.keys = this.scene.input.keyboard.createCursorKeys();
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
    this.playerText = this.scene.add.text(
      this.getTopLeft().x - 5,
      this.getTopCenter().y - 20,
      text,
      style,
    );
    // movement animations
    createAnimation(this.anims, 'left', texture, 'left', 1, 3);
    createAnimation(this.anims, 'right', texture, 'right', 1, 3);
    createAnimation(this.anims, 'down', texture, 'down', 1, 3);
    createAnimation(this.anims, 'up', texture, 'up', 1, 3);
    // still animations
    createAnimation(this.anims, 'leftStill', 'player', 'left', 3, 3);
    createAnimation(this.anims, 'rightStill', texture, 'right', 3, 3);
    createAnimation(this.anims, 'downStill', texture, 'down', 3, 3);
    createAnimation(this.anims, 'upStill', texture, 'up', 3, 3);
  }

  movePlayer() {
    let playerMoved = false;
    let speed = 1;
    // player speed changes based on if shift is down
    if (this.keys.shift.isDown) {
      speed = 1.5;
    }
    // player movement
    if (this.keys.up.isDown) {
      console.log(this.keys);
      playerMoved = true;
      this.direction = 'up';
      this.setVelocityY(-PLAYER_MOVEMENT * speed);
      this.setVelocityX(0);
      this.anims.play('up', true);
    } else if (this.keys.down.isDown) {
      playerMoved = true;
      this.direction = 'down';
      this.setVelocityY(PLAYER_MOVEMENT * speed);
      this.setVelocityX(0);
      this.anims.play('down', true);
    } else if (this.keys.left.isDown) {
      playerMoved = true;
      this.direction = 'left';
      this.setVelocityX(-PLAYER_MOVEMENT * speed);
      this.setVelocityY(0);
      this.anims.play('left', true);
    } else if (this.keys.right.isDown) {
      playerMoved = true;
      this.direction = 'right';
      this.setVelocityX(PLAYER_MOVEMENT * speed);
      this.setVelocityY(0);
      this.anims.play('right', true);
    } else {
      playerMoved = false;
      this.setVelocity(0);
      if (this.direction === 'up') {
        this.anims.play('upStill', true);
      } else if (this.direction === 'down') {
        this.anims.play('downStill', true);
      } else if (this.direction === 'left') {
        this.anims.play('leftStill', true);
      } else if (this.direction === 'right') {
        this.anims.play('rightStill', true);
      }
    }
    if (this.playerText) {
      this.playerText?.setX(this.getTopLeft().x - 5);
      this.playerText?.setY(this.getTopCenter().y - 20);
    }
    return playerMoved;
  }
}

export default Player;
