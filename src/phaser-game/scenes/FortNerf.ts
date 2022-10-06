import Phaser from 'phaser';
import store from '../../store';
import {
  SPRITE_DIMENSIONS,
  PLAYER_MOVEMENT,
  BULLET_OFFSET,
  BULLET_MOVEMENT,
  HEALTH_DECREMENT,
} from '../utils/constants';
import { socket } from '../../service/socket';

class FortNerf extends Phaser.Scene {
  player!: any;

  startingX!: number;

  startingY!: number;

  gameRoom!: string;

  playerOneUsername!: string;

  otherPlayer!: any;

  shootBullet!: any;

  bullet!: any;

  otherBullet!: any;

  movePlayer!: () => boolean;

  handleOtherPlayerAnims!: () => void;

  cursor!: {
    shift: Phaser.Input.Keyboard.Key;
    up: Phaser.Input.Keyboard.Key;
    down: Phaser.Input.Keyboard.Key;
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space?: Phaser.Input.Keyboard.Key;
  };

  spaceBar!: Phaser.Input.Keyboard.Key;

  playerText!: Phaser.GameObjects.Text;

  otherPlayerText!: Phaser.GameObjects.Text;

  healthText!: Phaser.GameObjects.Text;

  lifeText!: Phaser.GameObjects.Text;

  health!: number;

  lives!: number;

  otherBulletCollider!: Phaser.Physics.Arcade.Collider;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { username, x, y } = state.user;
    this.playerOneUsername = username;
    this.startingX = x;
    this.startingY = y;
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
    this.health = 100;
    this.lives = 3;
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
    this.player = this.physics.add.sprite(
      this.startingX,
      this.startingY,
      'player',
    );
    this.player.direction = 'down';
    this.player.body.immovable = true;

    // text within game
    this.playerText = this.add.text(
      this.player.x - 30,
      this.player.y + 30,
      this.playerOneUsername,
      {
        fontFamily: 'Georgia, "Goudy Bookletter 1911", Times, serif',
      },
    );
    this.healthText = this.add.text(
      100,
      100,
      `hp: ${this.health.toString()}`,
      {
        fontFamily: '"Roboto Condensed"',
        fontSize: 'px',
      },
    );
    this.healthText.scrollFactorX = 0;
    this.healthText.scrollFactorY = 0;
    this.healthText.setFontSize(60);
    this.lifeText = this.add.text(
      100,
      50,
      `lives: ${this.lives.toString()}`,
      {
        fontFamily: '"Roboto Condensed"',
        fontSize: 'px',
      },
    );
    this.lifeText.scrollFactorX = 0;
    this.lifeText.scrollFactorY = 0;
    this.lifeText.setFontSize(60);

