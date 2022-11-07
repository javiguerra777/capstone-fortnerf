import Phaser from 'phaser';

const distanceChecker = (
  obj1: Phaser.Physics.Arcade.Sprite,
  obj2: Phaser.Physics.Arcade.Sprite,
) => {
  if (!obj2) {
    return false;
  }
  const xDistance = obj1.x - obj2.x;
  const yDistance = obj1.y - obj2.y;
  if (
    (Math.abs(xDistance) <= 50 && Math.abs(yDistance) <= 40) ||
    (Math.abs(xDistance) <= 40 && Math.abs(yDistance) <= 50)
  ) {
    return true;
  }
  return false;
};

export default distanceChecker;
