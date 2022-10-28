import Phaser from 'phaser';
import { style } from '../utils/constants';

class TextBox extends Phaser.GameObjects.Text {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    text: string,
  ) {
    super(scene, x, y, text, style);
    this.scene.add.existing(this);
  }
}

export default TextBox;
