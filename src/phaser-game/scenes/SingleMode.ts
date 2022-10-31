import Phaser from 'phaser';
import { BULLET_MOVEMENT, BULLET_OFFSET } from '../utils/constants';
import npcData from '../../json/NPC.json';
import Player from '../objects/Player';
import TextBox from '../objects/TextBox';
import NPC from '../objects/Npc';
import store from '../../store';

class SingleMode extends Phaser.Scene {
  player!: Player;

  score = 0;

  bullet!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;

  bullets!: Phaser.Physics.Arcade.Group;

  spaceBar!: Phaser.Input.Keyboard.Key;

  playerSprite!: string;

  // eslint-disable-next-line no-unused-vars
  shootBullet!: (x: number, y: number, direction: string) => void;

  trees!: Phaser.Physics.Arcade.Group;

  timer = 0;

  timerText!: Phaser.GameObjects.Text;

  npcs!: Phaser.Physics.Arcade.Group;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { playerSprite } = state.user;
    this.playerSprite = playerSprite;
    this.load.atlas(
      'player',
      '/assets/characters/male_player.png',
      '/assets/characters/male_player.json',
    );
    this.load.atlas(
      'npc',
      '/assets/characters/npc.png',
      '/assets/characters/npc.json',
    );
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
    map
      .getObjectLayer('trees')
      .objects.forEach(
        (tree: {
          x: number;
          y: number;
          width: number;
          height: number;
        }) => {
          const treeSprite = this.trees
            .create(tree.x + 50, tree.y - 45, 'tree')
            .setOrigin(0);
          treeSprite.body.setSize(tree.width - 5, tree.height);
        },
      );
    // player methods
    this.player = new Player(
      this,
      400,
      400,
      'MyPlayer',
      this.playerSprite,
    );
    // npc
    this.npcs = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    npcData.forEach((anNpc) => {
      const npcSprite: NPC = new NPC(this, anNpc.x, anNpc.y, 'npc');
      this.npcs.add(npcSprite);
    });
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
    // text
    this.timer = 180 * 60;
    const { width } = this.sys.game.canvas;
    this.timerText = new TextBox(
      this,
      width / 2,
      0,
      `Time: ${this.timer.toString()}`,
    );
    this.timerText.scrollFactorX = 0;
    this.timerText.scrollFactorY = 0;
    this.timerText.setFontSize(36);
    this.timerText.setColor('black');
    const scoreText = new TextBox(
      this,
      10,
      10,
      `Score: ${this.score.toString()}`,
    );
    scoreText.scrollFactorX = 0;
    scoreText.scrollFactorY = 0;
    scoreText.setFontSize(30);
    scoreText.setColor('black');
    // collision
    const playerHit = () => {
      this.player.setVelocity(0);
    };
    this.physics.add.collider(
      this.player,
      [this.npcs, this.trees],
      playerHit,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.bullets,
      this.npcs,
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
  }

  update() {
    const { width } = this.sys.game.canvas;
    this.timerText.setX(width / 2);
    if (this.timer >= 0) {
      this.timer -= 1;
      this.timerText.setText(`Time: ${this.timer}`);
    }
    if (this.timer <= 0) {
      this.scene.restart();
    }
    this.cameras.main.startFollow(this.player);
    // move player function
    this.player.movePlayer();
    // controls bullet updates on space press
    this.shootBullet(
      this.player.x,
      this.player.y,
      this.player.direction,
    );

    this.npcs?.children.entries.forEach((npc: any) => {
      npc.handleAnimation();
    });
  }
}

export default SingleMode;
