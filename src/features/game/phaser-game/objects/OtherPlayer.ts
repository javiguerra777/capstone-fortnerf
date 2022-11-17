import Phaser from 'phaser';
import createAnimation, { scaleAnims } from '../utils/animations';
import TextBox from './TextBox';

class OtherPlayer extends Phaser.Physics.Arcade.Sprite {
  direction = 'down';

  socketId!: string;

  text;

  moving = false;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
    texture: string,
  ) {
    super(scene, x, y, texture);
    this.setScale(scaleAnims(texture));
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.text = new TextBox(
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

  async handleAnimations() {
    try {
      if (this.moving) {
        if (this.direction === 'right') {
          this.anims.play('right', true);
        } else if (this.direction === 'left') {
          this.anims.play('left', true);
        } else if (this.direction === 'up') {
          this.anims.play('up', true);
        } else if (this.direction === 'down') {
          this.anims.play('down', true);
        }
      } else {
        if (this.direction === 'right') {
          this.anims.play('rightStill', true);
        } else if (this.direction === 'left') {
          this.anims.play('leftStill', true);
        } else if (this.direction === 'up') {
          this.anims.play('upStill', true);
        } else if (this.direction === 'down') {
          this.anims.play('downStill', true);
        }
      }
    } catch (err) {
      if (err instanceof Error) console.log(err.message);
    }
  }
}

export default OtherPlayer;
