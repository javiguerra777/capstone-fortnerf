import Phaser from 'phaser';
import {
  BULLET_MOVEMENT,
  BULLET_OFFSET,
  NPC_DIMENSIONS,
} from '../utils/constants';
import npcData from '../../json/NPC.json';
import movePlayer from '../utils/playerMove';
import createAnimation from '../utils/animations';

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
    this.trees = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    map.getObjectLayer('trees').objects.forEach((tree: any) => {
      const treeSprite = this.trees
        .create(tree.x + 50, tree.y - 45, 'tree')
        .setOrigin(0);
      treeSprite.body.setSize(tree.width - 5, tree.height - 15);
    });
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
      this.bullet = this.physics.add
        .sprite(x, y, 'bullet')
        .setScale(0.2);
      this.physics.add.overlap(
        this.bullet,
        this.trees,
        (theBullet) => {
          theBullet.destroy();
        },
        undefined,
        this,
      );
      this.physics.add.overlap(
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
    // movement animations
    createAnimation(this.anims, 'left', 'player', 'left', 1, 3);
    createAnimation(this.anims, 'right', 'player', 'right', 1, 3);
    createAnimation(this.anims, 'down', 'player', 'down', 1, 3);
    createAnimation(this.anims, 'up', 'player', 'up', 1, 3);
    // still animations
    createAnimation(this.anims, 'leftStill', 'player', 'left', 3, 3);
    createAnimation(
      this.anims,
      'rightStill',
      'player',
      'right',
      3,
      3,
    );
    createAnimation(this.anims, 'downStill', 'player', 'down', 3, 3);
    createAnimation(this.anims, 'upStill', 'player', 'up', 3, 3);
    // bullet animation
    createAnimation(this.anims, 'shoot', 'bullet', 'bullet', 1, 1);
    // collision
    const playerHit = () => {
      this.player.setVelocity(0, 0);
    };
    this.physics.add.collider(
      this.player,
      this.trees,
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
    this.cameras.main.startFollow(this.player);
    // move player function
    movePlayer(this.player, this.cursor, false);
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
