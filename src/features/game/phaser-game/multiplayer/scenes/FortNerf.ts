import Phaser from 'phaser';
import store from '../../../../../app/redux';
import {
  BULLET_OFFSET,
  BULLET_MOVEMENT,
  HEALTH_DECREMENT,
  MAP_SCALE,
  style,
} from '../../utils/constants';
import { socket } from '../../../../../service/socket';
import randomRespawn from '../../utils/respawn';
import Player from '../../objects/Player';
import OtherPlayer from '../../objects/OtherPlayer';
import TextBox from '../../objects/TextBox';
import postScore from '../../../api/PostScore';
import loadCharacters from '../../utils/loadAssets';

class FortNerf extends Phaser.Scene {
  player!: Player;

  startingX!: number;

  startingY!: number;

  gameRoom!: string;

  playerOneUsername!: string;

  otherPlayers!: Phaser.Physics.Arcade.Group;

  // eslint-disable-next-line no-unused-vars
  shootBullet!: (x: number, y: number, direction: string) => boolean;

  bullet!: Phaser.Physics.Arcade.Sprite;

  otherBullet!: Phaser.Physics.Arcade.Sprite;

  cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  spaceBar!: Phaser.Input.Keyboard.Key;

  healthText!: Phaser.GameObjects.Text;

  scoreText!: Phaser.GameObjects.Text;

  health!: number;

  score!: number;

  clock!: number;

  clockText!: Phaser.GameObjects.Text;

  sprite!: string;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const state = store.getState();
    const { username, x, y, playerSprite } = state.user;
    this.playerOneUsername = username;
    this.sprite = playerSprite;
    this.startingX = x;
    this.startingY = y;
    const { id } = state.game;
    this.gameRoom = id;
    loadCharacters(this);
    this.load.atlas(
      'bullet',
      '/assets/bullets/nerfBullet.png',
      '/assets/bullets/nerfBullet.json',
    );
    this.load.image('tiles', '/assets/tiles-img/sTiles.png');
    this.load.tilemapTiledJSON(
      'gameMap',
      '/assets/tile-map/homemap.json',
    );
  }

  create() {
    this.health = 100;
    this.score = 0;
    this.clock = 180 * 60;
    const map: any = this.make.tilemap({ key: 'gameMap' });
    this.physics.world.setBounds(
      0,
      0,
      map.widthInPixels * MAP_SCALE,
      map.heightInPixels * MAP_SCALE,
    );
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * MAP_SCALE,
      map.heightInPixels * MAP_SCALE,
    );
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
    // player and other players group
    this.player = new Player(
      this,
      this.startingX,
      this.startingY,
      this.playerOneUsername,
      this.sprite,
    );
    this.otherPlayers = this.physics.add.group({
      immovable: true,
    });
    // text within game
    const { width } = this.sys.game.canvas;
    this.clockText = new TextBox(
      this,
      width / 2,
      10,
      `Time: ${this.clock.toString()}`,
    );
    this.clockText.scrollFactorX = 0;
    this.clockText.scrollFactorY = 0;
    this.clockText.setFontSize(36);
    this.clockText.setColor('black');
    this.healthText = this.add.text(
      10,
      10,
      `hp: ${this.health.toString()}`,
      style,
    );
    this.healthText.scrollFactorX = 0;
    this.healthText.scrollFactorY = 0;
    this.healthText.setFontSize(30);
    this.healthText.setColor('black');
    this.scoreText = this.add.text(
      10,
      40,
      `Score: ${this.score.toString()}`,
      style,
    );
    this.scoreText.scrollFactorX = 0;
    this.scoreText.scrollFactorY = 0;
    this.scoreText.setFontSize(30);
    this.scoreText.setColor('black');

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
          this.otherPlayers,
          (theBullet) => {
            this.score += 10;
            this.scoreText?.setText(
              `Score: ${this.score.toString()}`,
            );
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
    // collision
    const playerCollision = async () => {
      try {
        this.player.setVelocityY(0);
      } catch (err) {
        console.log(err.message);
      }
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
      room: this.gameRoom,
    });
    socket.on('existing_game_players', async (data) => {
      try {
        data.forEach((player: any) => {
          const otherPlayer: any = new OtherPlayer(
            this,
            player.startingCoords.x,
            player.startingCoords.y,
            player.username,
            player.sprite,
          );
          otherPlayer.socketId = player.id;
          this.otherPlayers.add(otherPlayer);
        });
      } catch (err) {
        console.log(err.message);
      }
    });
    socket.on(
      'playerMove',
      async ({ x, y, direction, socketId, respawn }) => {
        try {
          this.otherPlayers.children.entries.forEach(
            (player: any) => {
              if (player.socketId === socketId) {
                player.x = x;
                player.y = y;
                player.direction = direction;
                player.text.setX(player.getTopLeft().x - 5);
                player.text.setY(player.getTopCenter().y - 20);
                player.moving = !respawn;
              }
            },
          );
        } catch (err) {
          console.log(err.message);
        }
      },
    );

    socket.on('playerMoveEnd', async ({ direction, socketId }) => {
      try {
        this.otherPlayers.children.entries.forEach((player: any) => {
          if (player.socketId === socketId) {
            player.direction = direction;
            player.moving = false;
          }
        });
      } catch (err) {
        console.log(err.message);
      }
    });

    socket.on('bulletShot', async ({ x, y, direction }) => {
      try {
        this.otherBullet = this.physics.add
          .sprite(x, y, 'bullet')
          .setScale(0.2);
        this.physics.add.collider(
          this.otherBullet,
          collidableObjects,
          async (theBullet) => {
            try {
              theBullet.destroy();
            } catch (err) {
              console.log(err.message);
            }
          },
          undefined,
          this,
        );
        this.physics.add.collider(
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
                this.health = 100;
                this.healthText?.setText(
                  `hp: ${this.health.toString()}`,
                );
                const respawnCoords = randomRespawn();
                this.player.setX(respawnCoords.x);
                this.player.setY(respawnCoords.y);
                this.player.direction = 'down';
                socket.emit('move', {
                  x: respawnCoords.x,
                  y: respawnCoords.y,
                  direction: 'down',
                  room: this.gameRoom,
                  respawn: true,
                });
              }
            } catch (err) {
              console.log(err.message);
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
        console.log(err.message);
      }
    });
  }

  update() {
    const { width } = this.sys.game.canvas;
    this.cameras.main.startFollow(this.player);
    this.clock -= 1;
    this.clockText.setText(`Time: ${this.clock.toString()}`);
    this.clockText.setX(width / 2);
    if (this.clock <= 0) {
      const data = {
        id: this.gameRoom,
        user: {
          username: this.playerOneUsername,
          score: this.score,
        },
      };
      postScore(data);
      this.scene.stop('FortNerf').launch('EndGame');
    }
    const playerMoved = this.player.movePlayer();
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
    if (this.otherPlayers.children.entries.length > 0) {
      this.otherPlayers.children.entries.forEach((player: any) => {
        player?.handleAnimations();
      });
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
