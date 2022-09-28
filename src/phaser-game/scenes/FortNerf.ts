import Phaser from 'phaser';
import store from '../../store';
import {
  SPRITE_DIMENSIONS,
  PLAYER_MOVEMENT,
  BULLET_OFFSET,
  BULLET_MOVEMENT,
} from '../utils/constants';
import { socket } from '../../App';

class FortNerf extends Phaser.Scene {
  player!: any;

  gameRoom!: string;

  playerOneUsername!: string;

  otherPlayer!: any;

  shootBullet!: any;

  bullet!: any;

  movePlayer!: () => boolean;

  cursor!: {
    shift: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space?: Phaser.Input.Keyboard.Key;
  };

  spaceBar!: Phaser.Input.Keyboard.Key;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { username } = state.user;
    this.playerOneUsername = username;
    const { id } = state.game;
    this.gameRoom = id;
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
    let health = 100;
    let lives = 3;
    let otherBullet;

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
    const collidableObjects = map.createLayer(
      'colliders',
      tileSet,
      50,
      20,
    );
    map.setCollisionBetween(1, 999, true, 'colliders');

    this.player = this.physics.add.sprite(500, 500, 'player');
    this.otherPlayer = this.physics.add.sprite(
      500,
      500,
      'otherPlayer',
    );

