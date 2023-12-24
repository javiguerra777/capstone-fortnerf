import { PLAYER_MOVEMENT } from './constants';

const movePlayer = (player: any, cursors: any, playerText: any) => {
  let playerMoved = false;
  let speed = 1;
  if (cursors.shift.isDown) {
    speed = 1.5;
  }
  if (cursors.up.isDown) {
    playerMoved = true;
    player.direction = 'up';
    player.setVelocityY(-PLAYER_MOVEMENT * speed);
    player.setVelocityX(0);
    player.anims.play('up', true);
  } else if (cursors.down.isDown) {
    playerMoved = true;
    player.direction = 'down';
    player.setVelocityY(PLAYER_MOVEMENT * speed);
    player.setVelocityX(0);
    player.anims.play('down', true);
  } else if (cursors.left.isDown) {
    playerMoved = true;
    player.direction = 'left';
    player.setVelocityX(-PLAYER_MOVEMENT * speed);
    player.setVelocityY(0);
    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    playerMoved = true;
    player.direction = 'right';
    player.setVelocityX(PLAYER_MOVEMENT * speed);
    player.setVelocityY(0);
    player.anims.play('right', true);
  } else {
    playerMoved = false;
    player.setVelocity(0);
    if (player.direction === 'up') {
      player.anims.play('upStill', true);
    } else if (player.direction === 'down') {
      player.anims.play('downStill', true);
    } else if (player.direction === 'left') {
      player.anims.play('leftStill', true);
    } else if (player.direction === 'right') {
      player.anims.play('rightStill', true);
    }
  }
  if (playerText) {
    playerText?.setX(player.x - 30);
    playerText?.setY(player.y - 40);
  }
  return playerMoved;
};

export default movePlayer;
