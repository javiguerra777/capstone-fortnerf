import Phaser from 'phaser';

// let platforms;
let map: any;
let player: any;
let cursors: any;
// let score = 0;
// let usernameText: any;

class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.image('background', '/assets/pallet_town.jpg');
    this.load.image('platform', '/assets/pallet_town.jpg');
    this.load.spritesheet('player', '/assets/spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    map = this.add
      .image(0, 0, 'background')
      .setOrigin(0, 0)
      .setScale(2);
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
    // // platforms

    // // how to create multiple platforms
    // platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    // platforms.create(600, 400, 'platform');
    // platforms.create(50, 250, 'platform');
    // platforms.create(750, 220, 'platform');

    // player methods
    player = this.physics.add.sprite(50, 150, 'player');
    // player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.direction = 'down';

    // player animations
    // movement animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', {
        start: 3,
        end: 5,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', {
        start: 6,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 2,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        start: 9,
        end: 11,
      }),
      frameRate: 10,
      repeat: -1,
    });

    // still animations
    this.anims.create({
      key: 'downstill',
      frames: [{ key: 'player', frame: 1 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'upstill',
      frames: [{ key: 'player', frame: 10 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'leftstill',
      frames: [{ key: 'player', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'rightstill',
      frames: [{ key: 'player', frame: 7 }],
      frameRate: 20,
    });
    this.physics.add.collider(player, map.displayWidth);
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
      // update left movement
      player.setVelocityX(-160);
      player.anims.play('left', true);
      player.direction = 'left';
    } else if (cursors.right.isDown) {
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
  }
}

export default FortNerf;
