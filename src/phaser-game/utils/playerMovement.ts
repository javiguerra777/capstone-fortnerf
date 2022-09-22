import { PLAYER_MOVEMENT } from './constants';

export const movePlayer = (
  keys: string | string[],
  player: { y: number; x: number; direction: string; anims: any },
) => {
  let playerMoved = false;
  let speed = 1;
  // collision
  if (keys.includes('KeyZ')) {
    speed = 1.5;
  }
  if (keys.includes('ArrowUp')) {
    playerMoved = true;
    player.direction = 'up';
    player.y -= PLAYER_MOVEMENT * speed;
    player.anims.play('up', true);
  } else if (keys.includes('ArrowDown')) {
    playerMoved = true;
    player.direction = 'down';
    player.y += PLAYER_MOVEMENT * speed;
    player.anims.play('down', true);
  } else if (keys.includes('ArrowLeft')) {
    playerMoved = true;
    player.direction = 'left';
    player.x -= PLAYER_MOVEMENT * speed;
    player.anims.play('left', true);
  } else if (keys.includes('ArrowRight')) {
    playerMoved = true;
    player.direction = 'right';
    player.x += PLAYER_MOVEMENT * speed;
    player.anims.play('right', true);
  } else {
    playerMoved = false;
    player.x += 0;
    player.y += 0;
    if (player.direction === 'up') {
      player.anims.play('upstill', true);
    } else if (player.direction === 'down') {
      player.anims.play('downstill', true);
    } else if (player.direction === 'left') {
      player.anims.play('leftstill', true);
    } else if (player.direction === 'right') {
      player.anims.play('rightstill', true);
    }
  }
  return playerMoved;
};

export default {};
