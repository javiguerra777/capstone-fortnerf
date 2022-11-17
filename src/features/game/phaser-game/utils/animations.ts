import Phaser from 'phaser';

const createAnimation = (
  anims: Phaser.GameObjects.Sprite['anims'],
  keyFrame: string,
  object: string,
  prefix: string,
  startFrame: number,
  endFrame: number,
) => {
  anims.create({
    key: keyFrame,
    frames: anims.generateFrameNames(object, {
      prefix,
      start: startFrame,
      end: endFrame,
      zeroPad: 4,
    }),
    frameRate: 15,
    repeat: -1,
  });
};

export const scaleAnims = (sprite: string) => {
  switch (sprite) {
    case 'link':
      return 0.6;
    case 'papermario':
      return 1;
    default:
      return 1.5;
  }
};

export default createAnimation;
