import MalePlayer from '../../assets/img/player-img/male_player.png';
import NPC from '../../assets/img/player-img/npc.png';
import Pumpkin from '../../assets/img/player-img/pumpkin.png';
import Robeman from '../../assets/img/player-img/robeman.png';
import Cat from '../../assets/img/player-img/cat.png';
import Dog from '../../assets/img/player-img/dog.png';
import Frosty from '../../assets/img/player-img/frosty.png';
import Rudolf from '../../assets/img/player-img/rudolf.png';
import Santa from '../../assets/img/player-img/santa.png';
import Soldier from '../../assets/img/player-img/soldier.png';
import Pikachu from '../../assets/img/player-img/pikachu.png';
import Link from '../../assets/img/player-img/link.png';
import Mario from '../../assets/img/player-img/mario.png';
import Luigi from '../../assets/img/player-img/luigi.png';

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
    case 'cat':
      return Cat;
    case 'dog':
      return Dog;
    case 'frosty':
      return Frosty;
    case 'rudolf':
      return Rudolf;
    case 'santa':
      return Santa;
    case 'pikachu':
      return Pikachu;
    case 'link':
      return Link;
    case 'mario':
      return Mario;
    case 'luigi':
      return Luigi;
    default:
      return MalePlayer;
  }
};

export default switchSpriteSheet;
