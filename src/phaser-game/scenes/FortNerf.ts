/* eslint-disable class-methods-use-this */
import Phaser from 'phaser';

let platforms;
let player: any;
let cursors: any;
let stars: any;
let score = 0;
let scoreText: any;

class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.image('sky', '/assets/sky.png');
    this.load.image('platform', '/assets/platform.png');
    this.load.image('star', '/assets/star.png');
    this.load.image('bomb', '/assets/bomb.png');
    this.load.spritesheet('dude', '/assets/spritesheet.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');
    this.add.image(400, 300, 'star');

    // platforms
    platforms = this.physics.add.staticGroup();

    platforms.create(400, 568, 'platform').setScale(2).refreshBody();
    platforms.create(600, 400, 'platform');
    platforms.create(50, 250, 'platform');
    platforms.create(750, 220, 'platform');

    // player methods
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    player.body.setGravityY(300);

    // player animations
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 0,
        end: 3,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', {
        start: 5,
        end: 8,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.physics.add.collider(player, platforms);
    cursors = this.input.keyboard.createCursorKeys();

    // stars
    stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 50, stepX: 70 },
    });

    stars.children.iterate((child: any) => {
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });
    this.physics.add.collider(stars, platforms);
    function collectStar(theplayer: any, star: any) {
      star.disableBody(true, true);
      score += 10;
      scoreText.setText(`Score: ${score}`);
    }
    this.physics.add.overlap(
      player,
      stars,
      collectStar,
      undefined,
      this,
    );
    // score and text
    scoreText = this.add.text(16, 16, 'score: 0', {
      fontSize: '32px',
    });
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
      player.setVelocityX(-160);

      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);

      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);

      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-330);
    }
  }
}

export default FortNerf;
