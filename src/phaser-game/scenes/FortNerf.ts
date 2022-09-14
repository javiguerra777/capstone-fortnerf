import Phaser from 'phaser';

// let platforms;
let background: any;
let player: any;
let cursors: any;
let walls: any;
let shootBullet: any;
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
    // // platforms

    // // how to create multiple platforms
    // platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    // platforms.create(600, 400, 'platform');
    // platforms.create(50, 250, 'platform');
    // platforms.create(750, 220, 'platform');

    // player methods
    player = this.physics.add.sprite(50, 150, 'player');
    player.setCollideWorldBounds(true);
    player.direction = 'down';
    shootBullet = (x: number, y: number) => {
      this.physics.add.sprite(x, y, 'bullet');
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

    function playerHit() {
      player.setVelocity(0, 0);
    }
    this.physics.add.collider(
      player,
      walls,
      playerHit,
      undefined,
      this,
    );
    cursors = this.input.keyboard.createCursorKeys();

    // score and text
    // this.add.text(player.x, player.y + 10, 'jhoodie777', {
    //   fontSize: '32px',
    // });
    // const gridEngineConfig = {
    //   characters: [
    //     {
    //       id: 'playerOne',
    //       sprite: playerSprite,
    //       startPosition: { x: 1, y: 1 },
    //     },
    //   ],
    // };

    // this.gridEngine.create(map, gridEngineConfig);
  }

  update() {
    this.cameras.main.startFollow(player);
    if (cursors.left.isDown) {
      if (cursors.down.isDown) {
        player.setVelocityY(160);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
      }
      // update left movement
      // console.log(cursors);
      player.setVelocityX(-160);
      player.anims.play('left', true);
      player.direction = 'left';
    } else if (cursors.right.isDown) {
      if (cursors.down.isDown) {
        player.setVelocityY(160);
      } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
      }
      // update right movement
      player.setVelocityX(160);
      player.anims.play('right', true);
      player.direction = 'right';
    } else if (cursors.down.isDown) {
      // update the down movement
      player.setVelocityY(160);
      player.anims.play('down', true);
      player.direction = 'down';
    } else if (cursors.up.isDown) {
      // update the up movement
      player.setVelocityY(-160);
      player.anims.play('up', true);
      player.direction = 'up';
    } else {
      player.setVelocityX(0);
      player.setVelocityY(0);
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
    if (cursors.space.isDown) {
      if (player.direction === 'right') {
        shootBullet(player.x + 35, player.y);
      } else if (player.direction === 'left') {
        shootBullet(player.x - 35, player.y);
      } else if (player.direction === 'up') {
        shootBullet(player.x, player.y - 35);
      } else if (player.direction === 'down') {
        shootBullet(player.x, player.y + 35);
      }
    }
  }
}

export default FortNerf;
