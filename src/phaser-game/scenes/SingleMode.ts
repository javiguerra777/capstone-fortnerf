import Phaser from 'phaser';
import {
  BULLET_MOVEMENT,
  BULLET_OFFSET,
  NPC_DIMENSIONS,
  style,
} from '../utils/constants';
import npcData from '../../json/NPC.json';
import Player from '../objects/Player';

class SingleMode extends Phaser.Scene {
  player!: any;

  score = 0;

  bullet!: any;

  bullets!: any;

  spaceBar!: Phaser.Input.Keyboard.Key;

  shootBullet!: any;

  trees!: any;

  constructor() {
    super('FortNerf');
  }

  preload() {
    this.load.atlas(
      'player',
      '/assets/characters/male_player.png',
      '/assets/characters/male_player.json',
    );
    this.load.spritesheet('npc', '/assets/characters/npc.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.atlas(
      'bullet',
      '/assets/bullets/nerfBullet.png',
      '/assets/bullets/nerfBullet.json',
    );
    this.load.image('tiles', '/assets/tiles-img/tilesheet.png');
    this.load.image('tree', '/assets/tiles-img/tree.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/single-player.json',
    );
  }

  create() {
    let scoreText: Phaser.GameObjects.Text;
    const map: any = this.make.tilemap({ key: 'map' });
    this.physics.world.setBounds(
      0,
      0,
      map.displayWidth,
      map.displayHeight,
    );
    const tileSet = map.addTilesetImage('tilesOne', 'tiles');
    map.createLayer('floor', tileSet, 50, 20);
    this.trees = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    map.getObjectLayer('trees').objects.forEach((tree: any) => {
      const treeSprite = this.trees
        .create(tree.x + 50, tree.y - 45, 'tree')
        .setOrigin(0);
      treeSprite.body.setSize(tree.width - 5, tree.height);
    });
    // player methods
    this.player = new Player(this, 400, 400, 'player');
    // bullet group
    this.bullets = this.physics.add.group();
    // shoot bullet method
    this.shootBullet = (x: number, y: number, direction: string) => {
      if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
        switch (direction) {
          case 'right':
            this.bullet = this.physics.add
              .sprite(x + BULLET_OFFSET, y, 'bullet')
              .setScale(0.2);
            this.bullets.add(this.bullet);
            this.bullet.setVelocityX(BULLET_MOVEMENT);
            break;
          case 'left':
            this.bullet = this.physics.add
              .sprite(x - BULLET_OFFSET, y, 'bullet')
              .setScale(0.2);
            this.bullet.flipX = true;
            this.bullets.add(this.bullet);
            this.bullet.setVelocityX(-BULLET_MOVEMENT);
            break;
          case 'up':
            this.bullet = this.physics.add
              .sprite(x, y - BULLET_OFFSET, 'bullet')
              .setScale(0.2);
            this.bullet.rotation = -1.55;
            this.bullets.add(this.bullet);
            this.bullet.setVelocityY(-BULLET_MOVEMENT);
            break;
          case 'down':
            this.bullet = this.physics.add
              .sprite(x, y + BULLET_OFFSET, 'bullet')
              .setScale(0.2);
            this.bullet.rotation = 1.55;
            this.bullets.add(this.bullet);
            this.bullet.setVelocityY(BULLET_MOVEMENT);
            break;
          default:
            break;
        }
      }
    };
    // npc
    const npc = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    npcData.forEach((anNpc) => {
      const npcSprite = npc.create(anNpc.x, anNpc.y, 'npc');
      npcSprite.body.setSize(NPC_DIMENSIONS, NPC_DIMENSIONS);
    });
    // collision
    const playerHit = () => {
      this.player.setVelocity(0);
      this.player.visible = false;
    };
    this.physics.add.collider(
      this.player,
      [npc, this.trees],
      playerHit,
      undefined,
      this,
    );

    this.physics.add.collider(
      this.bullets,
      npc,
      (bullet) => {
        bullet.destroy();
        this.score += 10;
        scoreText.setText(`Score ${this.score}`);
      },
      undefined,
      this,
    );
    this.physics.add.collider(
      this.bullets,
      this.trees,
      (bullet) => {
        bullet.destroy();
      },
      undefined,
      this,
    );
    this.player.setCollideWorldBounds(true);
    // keyboard methods
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // display score of player
    scoreText = this.add.text(
      10,
      10,
      `Score: ${this.score.toString()}`,
      style,
    );
    scoreText.scrollFactorX = 0;
    scoreText.scrollFactorY = 0;
    scoreText.setFontSize(30);
  }

  update() {
    this.cameras.main.startFollow(this.player);
    // move player function
    this.player.movePlayer();
    // controls bullet updates on space press
    this.shootBullet(
      this.player.x,
      this.player.y,
      this.player.direction,
    );
  }
}

export default SingleMode;
