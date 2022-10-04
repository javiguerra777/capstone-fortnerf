import Phaser from 'phaser';
import store from '../../store';
import {
  SPRITE_DIMENSIONS,
  PLAYER_MOVEMENT,
} from '../utils/constants';
import { socket } from '../../App';

class HomeScene extends Phaser.Scene {
  player!: any;

  otherPlayer!: any;

  gameRoom!: string;

  movePlayer!: () => boolean;

  cursor!: {
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
    this.gameRoom = id;
    this.load.image('tiles', '/assets/tiles-img/tilesheet.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/homemap.json',
    );
    this.load.spritesheet(
      'player',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
    );
  }

  create() {
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
    const tileSet = map.addTilesetImage('tiles', 'tiles');
    map.createLayer('floor', tileSet, 50, 20);
    const walls = map.createLayer('walls', tileSet, 50, 20); // add walls const
    map.setCollisionBetween(1, 999, true, 'colliders');
    this.player = this.physics.add.sprite(500, 500, 'player');

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
    // animations
    createMoveAnimations('left', 'player', 3, 5);
    createMoveAnimations('right', 'player', 6, 8);
    createMoveAnimations('up', 'player', 9, 11);
    createMoveAnimations('down', 'player', 0, 2);

    this.movePlayer = () => {
      let playerMoved = false;
      let speed = 1;
      if (this.cursor.shift.isDown) {
        speed = 1.5;
      }
      if (this.cursor.up.isDown) {
        playerMoved = true;
        this.player.direction = 'up';
        this.player.setVelocityY(-PLAYER_MOVEMENT * speed);
        this.player.setVelocityX(0);
        // playerText.setX(this.player.x - 30);
        // playerText.setY(this.player.y + 30);
        this.player.anims.play('up', true);
      } else if (this.cursor.down.isDown) {
        playerMoved = true;
        this.player.direction = 'down';
        this.player.setVelocityY(PLAYER_MOVEMENT * speed);
        this.player.setVelocityX(0);
        // playerText.setX(this.player.x - 30);
        // playerText.setY(this.player.y + 30);
        this.player.anims.play('down', true);
      } else if (this.cursor.left.isDown) {
        playerMoved = true;
        this.player.direction = 'left';
        this.player.setVelocityX(-PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
        // playerText.setX(this.player.x - 30);
        // playerText.setY(this.player.y + 30);
        this.player.anims.play('left', true);
      } else if (this.cursor.right.isDown) {
        playerMoved = true;
        this.player.direction = 'right';
        this.player.setVelocityX(PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
        // playerText.setX(this.player.x - 30);
        // playerText.setY(this.player.y + 30);
        this.player.anims.play('right', true);
      } else {
        playerMoved = false;
        this.player.setVelocity(0);
        if (this.player.direction === 'up') {
          // this.player.anims.play('upstill', true);
        } else if (this.player.direction === 'down') {
          // this.player.anims.play('downstill', true);
        } else if (this.player.direction === 'left') {
          // this.player.anims.play('leftstill', true);
        } else if (this.player.direction === 'right') {
          // this.player.anims.play('rightstill', true);
        }
      }
      return playerMoved;
    };
    const playerCollider = () => {
      this.player.setVelocity(0);
    };
    this.physics.add.collider(
      this.player,
      walls,
      playerCollider,
      undefined,
      this,
    );
    this.cursor = this.input.keyboard.createCursorKeys();

    // socket methods
    socket.on('playerJoin', () => {
      this.otherPlayer = this.physics.add.sprite(500, 500, 'player');
    });
    socket.on('existingPlayer', () => {
      this.otherPlayer = this.physics.add.sprite(500, 500, 'player');
    });
    socket.on('playerMoveHome', ({ x, y, direction }) => {
      this.otherPlayer.x = x;
      this.otherPlayer.y = y;
      this.otherPlayer.direction = direction;
      this.otherPlayer.moving = true;
    });
    socket.on('moveHomeEnd', ({ direction }) => {
      this.otherPlayer.direction = direction;
      this.otherPlayer.moving = false;
    });
  }

  update() {
    this.cameras.main.startFollow(this.player);
    const playerMoved = this.movePlayer();
    if (playerMoved) {
      socket.emit('moveHome', {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.direction,
        room: this.gameRoom,
      });
      this.player.movedLastFrame = true;
    } else if (this.player.movedLastFrame) {
      socket.emit('moveHomeEnd', {
        direction: this.player.direction,
        room: this.gameRoom,
      });
      this.player.movedLastFrame = false;
    }
  }
}

export default HomeScene;
