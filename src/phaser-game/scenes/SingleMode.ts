import Phaser from 'phaser';
import {
  BULLET_MOVEMENT,
  BULLET_OFFSET,
  NPC_DIMENSIONS,
} from '../utils/constants';
import npcData from '../../json/NPC.json';

class SingleMode extends Phaser.Scene {
  player!: any;

  score = 0;

  bullet!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  spaceBar!: Phaser.Input.Keyboard.Key;

  cursor!: {
    shift: { isDown: boolean };
    left: { isDown: boolean };
    right: { isDown: boolean };
    down: { isDown: boolean };
    up: { isDown: boolean };
    space?: { isDown: boolean };
  };

  shootBullet!: any;

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
    let scoreText: Phaser.GameObjects.Text;
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

    const collidableObjects = map.createLayer(
      'colliders',
      tileSet,
      50,
      20,
    );
    map.setCollisionBetween(1, 999, true, 'colliders');
    // player methods
    this.player = this.physics.add.sprite(500, 500, 'player');
    this.player.direction = 'down';

    const npc = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    npcData.forEach((anNpc) => {
      const npcSprite = npc.create(anNpc.x, anNpc.y, 'npc');
      npcSprite.body.setSize(NPC_DIMENSIONS, NPC_DIMENSIONS);
    });

    // bullet methods
    this.shootBullet = (x: number, y: number, direction: string) => {
      this.bullet = this.physics.add.sprite(x, y, 'bullet');
      this.physics.add.collider(
        this.bullet,
        collidableObjects,
        (theBullet) => {
          theBullet.destroy();
        },
        undefined,
        this,
      );
      this.physics.add.collider(
        this.bullet,
        npc,
        (theBullet) => {
          this.score += 10;
          scoreText.setText(`Score: ${this.score}`);
          theBullet.destroy();
        },
        undefined,
        this,
      );
      if (direction === 'right') {
        this.bullet.setVelocityX(BULLET_MOVEMENT);
      } else if (direction === 'left') {
        this.bullet.setVelocityX(-BULLET_MOVEMENT);
        this.bullet.flipX = true;
      } else if (direction === 'down') {
        this.bullet.setVelocityY(BULLET_MOVEMENT);
        this.bullet.rotation = 1.55;
      } else if (direction === 'up') {
        this.bullet.setVelocityY(-BULLET_MOVEMENT);
        this.bullet.rotation = -1.55;
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
      this.player.setVelocity(0, 0);
    };
    this.physics.add.collider(
      this.player,
      collidableObjects,
      playerHit,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.player,
      npc,
      playerHit,
      undefined,
      this,
    );
    this.player.setCollideWorldBounds(true);
    // keyboard methods
    this.cursor = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // display score of player
    scoreText = this.add.text(
      10,
      10,
      `Score: ${this.score.toString()}`,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    scoreText.scrollFactorX = 0;
    scoreText.scrollFactorY = 0;
    scoreText.setFontSize(30);
  }

  update() {
    let speed: number;
    this.cameras.main.startFollow(this.player);
    // changes speed
    if (this.cursor.shift.isDown) {
      speed = 1.5;
    } else {
      speed = 1;
    }
    // player movements
    if (this.cursor.left.isDown) {
      // update left movement
      this.player.setVelocityX(-160 * speed);
      this.player.setVelocityY(0);
      this.player.anims.play('left', true);
      this.player.direction = 'left';
    } else if (this.cursor.right.isDown) {
      // update right movement
      this.player.anims.play('right', true);
      this.player.setVelocityY(0);
      this.player.setVelocityX(160 * speed);
      this.player.direction = 'right';
    } else if (this.cursor.down.isDown) {
      // update the down movement
      this.player.setVelocityX(0);
      this.player.setVelocityY(160 * speed);
      this.player.anims.play('down', true);
      this.player.direction = 'down';
    } else if (this.cursor.up.isDown) {
      // update the up movement
      this.player.setVelocityX(0);
      this.player.setVelocityY(-160 * speed);
      this.player.anims.play('up', true);
      this.player.direction = 'up';
    } else {
      this.player.setVelocity(0);
      if (this.player.direction === 'up') {
        this.player.anims.play('upstill', true);
      } else if (this.player.direction === 'down') {
        this.player.anims.play('downstill', true);
      } else if (this.player.direction === 'left') {
        this.player.anims.play('leftstill', true);
      } else if (this.player.direction === 'right') {
        this.player.anims.play('rightstill', true);
      }
    }
    // controls bullet updates on space press
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      if (this.player.direction === 'right') {
        this.shootBullet(
          this.player.x + BULLET_OFFSET,
          this.player.y,
          this.player.direction,
        );
      } else if (this.player.direction === 'left') {
        this.shootBullet(
          this.player.x - BULLET_OFFSET,
          this.player.y,
          this.player.direction,
        );
      } else if (this.player.direction === 'up') {
        this.shootBullet(
          this.player.x,
          this.player.y - BULLET_OFFSET,
          this.player.direction,
        );
      } else if (this.player.direction === 'down') {
        this.shootBullet(
          this.player.x,
          this.player.y + BULLET_OFFSET,
          this.player.direction,
        );
      }
    }
  }
}

export default SingleMode;
