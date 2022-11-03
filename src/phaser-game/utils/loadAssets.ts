const loadCharacters = (game: any) => {
  game.load.atlas(
    'player',
    '/assets/characters/male_player.png',
    '/assets/characters/male_player.json',
  );
  game.load.atlas(
    'npc',
    '/assets/characters/npc.png',
    '/assets/characters/npc.json',
  );
  game.load.atlas(
    'soldier',
    '/assets/characters/soldier.png',
    '/assets/characters/soldier.json',
  );
  game.load.atlas(
    'pumpkin',
    '/assets/characters/pumpkin.png',
    '/assets/characters/pumpkin.json',
  );
  game.load.atlas(
    'robeman',
    '/assets/characters/robeman.png',
    '/assets/characters/robeman.json',
  );
};

export default loadCharacters;
