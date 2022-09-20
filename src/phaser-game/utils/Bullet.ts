import Phaser from 'phaser';

class Bullet extends Phaser.GameObjects.Sprite {
  constructor(scene: any, x: number, y: number) {
    super(scene, x, y, 'bullet', '/assets/bullets/05.png');
    this.scene.add.existing(this);
  }

  // bullet methods
  // shootBullet = (x: number, y: number) => {
  //   this.scene.add.image(x, y, 'bullet', '/assets/bullets/05.png');
  // };
}

export default Bullet;
