import Phaser from 'phaser';
import store from '../../store';
import {
  BULLET_OFFSET,
  BULLET_MOVEMENT,
  HEALTH_DECREMENT,
  style,
} from '../utils/constants';
import { socket } from '../../service/socket';
import createAnimation, {
  handleOtherPlayerAnims,
} from '../utils/animations';
import randomRespawn from '../utils/respawn';
import Player from '../objects/Player';
import TextBox from '../objects/TextBox';
import { postScore } from '../../utils/api';

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

  trees!: Phaser.Physics.Arcade.Group;

  clock!: number;

  clockText!: Phaser.GameObjects.Text;

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
    this.load.image('tree', '/assets/tiles-img/tree.png');
    this.load.tilemapTiledJSON(
      'map',
      '/assets/tile-map/single-player.json',
    );
  }

  create() {
    this.health = 100;
    this.score = 0;
    this.clock = 180 * 60;
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
    // all the trees object
    this.trees = this.physics.add.group({
      allowGravity: false,
      immovable: true,
    });
    map
      .getObjectLayer('trees')
      .objects.forEach(
        (tree: {
          x: number;
          y: number;
          width: number;
          height: number;
        }) => {
          const treeSprite = this.trees
            .create(tree.x + 50, tree.y - 45, 'tree')
            .setOrigin(0);
          treeSprite.body.setSize(tree.width - 5, tree.height);
        },
      );
    // player and other players group
    this.player = new Player(
      this,
      this.startingX,
      this.startingY,
      this.playerOneUsername,
      'player',
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
        this.physics.add.overlap(
          this.bullet,
          this.trees,
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
    const playerCollision = async () => {
      try {
        this.player.setVelocityY(0);
      } catch (err) {
        // do nothing
      }
    };
    this.physics.add.collider(
      this.player,
      this.trees,
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
        data.forEach(
          (player: {
            startingCoords: { x: number; y: number };
            id: string;
            username: string | string[];
          }) => {
            const otherPlayer: any = this.physics.add.sprite(
              player.startingCoords.x,
              player.startingCoords.y,
              'player',
            );
            otherPlayer.socketId = player.id;
            otherPlayer.text = this.add.text(
              otherPlayer.getTopLeft().x - 5,
              otherPlayer.getTopCenter().y - 20,
              player.username,
              style,
            );
            this.otherPlayers.add(otherPlayer);
          },
        );
      } catch (err) {
        // want catch block to do nothing
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
          // want catch block to do nothing
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
        // want catch block to do nothing
      }
    });

    socket.on('bulletShot', async ({ x, y, direction }) => {
      try {
        this.otherBullet = this.physics.add
          .sprite(x, y, 'bullet')
          .setScale(0.2);
        this.physics.add.overlap(
          this.otherBullet,
          this.trees,
          async (theBullet) => {
            try {
              theBullet.destroy();
            } catch (err) {
              // do nothing
            }
          },
          undefined,
          this,
        );
        this.physics.add.overlap(
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
      this.otherPlayers.children.entries.forEach((player) => {
        handleOtherPlayerAnims(player);
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
