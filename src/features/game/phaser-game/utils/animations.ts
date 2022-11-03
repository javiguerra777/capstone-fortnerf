const createAnimation = (
  anims: any,
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

export const handleOtherPlayerAnims = async (otherPlayer: any) => {
  try {
    if (otherPlayer.moving) {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('right', true);
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('left', true);
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('up', true);
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('down', true);
      }
    } else {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('rightStill', true);
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('leftStill', true);
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('upStill', true);
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('downStill', true);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
};

export default createAnimation;
