import Phaser from 'phaser';
import Bullet from './Bullet';

class Bullets extends Phaser.Physics.Arcade.Group {
  constructor(scene: Phaser.Scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 100,
      key: 'bullet',
      active: false,
      visible: false,
      classType: Bullet,
    });
  }

  fireBullet(x: number, y: number, direction: string) {
    const bullet = this.getFirstDead(false);
    if (bullet) {
      console.log(this);
      bullet.fire(x, y, direction);
    }
  }
}

export default Bullets;
