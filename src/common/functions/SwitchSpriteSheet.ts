import MalePlayer from '../../assets/img/player-img/male_player.png';
import NPC from '../../assets/img/player-img/npc.png';
import Pumpkin from '../../assets/img/player-img/pumpkin.png';
import Robeman from '../../assets/img/player-img/robeman.png';
import Soldier from '../../assets/img/player-img/soldier.png';

const switchSpriteSheet = (sprite: string) => {
  switch (sprite) {
    case 'player':
      return MalePlayer;
    case 'pumpkin':
      return Pumpkin;
    case 'soldier':
      return Soldier;
    case 'robeman':
      return Robeman;
    case 'npc':
      return NPC;
    default:
      return MalePlayer;
  }
};

export default switchSpriteSheet;
