import Phaser from 'phaser';
import { MAP_SCALE } from '../../utils/constants';
import npcData from '../json/NPC.json';
import Player from '../../objects/Player';
import TextBox from '../../objects/TextBox';
import NPC from '../../objects/Npc';
import store from '../../../../../app/redux';
import loadCharacters from '../../utils/loadAssets';
import { createMap } from '../../utils/createMap';
import distanceChecker from '../../utils/distanceChecker';

class Home extends Phaser.Scene {
  dialogue!: TextBox;

  player!: Player;

  spaceBar!: Phaser.Input.Keyboard.Key;

  playerSprite!: string;

  npcs!: Phaser.Physics.Arcade.Group;

  icon!: Phaser.GameObjects.Image;

  activeNpc!: NPC;

  eventCount = 0;

  dialogueCount = 0;

  canSpeak = false;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { playerSprite } = state.user;
    this.playerSprite = playerSprite;
    // character sprites
    loadCharacters(this);
    // map assets
    this.load.image('tiles', '/assets/tiles-img/sTiles.png');
    this.load.image('exclamation', '/assets/img/exclamation.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/single-player.json',
    );
  }

  create() {
    // map
    const map = createMap(this, 'map');
    const tileSet = map.addTilesetImage('tilesOne', 'tiles');
    const floor = map.createLayer('Floor', tileSet, 0, 0);
    const second = map.createLayer('Second', tileSet, 0, 0);
    floor.setScale(MAP_SCALE);
    second.setScale(MAP_SCALE);
    const collidableObjects = map.createLayer(
      'Collide',
      tileSet,
      0,
      0,
    );
    collidableObjects.setScale(MAP_SCALE);
    collidableObjects.setCollisionByExclusion(-1, true);
    const doors = map.createLayer('Doors', tileSet, 0, 0);
    doors.setScale(MAP_SCALE);
    // player methods
    this.player = new Player(
      this,
      200,
      200,
      this.playerSprite,
      this.playerSprite,
    ).setScale(1.5);
    // npc
    this.npcs = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });

    npcData.forEach((anNpc) => {
      const npcSprite: NPC = new NPC(
        this,
        anNpc.x,
        anNpc.y,
        anNpc.name || 'npc',
      ).setScale(1.5);
      npcSprite.dialogue = anNpc.dialogue;
      this.npcs.add(npcSprite);
    });
    // collision
    const playerHit = () => {
      this.player.setVelocity(0);
    };
    this.physics.add.collider(
      this.player,
      [this.npcs, collidableObjects],
      playerHit,
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
    this.cameras.main.startFollow(this.player);
    // move player function
    const isMoving = this.player.movePlayer();
    this.npcs?.children.entries.forEach((npc: any) => {
      npc.handleAnimation();
      if (distanceChecker(this.player, npc)) {
        this.activeNpc = npc;
      }
    });
    if (
      distanceChecker(this.player, this.activeNpc) &&
      this.eventCount === 0
    ) {
      this.eventCount += 1;
      this.canSpeak = true;
      this.icon = this.add
        .image(this.activeNpc.x, this.activeNpc.y - 50, 'exclamation')
        .setScale(0.02);
    } else if (!distanceChecker(this.player, this.activeNpc)) {
      this.icon?.destroy();
      this.canSpeak = false;
      this.eventCount = 0;
    }
    if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
      if (!isMoving && this.canSpeak && this.dialogueCount === 0) {
        this.dialogue = new TextBox(
          this,
          width / 2,
          0,
          this.activeNpc.dialogue,
        )
          .setColor('black')
          .setFontSize(20);
        this.dialogue.scrollFactorX = 0;
        this.dialogue.scrollFactorY = 0;
        this.dialogueCount += 1;
        this.player.disableKeys();
      } else if (this.dialogueCount > 0) {
        this.dialogue?.destroy();
        this.dialogueCount = 0;
        this.player.enableKeys();
      }
    }
  }
}

export default Home;