    // player movement methods
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
        this.player.anims.play('up', true);
      } else if (this.cursor.down.isDown) {
        playerMoved = true;
        this.player.direction = 'down';
        this.player.setVelocityY(PLAYER_MOVEMENT * speed);
        this.player.setVelocityX(0);
        this.player.anims.play('down', true);
      } else if (this.cursor.left.isDown) {
        playerMoved = true;
        this.player.direction = 'left';
        this.player.setVelocityX(-PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
        this.player.anims.play('left', true);
      } else if (this.cursor.right.isDown) {
        playerMoved = true;
        this.player.direction = 'right';
        this.player.setVelocityX(PLAYER_MOVEMENT * speed);
        this.player.setVelocityY(0);
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
      this.playerText.setX(this.player.x - 30);
      this.playerText.setY(this.player.y + 30);

      return playerMoved;
    };
    // other player anims
    this.handleOtherPlayerAnims = async () => {
      try {
        if (this.otherPlayer.moving) {
          if (this.otherPlayer.direction === 'right') {
            this.otherPlayer.anims.play('right');
          } else if (this.otherPlayer.direction === 'left') {
            this.otherPlayer.anims.play('left');
          } else if (this.otherPlayer.direction === 'up') {
            this.otherPlayer.anims.play('up');
          } else if (this.otherPlayer.direction === 'down') {
            this.otherPlayer.anims.play('down');
          }
        } else {
          if (this.otherPlayer.direction === 'right') {
            this.otherPlayer.anims.play('rightstill');
          } else if (this.otherPlayer.direction === 'left') {
            this.otherPlayer.anims.play('leftstill');
          } else if (this.otherPlayer.direction === 'up') {
            this.otherPlayer.anims.play('upstill');
          } else if (this.otherPlayer.direction === 'down') {
            this.otherPlayer.anims.play('downstill');
          }
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
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
    this.player.setCollideWorldBounds(true);

    // keyboard methods
    this.cursor = this.input.keyboard.createCursorKeys();
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );

    // socket methods
    socket.emit('home_game', {
      username: this.playerOneUsername,
      room: this.gameRoom,
      x: this.startingX,
      y: this.startingY,
    });
    socket.on('main_join', async (data) => {
      try {
        if (!this.otherPlayer) {
          this.otherPlayer = this.physics.add.sprite(
            data.x,
            data.y,
            'player',
          );
          this.player.direction = 'down';
          this.player.body.immovable = true;
          this.otherPlayer.body.immovable = true;
          this.otherPlayer.anims.play('downstill');
          this.otherPlayer.direction = 'down';
          this.otherPlayerText = this.add.text(
            this.otherPlayer.x - 30,
            this.otherPlayer.y + 30,
            data.username,
            {
              fontFamily:
                'Georgia, "Goudy Bookletter 1911", Times, serif',
            },
          );
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });
    // socket.on('existingPlayer', async (data) => {
    //   try {
    //     if (!this.otherPlayer) {
    //       this.otherPlayer = this.physics.add.sprite(
    //         700,
    //         700,
    //         'player',
    //       );
    //       this.otherPlayer.body.immovable = true;
    //       this.otherPlayer.anims.play('downstill');
    //       this.otherPlayer.direction = 'down';
    //       this.otherPlayerText = this.add.text(
    //         this.otherPlayer.x - 30,
    //         this.otherPlayer.y + 30,
    //         data.username,
    //         {
    //           fontFamily:
    //             'Georgia, "Goudy Bookletter 1911", Times, serif',
    //         },
    //       );
    //     }
    //   } catch (err) {
    //     if (err instanceof Error) {
    //       console.log(err.message);
    //     }
    //   }
    // });
    socket.on('playerMove', async ({ x, y, direction }) => {
      try {
        this.otherPlayer.x = x;
        this.otherPlayer.y = y;
        this.otherPlayer.direction = direction;
        this.otherPlayerText.setX(this.otherPlayer.x - 30);
        this.otherPlayerText.setY(this.otherPlayer.y + 30);
        this.otherPlayer.moving = true;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });

    socket.on('playerMoveEnd', async (direction) => {
      try {
        this.otherPlayer.direction = direction;
        this.otherPlayer.moving = false;
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });

    socket.on('bulletShot', async ({ x, y, direction }) => {
      try {
        this.otherBullet = this.physics.add.sprite(x, y, 'bullet');
        this.otherBulletCollider = this.physics.add.collider(
          this.otherBullet,
          this.player,
          async (theBullet) => {
            try {
              theBullet?.destroy();
              this.health -= HEALTH_DECREMENT;
              this.healthText?.setText(
                `hp: ${this.health.toString()}`,
              );
              if (this.health <= 0) {
                this.lives -= 1;
                if (this.lives <= 0) {
                  // how the scene shifts to endgame
                  this.bullet?.destroy();
                  this.otherBullet?.destroy();
                  theBullet?.destroy();
                  this.healthText?.destroy();
                  this.lifeText?.destroy();
                  this.otherBulletCollider.destroy();
                  this.scene.start('EndGame');
                  socket.emit('GameOver', this.gameRoom);
                  return;
                }
                this.health = 100;
                this.lifeText?.setText(
                  `lives: ${this.lives.toString()}`,
                );
                this.healthText?.setText(
                  `hp: ${this.health.toString()}`,
                );
                this.player.setX(200);
                this.player.setY(300);
                this.playerText?.setX(this.player.x - 30);
                this.playerText?.setY(this.player.y + 30);
                this.player.direction = 'down';
                socket.emit('move', {
                  x: 200,
                  y: 300,
                  direction: 'down',
                  room: this.gameRoom,
                });
              }
            } catch (err) {
              if (err instanceof Error) {
                console.log(err.message);
              }
            }
          },
          undefined,
          this,
        );
        if (direction === 'left') {
          this.otherBullet.flipX = true;
          this.otherBullet.setVelocityX(-BULLET_MOVEMENT);
        } else if (direction === 'right') {
          this.otherBullet.setVelocityX(BULLET_MOVEMENT);
        } else if (direction === 'down') {
          this.otherBullet.rotation = 1.55;
          this.otherBullet.setVelocityY(BULLET_MOVEMENT);
        } else if (direction === 'up') {
          this.otherBullet.rotation = -1.55;
          this.otherBullet.setVelocityY(-BULLET_MOVEMENT);
        }
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
    });

    socket.on('EndScene', async () => {
      try {
        this.bullet?.destroy();
        this.otherBullet?.destroy();
        this.healthText?.destroy();
        this.lifeText?.destroy();
        this.otherBulletCollider?.destroy();
        this.scene.start('EndGame');
      } catch (err) {
        if (err instanceof Error) {
          console.log(err.message);
        }
      }
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
    if (this.otherPlayer) {
      this.handleOtherPlayerAnims();
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
