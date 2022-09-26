import Phaser from 'phaser';
import store from '../../store';
import {
  SPRITE_DIMENSIONS,
  PLAYER_MOVEMENT,
  BULLET_OFFSET,
  BULLET_MOVEMENT,
} from '../utils/constants';
import { socket } from '../../App';

let player: any;
let gameRoom: string;
let playerOneUsername: string;
let playerText: Phaser.GameObjects.Text;
let otherPlayer: any;
let otherPlayerText: Phaser.GameObjects.Text;
let shootBullet: any;
let movePlayer: () => boolean;
let bullet: any;
let otherBullet;
let health = 100;
let lives = 3;
let collidableObjects:
  | Phaser.GameObjects.GameObject
  | Phaser.GameObjects.GameObject[]
  | Phaser.GameObjects.Group
  | Phaser.GameObjects.Group[];
let cursor: {
  shift: Phaser.Input.Keyboard.Key;
  up: Phaser.Input.Keyboard.Key;
  down: Phaser.Input.Keyboard.Key;
  left: Phaser.Input.Keyboard.Key;
  right: Phaser.Input.Keyboard.Key;
  space: Phaser.Input.Keyboard.Key;
};
class FortNerf extends Phaser.Scene {
  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { username } = state.user;
    playerOneUsername = username;
    const { id } = state.game;
    gameRoom = id;
    this.load.spritesheet(
      'player',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
    );
    this.load.spritesheet(
      'otherPlayer',
      '/assets/characters/male_player.png',
      {
        frameWidth: SPRITE_DIMENSIONS,
        frameHeight: SPRITE_DIMENSIONS,
      },
    );
    this.load.image('bullet', '/assets/bullets/01.png');
    this.load.image('tiles', '/assets/tiles-img/tilesheet.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/fort-nerf.json',
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
    const tileSet = map.addTilesetImage('tilesOne', 'tiles');
    map.createLayer('floor', tileSet, 50, 20);
    collidableObjects = map.createLayer('colliders', tileSet, 50, 20);
    map.setCollisionBetween(1, 999, true, 'colliders');

    // player methods
    player = this.physics.add.sprite(500, 500, 'player');
    player.direction = 'down';
    player.body.immovable = true;
    otherPlayer = this.physics.add.sprite(500, 500, 'otherPlayer');
    otherPlayer.body.immovable = true;
    // player movement methods
    movePlayer = () => {
      const playerCollision = () => {
        player.setVelocity(0);
      };
      this.physics.add.collider(
        player,
        collidableObjects,
        playerCollision,
        undefined,
        this,
      );
      let playerMoved = false;
      let speed = 1;
      // collision
      if (cursor.shift.isDown) {
        speed = 1.5;
      }
      if (cursor.up.isDown) {
        playerMoved = true;
        player.direction = 'up';
        player.setVelocityY(-PLAYER_MOVEMENT * speed);
        player.setVelocityX(0);
        playerText.setX(player.x - 30);
        playerText.setY(player.y + 30);
        player.anims.play('up', true);
      } else if (cursor.down.isDown) {
        playerMoved = true;
        player.direction = 'down';
        player.setVelocityY(PLAYER_MOVEMENT * speed);
        player.setVelocityX(0);
        playerText.setX(player.x - 30);
        playerText.setY(player.y + 30);
        player.anims.play('down', true);
      } else if (cursor.left.isDown) {
        playerMoved = true;
        player.direction = 'left';
        player.setVelocityX(-PLAYER_MOVEMENT * speed);
        player.setVelocityY(0);
        playerText.setX(player.x - 30);
        playerText.setY(player.y + 30);
        player.anims.play('left', true);
      } else if (cursor.right.isDown) {
        playerMoved = true;
        player.direction = 'right';
        player.setVelocityX(PLAYER_MOVEMENT * speed);
        player.setVelocityY(0);
        playerText.setX(player.x - 30);
        playerText.setY(player.y + 30);
        player.anims.play('right', true);
      } else {
        playerMoved = false;
        player.setVelocity(0);
        if (player.direction === 'up') {
          player.anims.play('upstill', true);
        } else if (player.direction === 'down') {
          player.anims.play('downstill', true);
        } else if (player.direction === 'left') {
          player.anims.play('leftstill', true);
        } else if (player.direction === 'right') {
          player.anims.play('rightstill', true);
        }
      }
      return playerMoved;
    };
    // bullet methods
    shootBullet = (x: number, y: number, direction: string) => {
      let bulletShot = false;
      if (cursor.space.isDown) {
        if (direction === 'right') {
          bullet = this.physics.add.sprite(
            x + BULLET_OFFSET,
            y,
            'bullet',
          );
        } else if (direction === 'left') {
          bullet = this.physics.add.sprite(
            x - BULLET_OFFSET,
            y,
            'bullet',
          );
        } else if (direction === 'down') {
          bullet = this.physics.add.sprite(
            x,
            y + BULLET_OFFSET,
            'bullet',
          );
        } else if (direction === 'up') {
          bullet = this.physics.add.sprite(
            x,
            y - BULLET_OFFSET,
            'bullet',
          );
        }
        this.physics.add.collider(
          bullet,
          collidableObjects,
          (theBullet) => {
            theBullet.destroy();
          },
          undefined,
          this,
        );
        this.physics.add.collider(
          bullet,
          otherPlayer,
          (theBullet) => {
            theBullet.destroy();
          },
          undefined,
          this,
        );
        bulletShot = true;
        if (direction === 'right') {
          bullet.setVelocityX(BULLET_MOVEMENT);
        } else if (direction === 'left') {
          bullet.setVelocityX(-BULLET_MOVEMENT);
          bullet.flipX = true;
        } else if (direction === 'down') {
          bullet.setVelocityY(BULLET_MOVEMENT);
          bullet.rotation = 1.55;
        } else if (direction === 'up') {
          bullet.setVelocityY(-BULLET_MOVEMENT);
          bullet.rotation = -1.55;
        }
      }
      return bulletShot;
    };
    // player animations
    // movement animation function
    const createMoveAnimations = (
      keyFrame: string,
      spriteKey: string,
      startFrame: number,
      endFrame: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: this.anims.generateFrameNumbers(spriteKey, {
          start: startFrame,
          end: endFrame,
        }),
        frameRate: 10,
        repeat: -1,
      });
    };
    // still animation function
    const createStillAnimation = (
      keyFrame: string,
      spriteKey: string,
      frameNumber: number,
    ) => {
      this.anims.create({
        key: keyFrame,
        frames: [{ key: spriteKey, frame: frameNumber }],
        frameRate: 20,
      });
    };
    // player animations
    // movement animations
    createMoveAnimations('left', 'player', 3, 5);
    createMoveAnimations('right', 'player', 6, 8);
    createMoveAnimations('down', 'player', 0, 2);
    createMoveAnimations('up', 'player', 9, 11);

    // still animations
    createStillAnimation('leftstill', 'player', 4);
    createStillAnimation('rightstill', 'player', 7);
    createStillAnimation('downstill', 'player', 1);
    createStillAnimation('upstill', 'player', 10);

    // other player animations
    // movement animations
    createMoveAnimations('leftTwo', 'otherPlayer', 3, 5);
    createMoveAnimations('rightTwo', 'otherPlayer', 6, 8);
    createMoveAnimations('downTwo', 'otherPlayer', 0, 2);
    createMoveAnimations('upTwo', 'otherPlayer', 9, 11);

    // still animations
    createStillAnimation('leftstillTwo', 'otherPlayer', 4);
    createStillAnimation('rightstillTwo', 'otherPlayer', 7);
    createStillAnimation('downstillTwo', 'otherPlayer', 1);
    createStillAnimation('upstillTwo', 'otherPlayer', 10);

    // collision
    player.setCollideWorldBounds(true);

    // text within game
    playerText = this.add.text(
      player.x - 30,
      player.y + 30,
      playerOneUsername,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    otherPlayerText = this.add.text(
      otherPlayer.x - 30,
      otherPlayer.y + 30,
      'player 2',
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    const healthText = this.add.text(
      100,
      100,
      `hp: ${health.toString()}`,
      {
        fontFamily: '"Roboto Condensed"',
        fontSize: 'px',
      },
    );
    healthText.scrollFactorX = 0;
    healthText.scrollFactorY = 0;
    healthText.setFontSize(60);
    const lifeText = this.add.text(
      100,
      50,
      `lives: ${lives.toString()}`,
      {
        fontFamily: '"Roboto Condensed"',
        fontSize: 'px',
      },
    );
    lifeText.scrollFactorX = 0;
    lifeText.scrollFactorY = 0;
    lifeText.setFontSize(60);
    // keyboard methods
    cursor = this.input.keyboard.createCursorKeys();
    // socket methods
    socket.on('playerMove', ({ x, y, direction }) => {
      if (direction === 'right') {
        otherPlayer.direction = 'right';
      } else if (direction === 'left') {
        otherPlayer.direction = 'left';
      } else if (direction === 'up') {
        otherPlayer.direction = 'up';
      } else if (direction === 'down') {
        otherPlayer.direction = 'down';
      }
      otherPlayer.x = x;
      otherPlayer.y = y;
      otherPlayerText.setX(otherPlayer.x - 30);
      otherPlayerText.setY(otherPlayer.y + 30);
      otherPlayer.moving = true;
    });

    socket.on('playerMoveEnd', (direction) => {
      otherPlayer.direction = direction;
    });

    socket.on('bulletShot', ({ x, y, direction }) => {
      otherBullet = this.physics.add.sprite(x, y, 'bullet');
      this.physics.add.collider(
        otherBullet,
        player,
        (theBullet) => {
          health -= 10;
          healthText.setText(`hp: ${health.toString()}`);
          if (health <= 0) {
            lives -= 1;
            health = 100;
            lifeText.setText(`lives: ${lives.toString()}`);
            healthText.setText(`hp: ${health.toString()}`);
            player.setX(200);
            player.setY(300);
            playerText.setX(player.x - 30);
            playerText.setY(player.y + 30);
            player.direction = 'down';
            socket.emit('move', {
              x: 200,
              y: 300,
              direction: 'down',
              room: gameRoom,
            });
          }
          if (lives === 0) {
            console.log('You lost');
          }
          theBullet.destroy();
        },
        undefined,
        this,
      );
      this.physics.add.collider(
        otherBullet,
        collidableObjects,
        (theBullet) => {
          theBullet.destroy();
        },
        undefined,
        this,
      );
      if (direction === 'left') {
        otherBullet.flipX = true;
        otherBullet.setVelocityX(-BULLET_MOVEMENT);
      } else if (direction === 'right') {
        otherBullet.setVelocityX(BULLET_MOVEMENT);
      } else if (direction === 'down') {
        otherBullet.rotation = 1.55;
        otherBullet.setVelocityY(BULLET_MOVEMENT);
      } else if (direction === 'up') {
        otherBullet.rotation = -1.55;
        otherBullet.setVelocityY(-BULLET_MOVEMENT);
      }
    });
  }

  update() {
    this.cameras.main.startFollow(player);
    const playerMoved = movePlayer();
    if (playerMoved) {
      socket.emit('move', {
        x: player.x,
        y: player.y,
        direction: player.direction,
        room: gameRoom,
      });
      player.movedLastFrame = true;
    } else {
      if (player.movedLastFrame) {
        socket.emit('moveEnd', {
          direction: player.direction,
          room: gameRoom,
        });
      }
      player.movedLastFrame = false;
    }
    if (otherPlayer.moving) {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('rightTwo');
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('leftTwo');
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('upTwo');
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('downTwo');
      }
    } else if (!otherPlayer.moving) {
      if (otherPlayer.direction === 'right') {
        otherPlayer.anims.play('rightstillTwo');
      } else if (otherPlayer.direction === 'left') {
        otherPlayer.anims.play('leftstillTwo');
      } else if (otherPlayer.direction === 'up') {
        otherPlayer.anims.play('upstillTwo');
      } else if (otherPlayer.direction === 'down') {
        otherPlayer.anims.play('downstillTwo');
      }
    }
    // // controls bullet updates on space press
    const bulletMoved = shootBullet(
      player.x,
      player.y,
      player.direction,
    );
    if (bulletMoved) {
      socket.emit('shoot', {
        x: bullet.x,
        y: bullet.y,
        direction: player.direction,
        room: gameRoom,
      });
    }
  }
}

export default FortNerf;
