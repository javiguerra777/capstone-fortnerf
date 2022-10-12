import Phaser from 'phaser';
import store from '../../store';
import {
  SPRITE_DIMENSIONS,
  PLAYER_MOVEMENT,
} from '../utils/constants';
import { socket } from '../../service/socket';

class HomeScene extends Phaser.Scene {
  homePlayer!: any;

  homeOtherPlayer!: any;

  homeOtherPlayerText!: Phaser.GameObjects.Text;

  homePlayerName!: string;

  homeGameRoom!: string;

  homeMovePlayer!: () => boolean;

  handleOtherPlayerAnims!: () => void;

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
    this.load.spritesheet(
      'homePlayer',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
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
    this.homePlayer = this.physics.add.sprite(500, 500, 'homePlayer');
    // game text
    const playerText = this.add.text(
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
    // movement animation function
    const createMoveAnimations = (
      keyId: string,
      objectId: string,
      startFrame: number,
      endFrame: number,
    ) => {
      this.anims.create({
        key: keyId,
        frames: this.anims.generateFrameNumbers(objectId, {
          start: startFrame,
          end: endFrame,
        }),
        frameRate: 12,
        repeat: -1,
      });
    };
    const createStillAnimations = (
      keyId: string,
      objectId: string,
      frameNumber: number,
    ) => {
      this.anims.create({
        key: keyId,
        frames: [{ key: objectId, frame: frameNumber }],
        frameRate: 20,
      });
    };
    // animations
    createMoveAnimations('left', 'homePlayer', 3, 5);
    createMoveAnimations('right', 'homePlayer', 6, 8);
    createMoveAnimations('up', 'homePlayer', 9, 11);
    createMoveAnimations('down', 'homePlayer', 0, 2);
    createStillAnimations('leftStill', 'homePlayer', 4);
    createStillAnimations('rightStill', 'homePlayer', 7);
    createStillAnimations('upStill', 'homePlayer', 10);
    createStillAnimations('downStill', 'homePlayer', 1);

    this.homeMovePlayer = () => {
      let playerMoved = false;
      let speed = 1;
      if (this.homeCursor.shift.isDown) {
        speed = 1.5;
      }
      if (this.homeCursor.up.isDown) {
        playerMoved = true;
        this.homePlayer.direction = 'up';
        this.homePlayer.setVelocityY(-PLAYER_MOVEMENT * speed);
        this.homePlayer.setVelocityX(0);
        this.homePlayer.anims.play('up', true);
      } else if (this.homeCursor.down.isDown) {
        playerMoved = true;
        this.homePlayer.direction = 'down';
        this.homePlayer.setVelocityY(PLAYER_MOVEMENT * speed);
        this.homePlayer.setVelocityX(0);
        this.homePlayer.anims.play('down', true);
      } else if (this.homeCursor.left.isDown) {
        playerMoved = true;
        this.homePlayer.direction = 'left';
        this.homePlayer.setVelocityX(-PLAYER_MOVEMENT * speed);
        this.homePlayer.setVelocityY(0);
        this.homePlayer.anims.play('left', true);
      } else if (this.homeCursor.right.isDown) {
        playerMoved = true;
        this.homePlayer.direction = 'right';
        this.homePlayer.setVelocityX(PLAYER_MOVEMENT * speed);
        this.homePlayer.setVelocityY(0);
        this.homePlayer.anims.play('right', true);
      } else {
        playerMoved = false;
        this.homePlayer.setVelocity(0);
        if (this.homePlayer.direction === 'up') {
          this.homePlayer.anims.play('upStill', true);
        } else if (this.homePlayer.direction === 'down') {
          this.homePlayer.anims.play('downStill', true);
        } else if (this.homePlayer.direction === 'left') {
          this.homePlayer.anims.play('leftStill', true);
        } else if (this.homePlayer.direction === 'right') {
          this.homePlayer.anims.play('rightStill', true);
        }
      }
      playerText.setX(this.homePlayer.x - 30);
      playerText.setY(this.homePlayer.y - 40);
      return playerMoved;
    };
    // other player anims
    this.handleOtherPlayerAnims = async () => {
      try {
        if (this.homeOtherPlayer.moving) {
          if (this.homeOtherPlayer.direction === 'right') {
            this.homeOtherPlayer.anims.play('right', true);
          } else if (this.homeOtherPlayer.direction === 'left') {
            this.homeOtherPlayer.anims.play('left', true);
          } else if (this.homeOtherPlayer.direction === 'up') {
            this.homeOtherPlayer.anims.play('up', true);
          } else if (this.homeOtherPlayer.direction === 'down') {
            this.homeOtherPlayer.anims.play('down', true);
          }
        } else {
          if (this.homeOtherPlayer.direction === 'right') {
            this.homeOtherPlayer.anims.play('rightStill', true);
          } else if (this.homeOtherPlayer.direction === 'left') {
            this.homeOtherPlayer.anims.play('leftStill', true);
          } else if (this.homeOtherPlayer.direction === 'up') {
            this.homeOtherPlayer.anims.play('upStill', true);
          } else if (this.homeOtherPlayer.direction === 'down') {
            this.homeOtherPlayer.anims.play('downStill', true);
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
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
    socket.emit('join_game', {
      room: this.homeGameRoom,
      username: this.homePlayerName,
    });
    socket.on('playerJoin', async ({ username }) => {
      try {
        this.homeOtherPlayer = this.physics.add.sprite(
          500,
          500,
          'homePlayer',
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
          'homePlayer',
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
    const playerMoved = this.homeMovePlayer();
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
      this.handleOtherPlayerAnims();
    }
  }
}

export default HomeScene;
