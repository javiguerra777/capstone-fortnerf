import Phaser from 'phaser';
import { socket } from '../../../../../service/socket';
import { MAP_SCALE } from '../../utils/constants';
import Player from '../../objects/Player';
import Box from '../../objects/DialogueBox';
import loadCharacters from '../../utils/loadAssets';
import { createMap } from '../../utils/createMap';
import stopHomeListeners, {
  newPlayer,
  playerLeft,
  existingPlayers,
  playerMove,
  endMove,
  playGame,
} from '../service/socketListeners';
import getStore, { keyboardChecker } from '../../utils/store';

type PlayerInfo = {
  username: string;
  playerSprite: string;
};

class HomeScene extends Phaser.Scene {
  player!: Player;

  otherPlayers!: Phaser.Physics.Arcade.Group;

  playerInfo!: PlayerInfo;

  gameRoom!: string;

  playButton!: Box;

  keyBoardDisabled!: boolean;

  error!: string;

  constructor() {
    super('HomeScene');
  }

  preload() {
    const {
      game: { id },
      user: { username, playerSprite },
    } = getStore();
    this.playerInfo = {
      username,
      playerSprite,
    };
    this.gameRoom = id;
    this.load.image('tileSet', '/assets/tiles-img/sTiles.png');
    this.load.tilemapTiledJSON(
      'homeMap',
      '/assets/tile-map/homemap.json',
    );
    loadCharacters(this);
  }

  create() {
    // map
    const map = createMap(this, 'homeMap');
    const tileSet = map.addTilesetImage('tilesOne', 'tileSet');
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
    // player and other player groups
    this.player = new Player(
      this,
      500,
      500,
      this.playerInfo.username,
      this.playerInfo.playerSprite,
    ).setScale(1.5);
    this.otherPlayers = this.physics.add.group();
    // button to switch to main game scene
    const { height, width } = this.sys.game.canvas;
    const startFortNerf = async () => {
      await stopHomeListeners();
      await socket.emit('start_game', this.gameRoom);
      await this.scene.start('FortNerf');
    };
    // collision
    const playerCollision = () => {
      this.player.setVelocity(0);
    };
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(
      this.player,
      collidableObjects,
      playerCollision,
      undefined,
      this,
    );
    // socket methods
    socket.emit('join_home', {
      room: this.gameRoom,
      username: this.playerInfo.username,
      sprite: this.playerInfo.playerSprite,
    });
    // socket.on methods
    newPlayer(this, this.otherPlayers);
    existingPlayers(this, this.otherPlayers, 'existingPlayers');
    playerMove(this.otherPlayers, 'playerMoveHome');
    endMove(this.otherPlayers, 'moveHomeEnd');
    playerLeft(this.otherPlayers);
    playGame(this);
    socket.on('can_start', async () => {
      try {
        if (!this.playButton) {
          this.playButton = new Box(
            this,
            width / 2,
            height / 2,
            'button',
            'background-color: #343434; color: white; width: auto; border: solid 5px black; border-radius: 5px; padding: 3px; font: Arial; font-size: 40px;',
            'Start Game',
          )
            .setInteractive()
            .on('pointerdown', startFortNerf);
        }
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('cant_start', async () => {
      try {
        this.playButton?.destroy();
      } catch (err) {
        // want catch block to do nothing
      }
    });
  }

  update() {
    keyboardChecker(this.input);
    this.cameras.main.startFollow(this.player);
    if (this.playButton) {
      const { height, width } = this.sys.game.canvas;
      this.playButton.setX(width / 2);
      this.playButton.setY(height / 2 + 100);
    }
    const playerMoved = this.player.movePlayer();
    if (playerMoved) {
      socket.emit('moveHome', {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.direction,
        room: this.gameRoom,
      });
      this.player.movedLastFrame = true;
    } else {
      socket.emit('moveHomeEnd', {
        direction: this.player.direction,
        room: this.gameRoom,
      });
      this.player.movedLastFrame = false;
    }
    if (this.otherPlayers.children.entries.length > 0) {
      this.otherPlayers.children.entries?.forEach((player: any) => {
        player?.handleAnimations();
      });
    }
  }
}

export default HomeScene;
