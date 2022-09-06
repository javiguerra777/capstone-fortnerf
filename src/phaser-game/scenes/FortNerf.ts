/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

// let platforms;
let player: any;
let cursors: any;
// let score = 0;
// let scoreText: any;

class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.image('sky', '/assets/sky.png');
    // this.load.image('platform', '/assets/platform.png');
    this.load.spritesheet('player', '/assets/spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');

    // // platforms
    // platforms = this.physics.add.staticGroup();

    // // how to create multiple platforms
    // platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    // platforms.create(600, 400, 'platform');
    // platforms.create(50, 250, 'platform');
    // platforms.create(750, 220, 'platform');

    // player methods
    player = this.physics.add.sprite(100, 450, 'player');
    player.setBounce(0.2);
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
    // this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

    // score and text
    // scoreText = this.add.text(16, 16, 'score: 0', {
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

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

export default FortNerf;
