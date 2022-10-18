import Phaser from 'phaser';
import store from '../../store';
import {
  BULLET_OFFSET,
  BULLET_MOVEMENT,
  HEALTH_DECREMENT,
} from '../utils/constants';
import { socket } from '../../service/socket';
import movePlayer from '../utils/playerMove';
import createAnimation, {
  handleOtherPlayerAnims,
} from '../utils/animations';

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
    this.load.atlas(
      'player',
      '/assets/characters/male_player.png',
      '/assets/characters/male_player.json',
    );
    this.load.atlas(
      'bullet',
      '/assets/bullets/nerfBullet.png',
      '/assets/bullets/nerfBullet.json',
    );
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

    // bullet methods
    this.shootBullet = (x: number, y: number, direction: string) => {
      let bulletShot = false;
      if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
        if (direction === 'right') {
          this.bullet = this.physics.add
            .sprite(x + BULLET_OFFSET, y, 'bullet')
            .setScale(0.2);
        } else if (direction === 'left') {
          this.bullet = this.physics.add
            .sprite(x - BULLET_OFFSET, y, 'bullet')
            .setScale(0.2);
        } else if (direction === 'down') {
          this.bullet = this.physics.add
            .sprite(x, y + BULLET_OFFSET, 'bullet')
            .setScale(0.2);
        } else if (direction === 'up') {
          this.bullet = this.physics.add
            .sprite(x, y - BULLET_OFFSET, 'bullet')
            .setScale(0.2);
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
    // bullet animation
    createAnimation(this.anims, 'shoot', 'bullet', 'bullet', 1, 1);
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
            data.startingCoords.x,
            data.startingCoords.y,
            'player',
          );
          this.player.direction = 'down';
          this.player.body.immovable = true;
          this.otherPlayer.body.immovable = true;
          this.otherPlayer.anims.play('downStill');
          this.otherPlayer.direction = 'down';
          this.otherPlayerText = this.add.text(
            this.otherPlayer.x - 30,
            this.otherPlayer.y - 30,
            data.username,
            {
              fontFamily:
                'Georgia, "Goudy Bookletter 1911", Times, serif',
            },
          );
        }
      } catch (err) {
        // want catch block to do nothing
      }
    });
    socket.on('playerMove', async ({ x, y, direction, respawn }) => {
      try {
        this.otherPlayer.x = x;
        this.otherPlayer.y = y;
        this.otherPlayer.direction = direction;
        this.otherPlayerText.setX(this.otherPlayer.x - 30);
        this.otherPlayerText.setY(this.otherPlayer.y - 30);
        this.otherPlayer.moving = !respawn;
      } catch (err) {
        // want catch block to do nothing
      }
    });

    socket.on('playerMoveEnd', async (direction) => {
      try {
        this.otherPlayer.direction = direction;
        this.otherPlayer.moving = false;
      } catch (err) {
        // want catch block to do nothing
      }
    });

    socket.on('bulletShot', async ({ x, y, direction }) => {
      try {
        this.otherBullet = this.physics.add
          .sprite(x, y, 'bullet')
          .setScale(0.2);
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
                  respawn: true,
                });
              }
            } catch (err) {
              // want catch block to do nothing
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
        // want catch block to do nothing
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
        // want catch block to do nothing
      }
    });
  }

  update() {
    this.cameras.main.startFollow(this.player);
    const playerMoved = movePlayer(
      this.player,
      this.cursor,
      this.playerText,
    );
    if (playerMoved) {
      socket.emit('move', {
        x: this.player.x,
        y: this.player.y,
        direction: this.player.direction,
        room: this.gameRoom,
        respawn: false,
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
      handleOtherPlayerAnims(this.otherPlayer);
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
