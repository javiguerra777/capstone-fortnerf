import Phaser from 'phaser';
import createAnimation from '../utils/animations';

class NPC extends Phaser.Physics.Arcade.Sprite {
  direction = 'down';

  moving = false;

  dialogue!: string;

  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    texture: string,
  ) {
    super(scene, x, y, texture);
    this.scene.physics.world.enable(this);
    this.scene.add.existing(this);
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

  handleAnimation() {
    this.anims.play('downStill', true);
  }
}

export default NPC;
