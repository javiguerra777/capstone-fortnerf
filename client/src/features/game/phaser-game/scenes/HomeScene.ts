import Phaser from 'phaser';
import store from '../../../../store';
import { socket } from '../../../../common/service/socket';
import createAnimation, {
  handleOtherPlayerAnims,
} from '../utils/animations';
import Player from '../objects/Player';
import TextBox from '../objects/TextBox';

class HomeScene extends Phaser.Scene {
  homePlayer!: Player;

  otherPlayers!: Phaser.Physics.Arcade.Group;

  homePlayerName!: string;

  homeGameRoom!: string;

  homeCursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  playButton!: Phaser.GameObjects.Text;

  constructor() {
    super('HomeScene');
  }

  preload() {
    const url = new URL(window.location.href);
    const gameId = url.pathname.split('/').pop() || '';
    const state = store.getState();
    const { username } = state.user;
    this.homePlayerName = username;
    this.homeGameRoom = gameId;
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
    this.homePlayer = new Player(this, 500, 500, this.homePlayerName);
    this.otherPlayers = this.physics.add.group();
    // button to switch to main game scene
    const { height, width } = this.sys.game.canvas;
    const startFortNerf = async () => {
      await socket.emit('start_game', this.homeGameRoom);
      await this.scene.stop('HomeScene').launch('FortNerf');
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
    });
    socket.on('new_player', async ({ username, socketId }) => {
      try {
        const otherPlayer: any = this.physics.add.sprite(
          500,
          500,
          'player',
        );
        otherPlayer.socketId = socketId;
        otherPlayer.text = new TextBox(
          this,
          otherPlayer.getTopLeft().x - 5,
          otherPlayer.getTopCenter().y - 20,
          username,
        );
        otherPlayer.moving = false;
        this.otherPlayers.add(otherPlayer);
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('existingPlayers', async (data) => {
      try {
        data.forEach(
          (player: {
            x: number;
            y: number;
            id: string;
            username: string;
          }) => {
            const otherPlayer: any = this.physics.add.sprite(
              player.x,
              player.y,
              'player',
            );
            otherPlayer.socketId = player.id;
            otherPlayer.text = new TextBox(
              this,
              otherPlayer.getTopLeft().x - 5,
              otherPlayer.getTopCenter().y - 20,
              player.username,
            );
            otherPlayer.moving = false;
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
      this.otherPlayers.children.entries.forEach((player) => {
        handleOtherPlayerAnims(player);
      });
    }
  }
}

export default HomeScene;
