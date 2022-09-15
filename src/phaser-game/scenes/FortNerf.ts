import Phaser from 'phaser';
import { BULLET_MOVEMENT, BULLET_OFFSET } from '../utils/constants';

// let platforms;
let background: any;
let player: any;
let cursors: any;
let walls: any;
let shootBullet: any;
let bullet: any = {};
// let score = 0;
// let usernameText: any;

class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.image('background', '/assets/sky.png');
    this.load.image('platform', '/assets/pallet_town.jpg');
    this.load.spritesheet('player', '/assets/spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.image('bullet', '/assets/bullets/05.png');
    this.load.image('tiles', '/assets/tiles-img/tilesheet.png');
    this.load.image('walls', '/assets/tiles-img/spike.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/fort-nerf.json',
    );
  }

  create() {
    background = this.add
      .image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(2);
    this.cameras.main.setBounds(
      0,
      0,
      background.displayWidth,
      background.displayHeight,
    );
    this.physics.world.setBounds(
      0,
      0,
      background.displayWidth,
      background.displayHeight,
    );
    const map: any = this.make.tilemap({ key: 'map' });
    const tileSet = map.addTilesetImage('tilesOne', 'tiles');
    map.createLayer('Floor', tileSet, 0, 20);
    walls = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    map.getObjectLayer('Walls').objects.forEach((wall: any) => {
      const wallSprite = walls
        .create(wall.x, wall.y - wall.height, 'walls')
        .setOrigin(0);
      wallSprite.body
        .setSize(wall.width, wall.height - 20)
        .setOffset(0, 20);
    });

    // player methods
    player = this.physics.add.sprite(500, 500, 'player');
    player.setCollideWorldBounds(true);
    player.direction = 'down';

    // bullet methods
    shootBullet = (x: number, y: number) => {
      bullet = this.physics.add.sprite(x, y, 'bullet');
    };
    // player animations
    // movement animation function
    const createMoveAnimations = (
      keyFrame: string,
      startFrame: number,
      endFrame: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: this.anims.generateFrameNumbers('player', {
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
      frameNumber: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: [{ key: 'player', frame: frameNumber }],
        frameRate: 20,
      });
    };
    const createBulletAnimation = () => {
      this.anims.create({
        key: 'left',
        frames: [{ key: 'bullet', frame: 0 }],
        frameRate: 20,
      });
    };
    // movement animations
    createMoveAnimations('left', 3, 5);
    createMoveAnimations('right', 6, 8);
    createMoveAnimations('down', 0, 2);
    createMoveAnimations('up', 9, 11);

    // still animations
    createStillAnimation('leftstill', 4);
    createStillAnimation('rightstill', 7);
    createStillAnimation('downstill', 1);
    createStillAnimation('upstill', 10);

    // bullet animations
    createBulletAnimation();
    // collision
    function playerHit() {
      player.setVelocity(0, 0);
    }
    function bulletHit() {
      bullet.active = false;
      bullet.setAlpha(0);
      console.log('hit wall');
    }
    this.physics.add.collider(
      player,
      walls,
      playerHit,
      undefined,
      this,
    );
    this.physics.add.collider(
      bullet,
      walls,
      bulletHit,
      undefined,
      this,
    );
    cursors = this.input.keyboard.createCursorKeys();

    // this.gridEngine.create(map, gridEngineConfig);
  }

  update() {
    this.cameras.main.startFollow(player);
    if (cursors.left.isDown) {
      // update left movement
      player.setVelocityX(-160);
      player.setVelocityY(0);
      player.anims.play('left', true);
      player.direction = 'left';
    } else if (cursors.right.isDown) {
      // update right movement
      player.anims.play('right', true);
      player.setVelocityY(0);
      player.setVelocityX(160);
      player.direction = 'right';
    } else if (cursors.down.isDown) {
      // update the down movement
      player.setVelocityX(0);
      player.setVelocityY(160);
      player.anims.play('down', true);
      player.direction = 'down';
    } else if (cursors.up.isDown) {
      // update the up movement
      player.setVelocityX(0);
      player.setVelocityY(-160);
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
    if (cursors.space.isDown) {
      if (player.direction === 'right') {
        shootBullet(player.x + BULLET_OFFSET, player.y);
        if (bullet.active) {
          bullet.setVelocityX(BULLET_MOVEMENT);
        }
      } else if (player.direction === 'left') {
        shootBullet(player.x - BULLET_OFFSET, player.y);
        if (bullet.active) {
          bullet.setVelocityX(-BULLET_MOVEMENT);
        }
      } else if (player.direction === 'up') {
        shootBullet(player.x, player.y - BULLET_OFFSET);
        if (bullet.active) {
          bullet.setVelocityY(-BULLET_MOVEMENT);
        }
      } else if (player.direction === 'down') {
        shootBullet(player.x, player.y + BULLET_OFFSET);
        if (bullet.active) {
          bullet.setVelocityY(BULLET_MOVEMENT);
        }
      }
    }
  }
}

export default FortNerf;
