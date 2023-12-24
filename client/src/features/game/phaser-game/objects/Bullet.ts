import Phaser from 'phaser';
import { BULLET_MOVEMENT } from '../utils/constants';

class Bullet extends Phaser.Physics.Arcade.Sprite {
  // constructor(
  //   scene: Phaser.Scene,
  //   x: number,
  //   y: number,
  //   direction: string,
  // ) {
  //   super(scene, x, y, direction, 'bullet');
  // }

  fire(x: number, y: number, direction: string) {
    this.body.reset(x, y);
    this.setScale(0.2);

    this.setActive(true);
    this.setVisible(true);
    switch (direction) {
      case 'up':
        this.setVelocityY(-BULLET_MOVEMENT);
        this.rotation = -1.55;
        break;
      case 'down':
        this.setVelocityY(BULLET_MOVEMENT);
        this.rotation = 1.55;
        break;
      case 'left':
        this.setVelocityX(-BULLET_MOVEMENT);
        this.flipX = true;
        break;
      case 'right':
        this.setVelocityX(BULLET_MOVEMENT);
        break;
      default:
        break;
    }
  }

  onCreate() {
    this.disableBody(true, true);
  }

  onWorldBounds() {
    this.disableBody(true, true);
    this.destroy();
  }
}

export default Bullet;
