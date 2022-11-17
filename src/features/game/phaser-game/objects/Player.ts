import Phaser from 'phaser';
import { PLAYER_MOVEMENT } from '../utils/constants';
import createAnimation, { scaleAnims } from '../utils/animations';
import TextBox from './TextBox';

class Player extends Phaser.Physics.Arcade.Sprite {
  direction = 'down';

  kills = 0;

  health = 100;

  keys;

  playerText;

  movedLastFrame = false;

  pressedKeys: number[] = [];

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    texture: string,
  ) {
    super(scene, x, y, texture);
    this.keys = {
      ...scene.input.keyboard.createCursorKeys(),
      ...scene.input.keyboard.addKeys('W,S,A,D'),
    };
    this.setScale(scaleAnims(texture));
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.playerText = new TextBox(
      scene,
      this.getTopLeft().x - 5,
      this.getTopCenter().y - 20,
      text,
    );
    // movement animations
    createAnimation(this.anims, 'left', texture, 'left', 1, 3);
    createAnimation(this.anims, 'right', texture, 'right', 1, 3);
    createAnimation(this.anims, 'down', texture, 'down', 1, 3);
    createAnimation(this.anims, 'up', texture, 'up', 1, 3);
    // still animations
    createAnimation(this.anims, 'leftStill', texture, 'left', 3, 3);
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
    Object.entries(this.keys).forEach((key: [string, any]) => {
      if (key[1].isDown) {
        if (
          !this.pressedKeys.includes(key[1].keyCode) &&
          key[0] !== 'shift' &&
          key[0] !== 'space'
        ) {
          this.pressedKeys.push(key[1].keyCode);
        }
      }
      if (key[1].isUp) {
        this.pressedKeys = this.pressedKeys.filter(
          (theKey: number) => theKey !== key[1].keyCode,
        );
      }
    });
    const lastKey = this.pressedKeys.slice(-1)[0];
    if (this.playerText) {
      this.playerText?.setX(this.getTopLeft().x - 5);
      this.playerText?.setY(this.getTopCenter().y - 20);
    }
    // player movement
    if (lastKey === 38 || lastKey === 87) {
      playerMoved = true;
      this.direction = 'up';
      this.setVelocityY(-PLAYER_MOVEMENT * speed);
      this.setVelocityX(0);
      this.anims.play('up', true);
    } else if (lastKey === 40 || lastKey === 83) {
      playerMoved = true;
      this.direction = 'down';
      this.setVelocityY(PLAYER_MOVEMENT * speed);
      this.setVelocityX(0);
      this.anims.play('down', true);
    } else if (lastKey === 37 || lastKey === 65) {
      playerMoved = true;
      this.direction = 'left';
      this.setVelocityX(-PLAYER_MOVEMENT * speed);
      this.setVelocityY(0);
      this.anims.play('left', true);
    } else if (lastKey === 39 || lastKey === 68) {
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
    return playerMoved;
  }

  // methods for single player mode
  disableKeys() {
    Object.entries(this.keys).forEach((key: [string, any]) => {
      if (key[0] !== 'space') {
        key[1].enabled = false;
      }
    });
  }

  enableKeys() {
    Object.entries(this.keys).forEach((key: [string, any]) => {
      key[1].enabled = true;
    });
  }
}

export default Player;
