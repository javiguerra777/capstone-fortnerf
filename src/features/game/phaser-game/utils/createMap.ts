import Phaser from 'phaser';
import { MAP_SCALE } from './constants';

export const createMap = (scene: Phaser.Scene, key: string) => {
  const map: any = scene.make.tilemap({ key });
  scene.physics.world.setBounds(
    0,
    0,
    map.widthInPixels * MAP_SCALE,
    map.heightInPixels * MAP_SCALE,
  );
  scene.cameras.main.setBounds(
    0,
    0,
    map.widthInPixels * MAP_SCALE,
    map.heightInPixels * MAP_SCALE,
  );
  return map;
};

export default {};
