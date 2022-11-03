import Phaser from 'phaser';

const loadCharacters = (scene: Phaser.Scene) => {
  scene.load.atlas(
    'player',
    '/assets/characters/male_player.png',
    '/assets/characters/male_player.json',
  );
  scene.load.atlas(
    'npc',
    '/assets/characters/npc.png',
    '/assets/characters/npc.json',
  );
  scene.load.atlas(
    'soldier',
    '/assets/characters/soldier.png',
    '/assets/characters/soldier.json',
  );
  scene.load.atlas(
    'pumpkin',
    '/assets/characters/pumpkin.png',
    '/assets/characters/pumpkin.json',
  );
  scene.load.atlas(
    'robeman',
    '/assets/characters/robeman.png',
    '/assets/characters/robeman.json',
  );
};

export default loadCharacters;
