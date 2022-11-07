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
  scene.load.atlas(
    'cat',
    '/assets/characters/cat.png',
    '/assets/characters/cat.json',
  );
  scene.load.atlas(
    'dog',
    '/assets/characters/dog.png',
    '/assets/characters/dog.json',
  );
  scene.load.atlas(
    'frosty',
    '/assets/characters/frosty.png',
    '/assets/characters/frosty.json',
  );
  scene.load.atlas(
    'rudolf',
    '/assets/characters/rudolf.png',
    '/assets/characters/rudolf.json',
  );
  scene.load.atlas(
    'santa',
    '/assets/characters/santa.png',
    '/assets/characters/santa.json',
  );
};

export default loadCharacters;