    // text within game
    const playerText = this.add.text(
      this.player.x - 30,
      this.player.y + 30,
      this.playerOneUsername,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    const otherPlayerText = this.add.text(
      this.otherPlayer.x - 30,
      this.otherPlayer.y + 30,
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

    // player and other player methods
    this.player.direction = 'down';
    this.player.body.immovable = true;
    this.otherPlayer.body.immovable = true;
    // player movement methods
    this.movePlayer = () => {
      const playerCollision = () => {
        this.player.setVelocity(0);
      };
      this.physics.add.collider(
        this.player,
        collidableObjects,
        playerCollision,
        undefined,
        this,
      );
      let playerMoved = false;
      let speed = 1;
      // collision
      if (this.cursor.shift.isDown) {
        speed = 1.5;
      }
      if (this.cursor.up.isDown) {
        playerMoved = true;
        this.player.direction = 'up';
        this.player.setVelocityY(-PLAYER_MOVEMENT * speed);
        this.player.setVelocityX(0);
        playerText.setX(this.player.x - 30);
        playerText.setY(this.player.y + 30);
        this.player.anims.play('up', true);
      } else if (this.cursor.down.isDown) {
        playerMoved = true;
        this.player.direction = 'down';
        this.player.setVelocityY(PLAYER_MOVEMENT * speed);
        this.player.setVelocityX(0);
        playerText.setX(this.player.x - 30);
        playerText.setY(this.player.y + 30);
        this.player.anims.play('down', true);
      } else if (this.cursor.left.isDown) {
        playerMoved = true;
        this.player.direction = 'left';
        this.player.setVelocityX(-PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
        playerText.setX(this.player.x - 30);
        playerText.setY(this.player.y + 30);
        this.player.anims.play('left', true);
      } else if (this.cursor.right.isDown) {
        playerMoved = true;
        this.player.direction = 'right';
        this.player.setVelocityX(PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
        playerText.setX(this.player.x - 30);
        playerText.setY(this.player.y + 30);
        this.player.anims.play('right', true);
      } else {
        playerMoved = false;
        this.player.setVelocity(0);
        if (this.player.direction === 'up') {
          this.player.anims.play('upstill', true);
        } else if (this.player.direction === 'down') {
          this.player.anims.play('downstill', true);
        } else if (this.player.direction === 'left') {
          this.player.anims.play('leftstill', true);
        } else if (this.player.direction === 'right') {
          this.player.anims.play('rightstill', true);
        }
      }
      return playerMoved;
    };
    // bullet methods
    this.shootBullet = (x: number, y: number, direction: string) => {
      let bulletShot = false;
      if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
        if (direction === 'right') {
          this.bullet = this.physics.add.sprite(
            x + BULLET_OFFSET,
            y,
            'bullet',
          );
        } else if (direction === 'left') {
          this.bullet = this.physics.add.sprite(
            x - BULLET_OFFSET,
            y,
            'bullet',
          );
        } else if (direction === 'down') {
          this.bullet = this.physics.add.sprite(
            x,
            y + BULLET_OFFSET,
            'bullet',
          );
        } else if (direction === 'up') {
          this.bullet = this.physics.add.sprite(
            x,
            y - BULLET_OFFSET,
            'bullet',
          );
        }
        this.physics.add.collider(
          this.bullet,
          collidableObjects,
          (theBullet) => {
            theBullet.destroy();
          },
          undefined,
          this,
        );
        this.physics.add.collider(
          this.bullet,
          this.otherPlayer,
          (theBullet) => {
            theBullet.destroy();
          },
          undefined,
          this,
        );
        bulletShot = true;
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
    this.player.setCollideWorldBounds(true);

    // keyboard methods
    this.cursor = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // socket methods
    socket.on('playerMove', ({ x, y, direction }) => {
      if (direction === 'right') {
        this.otherPlayer.direction = 'right';
      } else if (direction === 'left') {
        this.otherPlayer.direction = 'left';
      } else if (direction === 'up') {
        this.otherPlayer.direction = 'up';
      } else if (direction === 'down') {
        this.otherPlayer.direction = 'down';
      }
      this.otherPlayer.x = x;
      this.otherPlayer.y = y;
      otherPlayerText.setX(this.otherPlayer.x - 30);
      otherPlayerText.setY(this.otherPlayer.y + 30);
      this.otherPlayer.moving = true;
    });

    socket.on('playerMoveEnd', (direction) => {
      this.otherPlayer.direction = direction;
    });

    socket.on('bulletShot', ({ x, y, direction }) => {
      otherBullet = this.physics.add.sprite(x, y, 'bullet');
      this.input.enableDebug(otherBullet);
      this.physics.add.collider(
        otherBullet,
        this.player,
        (theBullet) => {
          health -= 10;
          healthText.setText(`hp: ${health.toString()}`);
          if (health <= 0) {
            lives -= 1;
            health = 100;
            lifeText.setText(`lives: ${lives.toString()}`);
            healthText.setText(`hp: ${health.toString()}`);
            this.player.setX(200);
            this.player.setY(300);
            playerText.setX(this.player.x - 30);
            playerText.setY(this.player.y + 30);
            this.player.direction = 'down';
            socket.emit('move', {
              x: 200,
              y: 300,
              direction: 'down',
              room: this.gameRoom,
            });
          }
          if (lives === 0) {
            this.scene.start('EndGame');
            socket.emit('GameOver', this.gameRoom);
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
    socket.on('EndScene', () => {
      this.scene.start('EndGame');
    });
  }

  update() {
    this.cameras.main.startFollow(this.player);
    const playerMoved = this.movePlayer();
    if (playerMoved) {
      socket.emit('move', {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.direction,
        room: this.gameRoom,
      });
      this.player.movedLastFrame = true;
    } else {
      if (this.player.movedLastFrame) {
        socket.emit('moveEnd', {
          direction: this.player.direction,
          room: this.gameRoom,
        });
      }
      this.player.movedLastFrame = false;
    }
    if (this.otherPlayer.moving) {
      if (this.otherPlayer.direction === 'right') {
        this.otherPlayer.anims.play('rightTwo');
      } else if (this.otherPlayer.direction === 'left') {
        this.otherPlayer.anims.play('leftTwo');
      } else if (this.otherPlayer.direction === 'up') {
        this.otherPlayer.anims.play('upTwo');
      } else if (this.otherPlayer.direction === 'down') {
        this.otherPlayer.anims.play('downTwo');
      }
    } else if (!this.otherPlayer.moving) {
      if (this.otherPlayer.direction === 'right') {
        this.otherPlayer.anims.play('rightstillTwo');
      } else if (this.otherPlayer.direction === 'left') {
        this.otherPlayer.anims.play('leftstillTwo');
      } else if (this.otherPlayer.direction === 'up') {
        this.otherPlayer.anims.play('upstillTwo');
      } else if (this.otherPlayer.direction === 'down') {
        this.otherPlayer.anims.play('downstillTwo');
      }
    }
    // controls bullet updates on space press
    const bulletMoved = this.shootBullet(
      this.player.x,
      this.player.y,
      this.player.direction,
    );
    if (bulletMoved) {
      socket.emit('shoot', {
        x: this.bullet.x,
        y: this.bullet.y,
        direction: this.player.direction,
        room: this.gameRoom,
      });
    }
  }
}

export default FortNerf;
