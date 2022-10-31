import Phaser from 'phaser';
import store from '../../store';
import { socket } from '../../service/socket';
import Player from '../objects/Player';
import TextBox from '../objects/TextBox';
import OtherPlayer from '../objects/OtherPlayer';

class HomeScene extends Phaser.Scene {
  homePlayer!: Player;

  sprite!: string;

  otherPlayers!: Phaser.Physics.Arcade.Group;

  homePlayerName!: string;

  homeGameRoom!: string;

  homeCursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  playButton!: Phaser.GameObjects.Text;

  constructor() {
    super('HomeScene');
  }

  preload() {
    const state = store.getState();
    const { id } = state.game;
    const { username, playerSprite } = state.user;
    this.homePlayerName = username;
    this.homeGameRoom = id;
    this.sprite = playerSprite;
    this.load.image('tileSet', '/assets/tiles-img/tilesheet.png');
    this.load.tilemapTiledJSON(
      'homeMap',
      '/assets/tile-map/homemap.json',
    );
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
      'soldier',
      '/assets/characters/soldier.png',
      '/assets/characters/soldier.json',
    );
    this.load.atlas(
      'pumpkin',
      '/assets/characters/pumpkin.png',
      '/assets/characters/pumpkin.json',
    );
    this.load.atlas(
      'robeman',
      '/assets/characters/robeman.png',
      '/assets/characters/robeman.json',
    );
  }

  create() {
    // map
    const homeMap: any = this.make.tilemap({ key: 'homeMap' });
    this.cameras.main.setBounds(
      0,
      0,
      homeMap.displayWidth,
      homeMap.displayHeight,
    );
    this.physics.world.setBounds(
      0,
      0,
      homeMap.displayWidth,
      homeMap.displayHeight,
    );
    const homeTileSet = homeMap.addTilesetImage('tiles', 'tileSet');
    homeMap.createLayer('floor', homeTileSet, 50, 20);
    const walls = homeMap.createLayer('walls', homeTileSet, 50, 20);
    homeMap.setCollisionBetween(1, 999, true, 'colliders');
    // player and other player groups
    this.homePlayer = new Player(
      this,
      500,
      500,
      this.homePlayerName,
      this.sprite,
    ).setScale(1.5);
    this.otherPlayers = this.physics.add.group();
    // button to switch to main game scene
    const { height, width } = this.sys.game.canvas;
    const startFortNerf = async () => {
      await socket.emit('start_game', this.homeGameRoom);
      await this.scene.stop('HomeScene').launch('FortNerf');
    };
    const playerCollider = () => {
      this.homePlayer.setVelocity(0);
    };
    this.physics.add.collider(
      this.homePlayer,
      walls,
      playerCollider,
      undefined,
      this,
    );
    this.homeCursor = this.input.keyboard.createCursorKeys();

    // socket methods
    socket.emit('join_home', {
      room: this.homeGameRoom,
      username: this.homePlayerName,
      sprite: this.sprite,
    });
    socket.on(
      'new_player',
      async ({ username, socketId, sprite }) => {
        try {
          const otherPlayer: OtherPlayer = new OtherPlayer(
            this,
            500,
            500,
            username,
            sprite,
          ).setScale(1.5);
          otherPlayer.socketId = socketId;
          this.otherPlayers.add(otherPlayer);
        } catch (err) {
          // want catch block to do nothing
        }
      },
    );
    socket.on('existingPlayers', async (data) => {
      try {
        data.forEach(
          (player: {
            x: number;
            y: number;
            id: string;
            username: string;
            sprite: string;
          }) => {
            const otherPlayer: OtherPlayer = new OtherPlayer(
              this,
              player.x,
              player.y,
              player.username,
              player.sprite,
            ).setScale(1.5);
            otherPlayer.socketId = player.id;
            this.otherPlayers.add(otherPlayer);
          },
        );
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on(
      'playerMoveHome',
      async ({ x, y, direction, socketId }) => {
        try {
          this.otherPlayers.children.entries.forEach(
            (player: any) => {
              if (player.socketId === socketId) {
                player.x = x;
                player.y = y;
                player.direction = direction;
                player.text.setX(player.getTopLeft().x - 5);
                player.text.setY(player.getTopRight().y - 20);
                player.moving = true;
              }
            },
          );
        } catch (err) {
          // want catch block to do nothing
        }
      },
    );
    socket.on('moveHomeEnd', async ({ direction, socketId }) => {
      try {
        this.otherPlayers.children.entries.forEach((player: any) => {
          if (player.socketId === socketId) {
            player.direction = direction;
            player.moving = false;
          }
        });
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('playerLeft', async (socketId) => {
      try {
        this.otherPlayers.children.entries.forEach((player: any) => {
          if (player.socketId === socketId) {
            player.destroy();
            player.text.destroy();
          }
        });
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('play_game', async () => {
      try {
        this.scene.stop('HomeScene').launch('FortNerf');
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('can_start', async () => {
      try {
        if (!this.playButton) {
          this.playButton = new TextBox(
            this,
            width / 2,
            height / 2,
            'Start Game',
          );
          this.playButton
            .setOrigin(0.5)
            .setInteractive()
            .on('pointerdown', startFortNerf);
          this.playButton.scrollFactorX = 0;
          this.playButton.scrollFactorY = 0;
          this.playButton.setFontSize(60);
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
    this.cameras.main.startFollow(this.homePlayer);
    if (this.playButton) {
      const { height, width } = this.sys.game.canvas;
      this.playButton.setX(width / 2);
      this.playButton.setY(height / 2 + 100);
    }
    const playerMoved = this.homePlayer.movePlayer();
    if (playerMoved) {
      socket.emit('moveHome', {
        x: this.homePlayer.x,
        y: this.homePlayer.y,
        direction: this.homePlayer.direction,
        room: this.homeGameRoom,
      });
      this.homePlayer.movedLastFrame = true;
    } else {
      socket.emit('moveHomeEnd', {
        direction: this.homePlayer.direction,
        room: this.homeGameRoom,
      });
      this.homePlayer.movedLastFrame = false;
    }
    if (this.otherPlayers.children.entries.length > 0) {
      this.otherPlayers.children.entries.forEach((player: any) => {
        player?.handleAnimations();
      });
    }
  }
}

export default HomeScene;
