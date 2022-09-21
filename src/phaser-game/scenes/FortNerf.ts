/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-shadow */
import Phaser from 'phaser';
import {
  BULLET_MOVEMENT,
  BULLET_OFFSET,
  SPRITE_DIMENSIONS,
} from '../utils/constants';
import { movePlayer } from '../utils/playerMovement';
import { socket } from '../../App';

let player: any;
let otherPlayer: any;
let shootBullet: (x: number, y: number, direction: string) => void;
let bullet;
let pressedKeys: any[] = [];
let collidableObjects: any;
class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.spritesheet(
      'player',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
    );
    this.load.spritesheet(
      'otherPlayer',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
    );
    this.load.image('bullet', '/assets/bullets/01.png');
    this.load.image('tiles', '/assets/tiles-img/tilesheet.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/fort-nerf.json',
    );
  }

  create() {
    const map: any = this.make.tilemap({ key: 'map' });
    this.cameras.main.setBounds(
      0,
      0,
      map.displayWidth,
      map.displayHeight,
    );
    this.physics.world.setBounds(
      0,
      0,
      map.displayWidth,
      map.displayHeight,
    );
    const tileSet = map.addTilesetImage('tilesOne', 'tiles');
    map.createLayer('floor', tileSet, 0, 20);
    collidableObjects = map.createLayer('colliders', tileSet, 0, 20);
    map.setCollisionBetween(1, 999, true, 'colliders');

    // player methods
    player = this.physics.add.sprite(500, 500, 'player');
    player.direction = 'down';
    otherPlayer = this.physics.add.sprite(500, 500, 'otherPlayer');
    // bullet methods
    shootBullet = (x: number, y: number, direction: string) => {
      bullet = this.physics.add.sprite(x, y, 'bullet');

      if (direction === 'right') {
        bullet.setVelocityX(BULLET_MOVEMENT);
      } else if (direction === 'left') {
        bullet.setVelocityX(-BULLET_MOVEMENT);
        bullet.flipX = true;
      } else if (direction === 'down') {
        bullet.setVelocityY(BULLET_MOVEMENT);
        bullet.rotation = 1.55;
      } else if (direction === 'up') {
        bullet.setVelocityY(-BULLET_MOVEMENT);
        bullet.rotation = -1.55;
      }
    };
    // player animations
    // movement animation function
    const createMoveAnimations = (
      keyFrame: string,
      spriteKey: string,
      startFrame: number,
      endFrame: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: this.anims.generateFrameNumbers(spriteKey, {
          start: startFrame,
          end: endFrame,
        }),
        frameRate: 10,
        repeat: -1,
      });
    };
    // still animation function
    const createStillAnimation = (
      keyFrame: string,
      spriteKey: string,
      frameNumber: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: [{ key: spriteKey, frame: frameNumber }],
        frameRate: 20,
      });
    };
    // player animations
    // movement animations
    createMoveAnimations('left', 'player', 3, 5);
    createMoveAnimations('right', 'player', 6, 8);
    createMoveAnimations('down', 'player', 0, 2);
    createMoveAnimations('up', 'player', 9, 11);

    // still animations
    createStillAnimation('leftstill', 'player', 4);
    createStillAnimation('rightstill', 'player', 7);
    createStillAnimation('downstill', 'player', 1);
    createStillAnimation('upstill', 'player', 10);

    // other player animations
    // movement animations
    createMoveAnimations('leftTwo', 'otherPlayer', 3, 5);
    createMoveAnimations('rightTwo', 'otherPlayer', 6, 8);
    createMoveAnimations('downTwo', 'otherPlayer', 0, 2);
    createMoveAnimations('upTwo', 'otherPlayer', 9, 11);

    // still animations
    createStillAnimation('leftstillTwo', 'otherPlayer', 4);
    createStillAnimation('rightstillTwo', 'otherPlayer', 7);
    createStillAnimation('downstillTwo', 'otherPlayer', 1);
    createStillAnimation('upstillTwo', 'otherPlayer', 10);

    player.setCollideWorldBounds(true);
    // keyboard methods
    this.input.keyboard.on('keydown', (e: { code: any }) => {
      if (!pressedKeys.includes(e.code)) {
        pressedKeys.push(e.code);
      }
    });
    this.input.keyboard.on('keyup', (e: { code: any }) => {
      pressedKeys = pressedKeys.filter((key) => key !== e.code);
    });

    socket.on('playerMove', ({ x, y, direction }) => {
      if (direction === 'right') {
        otherPlayer.direction = 'right';
      } else if (direction === 'left') {
        otherPlayer.direction = 'left';
      } else if (direction === 'up') {
        otherPlayer.direction = 'up';
      } else if (direction === 'down') {
        otherPlayer.direction = 'down';
      }
      otherPlayer.x = x;
      otherPlayer.y = y;
      otherPlayer.moving = true;
    });
    socket.on('playerMoveEnd', (direction) => {
      otherPlayer.direction = direction;
    });
  }

  update() {
    this.cameras.main.startFollow(player);
    const playerMoved = movePlayer(pressedKeys, player);
    if (playerMoved) {
      socket.emit('move', {
        x: player.x,
        y: player.y,
        direction: player.direction,
      });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit('moveEnd', player.direction);
      }
      player.movedLastFrame = false;
    }
    if (otherPlayer.moving) {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('rightTwo');
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('leftTwo');
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('upTwo');
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('downTwo');
      }
    } else if (!otherPlayer.moving) {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('rightstillTwo');
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('leftstillTwo');
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('upstillTwo');
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('downstillTwo');
      }
    }
    // // controls bullet updates on space press
    // if (cursor.space.isDown) {
    //   if (player.direction === 'right') {
    //     shootBullet(
    //       player.x + BULLET_OFFSET,
    //       player.y,
    //       player.direction,
    //     );
    //   } else if (player.direction === 'left') {
    //     shootBullet(
    //       player.x - BULLET_OFFSET,
    //       player.y,
    //       player.direction,
    //     );
    //   } else if (player.direction === 'up') {
    //     shootBullet(
    //       player.x,
    //       player.y - BULLET_OFFSET,
    //       player.direction,
    //     );
    //   } else if (player.direction === 'down') {
    //     shootBullet(
    //       player.x,
    //       player.y + BULLET_OFFSET,
    //       player.direction,
    //     );
    //   }
    // }
  }
}

export default FortNerf;
