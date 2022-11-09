import Phaser from 'phaser';
import { socket } from '../../../../../common/service/socket';
import { BULLET_MOVEMENT } from '../../utils/constants';
import OtherPlayer from '../../objects/OtherPlayer';
import Player from '../../objects/Player';
import getStore from '../../utils/store';

export const newPlayer = (
  scene: Phaser.Scene,
  otherPlayers: Phaser.Physics.Arcade.Group,
) => {
  socket.on('new_player', async ({ username, socketId, sprite }) => {
    try {
      const otherPlayer: OtherPlayer = new OtherPlayer(
        scene,
        500,
        500,
        username,
        sprite,
      ).setScale(1.5);
      otherPlayer.socketId = socketId;
      await otherPlayers?.add(otherPlayer);
    } catch (err) {
      console.log('new_player', err.message);
    }
  });
};
export const playerLeft = (
  otherPlayers: Phaser.Physics.Arcade.Group,
) => {
  socket.on('playerLeft', async (socketId) => {
    try {
      otherPlayers?.children.entries.forEach((player: any) => {
        if (player.socketId === socketId) {
          player.destroy();
          player.text.destroy();
        }
      });
    } catch (err) {
      console.log('player left', err.message);
    }
  });
};
export const existingPlayers = (
  scene: Phaser.Scene,
  otherPlayers: Phaser.Physics.Arcade.Group,
  event: string,
) => {
  socket.on(event, async (data) => {
    try {
      data.forEach((player: any) => {
        const otherPlayer: OtherPlayer = new OtherPlayer(
          scene,
          player.x || player.startingCoords.x,
          player.y || player.startingCoords.y,
          player.username,
          player.sprite,
        ).setScale(1.5);
        otherPlayer.socketId = player.id;
        otherPlayers?.add(otherPlayer);
      });
    } catch (err) {
      console.log('existing player', err.message);
    }
  });
};
export const playerMove = (
  otherPlayers: Phaser.Physics.Arcade.Group,
  gamePlayer: Player,
  event: string,
  text: any = '',
) => {
  socket.on(
    event,
    async ({ x, y, direction, socketId, respawn, otherSocketId }) => {
      try {
        const {
          user: { socketId: id },
        } = getStore();
        otherPlayers?.children.entries?.forEach((player: any) => {
          if (player.socketId === socketId) {
            player.x = x;
            player.y = y;
            player.direction = direction;
            player.text.setX(player.getTopLeft().x - 5);
            player.text.setY(player.getTopRight().y - 20);
            player.moving = !respawn;
          }
        });
        if (otherSocketId === id) {
          gamePlayer.kills += 1;
          text.setText(`Kills: ${gamePlayer.kills}`);
        }
      } catch (err) {
        console.log('move home', err.message);
      }
    },
  );
};
export const endMove = (
  otherPlayers: Phaser.Physics.Arcade.Group,
  event: string,
) => {
  socket.on(event, async ({ direction, socketId }) => {
    try {
      otherPlayers.children.entries?.forEach((player: any) => {
        if (player.socketId === socketId) {
          player.direction = direction;
          player.moving = false;
        }
      });
    } catch (err) {
      console.log('move end', err.message);
    }
  });
};
export const bulletIsShot = (
  scene: Phaser.Scene,
  otherBullet: any,
  otherBullets: Phaser.Physics.Arcade.Group,
  // eslint-disable-next-line no-unused-vars
  error: string,
) => {
  socket.on('bulletShot', async ({ x, y, direction, otherId }) => {
    try {
      otherBullet = scene.physics.add
        .sprite(x, y, 'bullet')
        .setScale(0.2);
      otherBullet.socketId = otherId;
      otherBullets.add(otherBullet);
      if (direction === 'left') {
        otherBullet.flipX = true;
        otherBullet.setVelocityX(-BULLET_MOVEMENT);
      } else if (direction === 'right') {
        otherBullet.setVelocityX(BULLET_MOVEMENT);
      } else if (direction === 'down') {
        otherBullet.rotation = 1.55;
        otherBullet.setVelocityY(BULLET_MOVEMENT);
      } else if (direction === 'up') {
        otherBullet.rotation = -1.55;
        otherBullet.setVelocityY(-BULLET_MOVEMENT);
      }
    } catch (err) {
      console.log(err.message);
      error = err.message;
    }
  });
};
// turn off socket listeners for a specific scene
const stopListener = (method: string) => {
  socket.off(method);
};
// turn of listeners for home scene
const stopHomeListeners = () => {
  stopListener('playerLeft');
  stopListener('new_player');
  stopListener('existingPlayers');
  stopListener('playerMoveHome');
  stopListener('moveHomeEnd');
  stopListener('play_game');
  stopListener('cant_start');
  stopListener('can_start');
};
export const playGame = (scene: Phaser.Scene) => {
  socket.on('play_game', async () => {
    try {
      await stopHomeListeners();
      await scene.scene.start('FortNerf');
    } catch (err) {
      console.log(err.message);
    }
  });
};
// turn off listeners for main game scene
export const stopGameListeners = () => {
  stopListener('bulletShot');
  stopListener('existing_game_players');
  stopListener('playerMove');
  stopListener('playerMoveEnd');
};

export default stopHomeListeners;
