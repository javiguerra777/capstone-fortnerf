/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Phaser from 'phaser';
import {
  BULLET_MOVEMENT,
  BULLET_OFFSET,
  NPC_DIMENSIONS,
} from '../utils/constants';
import npcData from '../../NPC.json';

// let background: any;
let player: any;
let cursor: any;
let collidableObjects: any;
let shootBullet: any;
let bullet: any = {};
let speed: number;
let score = 0;
let scoreText: any;
let npc: any;
class SingleMode extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.image('background', '/assets/sky.png');
    this.load.image('platform', '/assets/pallet_town.jpg');
    this.load.spritesheet(
      'player',
      '/assets/characters/male_player.png',
      {
        frameWidth: 48,
        frameHeight: 48,
      },
    );
    this.load.spritesheet('npc', '/assets/characters/npc.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
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
    map.createLayer('floor', tileSet, 50, 20);

    collidableObjects = map.createLayer('colliders', tileSet, 50, 20);
    map.setCollisionBetween(1, 999, true, 'colliders');
    // player methods
    player = this.physics.add.sprite(500, 500, 'player');
    player.direction = 'down';

    npc = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    npcData.forEach((anNpc: any) => {
      const npcSprite = npc.create(anNpc.x, anNpc.y, 'npc');
      npcSprite.body.setSize(NPC_DIMENSIONS, NPC_DIMENSIONS);
    });

    // bullet methods
    shootBullet = (x: number, y: number, direction: string) => {
      bullet = this.physics.add.sprite(x, y, 'bullet');
      this.physics.add.collider(
        bullet,
        collidableObjects,
        (theBullet, obj) => {
          theBullet.destroy();
        },
        undefined,
        this,
      );
      this.physics.add.collider(
        bullet,
        npc,
        (theBullet, obj) => {
          score += 10;
          scoreText.setText(`Score: ${score}`);
          theBullet.destroy();
        },
        undefined,
        this,
      );
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
      object: string,
      startFrame: number,
      endFrame: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: this.anims.generateFrameNumbers(object, {
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
      object: string,
      frameNumber: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: [{ key: object, frame: frameNumber }],
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

    // npc animations
    createStillAnimation('npcdownstill', 'npc', 1);

    // collision
    const playerHit = () => {
      player.setVelocity(0, 0);
    };
    this.physics.add.collider(
      player,
      collidableObjects,
      playerHit,
      undefined,
      this,
    );
    this.physics.add.collider(
      player,
      npc,
      playerHit,
      undefined,
      this,
    );
    player.setCollideWorldBounds(true);
    // keyboard methods
    cursor = this.input.keyboard.createCursorKeys();

    // display score of player
    scoreText = this.add.text(
      player.x - 30,
      player.y + 30,
      `Score: ${score.toString()}`,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
  }

  update() {
    this.cameras.main.startFollow(player);
    // changes speed
    if (cursor.shift.isDown) {
      speed = 1.5;
    } else {
      speed = 1;
    }
    // player movements
    if (cursor.left.isDown) {
      // update left movement
      player.setVelocityX(-160 * speed);
      player.setVelocityY(0);
      player.anims.play('left', true);
      player.direction = 'left';
    } else if (cursor.right.isDown) {
      // update right movement
      player.anims.play('right', true);
      player.setVelocityY(0);
      player.setVelocityX(160 * speed);
      player.direction = 'right';
    } else if (cursor.down.isDown) {
      // update the down movement
      player.setVelocityX(0);
      player.setVelocityY(160 * speed);
      player.anims.play('down', true);
      player.direction = 'down';
    } else if (cursor.up.isDown) {
      // update the up movement
      player.setVelocityX(0);
      player.setVelocityY(-160 * speed);
      player.anims.play('up', true);
      player.direction = 'up';
    } else {
      player.setVelocity(0);
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
    // controls bullet updates on space press
    if (cursor.space.isDown) {
      if (player.direction === 'right') {
        shootBullet(
          player.x + BULLET_OFFSET,
          player.y,
          player.direction,
        );
      } else if (player.direction === 'left') {
        shootBullet(
          player.x - BULLET_OFFSET,
          player.y,
          player.direction,
        );
      } else if (player.direction === 'up') {
        shootBullet(
          player.x,
          player.y - BULLET_OFFSET,
          player.direction,
        );
      } else if (player.direction === 'down') {
        shootBullet(
          player.x,
          player.y + BULLET_OFFSET,
          player.direction,
        );
      }
    }
  }
}

export default SingleMode;
