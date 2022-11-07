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

export default createAnimation;
