import Phaser from 'phaser';
import store from '../../store';
import { socket } from '../../service/socket';
import movePlayer from '../utils/playerMove';
import createAnimation, {
  handleOtherPlayerAnims,
} from '../utils/animations';

class HomeScene extends Phaser.Scene {
  homePlayer!: any;

  homeOtherPlayer!: any;

  homeOtherPlayerText!: Phaser.GameObjects.Text;

  homePlayerName!: string;

  homeGameRoom!: string;

  playerText!: Phaser.GameObjects.Text;

  homeCursor!: {
    shift: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space?: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super('HomeScene');
  }

  preload() {
    const state = store.getState();
    const { id } = state.game;
    const { username } = state.user;
    this.homePlayerName = username;
    this.homeGameRoom = id;
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
    this.homePlayer = this.physics.add.sprite(500, 500, 'player');
    // game text
    this.playerText = this.add.text(
      this.homePlayer.x - 30,
      this.homePlayer.y - 35,
      this.homePlayerName,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    // button to switch to main game scene
    const screenCenterX =
      this.cameras.main.worldView.x +
      this.cameras.main.worldView.width / 2;
    const screenCenterY =
      this.cameras.main.worldView.y +
      this.cameras.main.worldView.height / 2;
    const startFortNerf = async () => {
      await socket.emit('start_game', this.homeGameRoom);
      await this.scene.stop('HomeScene').launch('FortNerf');
    };
    const playButton = this.add
      .text(screenCenterX, screenCenterY + 100, 'Start Game')
      .setOrigin(0.5)
      .setInteractive()
      .on('pointerdown', startFortNerf);
    playButton.scrollFactorX = 0;
    playButton.scrollFactorY = 0;
    playButton.setFontSize(60);
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
    socket.emit('join_game', {
      room: this.homeGameRoom,
      username: this.homePlayerName,
    });
    socket.on('playerJoin', async ({ username }) => {
      try {
        this.homeOtherPlayer = this.physics.add.sprite(
          500,
          500,
          'player',
        );
        this.homeOtherPlayerText = this.add.text(
          this.homeOtherPlayer.x - 30,
          this.homeOtherPlayer.y - 35,
          username,
          {
            fontFamily:
              'Georgia, "Goudy Bookletter 1911", Times, serif',
          },
        );
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    socket.on('existingPlayer', async (data) => {
      try {
        this.homeOtherPlayer = this.physics.add.sprite(
          data.x,
          data.y,
          'player',
        );
        this.homeOtherPlayer.direction = data.direction;
        this.homeOtherPlayerText = this.add.text(
          this.homeOtherPlayer.x - 30,
          this.homeOtherPlayer.y - 35,
          data.username,
          {
            fontFamily:
              'Georgia, "Goudy Bookletter 1911", Times, serif',
          },
        );
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    socket.on('playerMoveHome', async ({ x, y, direction }) => {
      try {
        this.homeOtherPlayer.x = x;
        this.homeOtherPlayer.y = y;
        this.homeOtherPlayer.direction = direction;
        this.homeOtherPlayer.moving = true;
        this.homeOtherPlayerText.setX(this.homeOtherPlayer.x - 30);
        this.homeOtherPlayerText.setY(this.homeOtherPlayer.y - 35);
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    socket.on('moveHomeEnd', async (direction) => {
      try {
        this.homeOtherPlayer.direction = direction;
        this.homeOtherPlayer.moving = false;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    socket.on('playerLeft', async () => {
      try {
        this.homeOtherPlayer.destroy();
        this.homeOtherPlayerText.destroy();
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    socket.on('play_game', async () => {
      try {
        this.scene.stop('HomeScene').launch('FortNerf');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
  }

  update() {
    this.cameras.main.startFollow(this.homePlayer);
    const playerMoved = movePlayer(
      this.homePlayer,
      this.homeCursor,
      this.playerText,
    );
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

    if (this.homeOtherPlayer) {
      handleOtherPlayerAnims(this.homeOtherPlayer);
    }
  }
}

export default HomeScene;
