import Phaser from 'phaser';

class Box extends Phaser.GameObjects.DOMElement {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    element: string,
    style: string,
    text: string,
  ) {
    super(scene, x, y, element, style, text);
    this.scrollFactorX = 0;
    this.scrollFactorY = 0;
    this.scene.add.existing(this);
  }
}

export default Box;
