import Phaser from 'phaser';
import {
  BULLET_OFFSET,
  BULLET_MOVEMENT,
  HEALTH_DECREMENT,
  MAP_SCALE,
  RECT,
} from '../../utils/constants';
import { socket } from '../../../../../common/service/socket';
import randomRespawn from '../../utils/respawn';
import Player from '../../objects/Player';
import Box from '../../objects/DialogueBox';
import loadCharacters from '../../utils/loadAssets';
import { createMap } from '../../utils/createMap';
import {
  bulletIsShot,
  endMove,
  existingPlayers,
  playerMove,
  stopGameListeners,
} from '../service/socketListeners';
import getStore, { keyboardChecker } from '../../utils/store';

type PlayerInfo = {
  username: string;
  playerSprite: string;
  x: number;
  y: number;
};
class FortNerf extends Phaser.Scene {
  player!: Player;

  error!: string;

  gameRoom!: string;

  playerInfo!: PlayerInfo;

  otherPlayers!: Phaser.Physics.Arcade.Group;

  // eslint-disable-next-line no-unused-vars
  shootBullet!: (x: number, y: number, direction: string) => boolean;

  bullet!: Phaser.Physics.Arcade.Sprite;

  bullets!: Phaser.Physics.Arcade.Group;

  otherBullet!: Phaser.Physics.Arcade.Sprite;

  otherBullets!: Phaser.Physics.Arcade.Group;

  spaceBar!: Phaser.Input.Keyboard.Key;

  healthBar!: Phaser.GameObjects.Rectangle;

  scoreText!: Box;

  constructor() {
    super('FortNerf');
  }

  preload() {
    const {
      user: { username, x, y, playerSprite },
      game: { id },
    } = getStore();
    this.playerInfo = {
      username,
      x,
      y,
      playerSprite,
    };
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
    this.scene.remove('HomeScene');
    // physic groups
    this.bullets = this.physics.add.group();
    this.otherBullets = this.physics.add.group();
    this.otherPlayers = this.physics.add.group({
      immovable: true,
    });
    // map creation and tiles
    const map = createMap(this, 'gameMap');
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
    // player
    this.player = new Player(
      this,
      this.playerInfo.x,
      this.playerInfo.y,
      this.playerInfo.username,
      this.playerInfo.playerSprite,
    ).setScale(1.5);
    this.player.setPushable(false);
    // text within game
    this.scoreText = new Box(
      this,
      100,
      15,
      'div',
      'font-size: 20px; background-color: white; color: black; width: auto; border: solid black 2px; font: Arial;',
      `Kills: ${this.player.kills.toString()}`,
    );
    // health bar
    this.add
      .rectangle(RECT.x, RECT.y, RECT.width, 20, 0xff0000)
      .setScrollFactor(0);
    this.healthBar = this.add
      .rectangle(RECT.x, RECT.y, RECT.width, 20, 0x00ff00)
      .setScrollFactor(0);
    // bullet methods
    this.shootBullet = (x: number, y: number, direction: string) => {
      let bulletShot = false;
      if (Phaser.Input.Keyboard.JustDown(this.spaceBar)) {
        bulletShot = true;
        switch (direction) {
          case 'right':
            this.bullet = this.physics.add
              .sprite(x + BULLET_OFFSET, y, 'bullet')
              .setScale(0.2);
            this.bullets.add(this.bullet);
            this.bullet.setVelocityX(BULLET_MOVEMENT);
            return bulletShot;
          case 'left':
            this.bullet = this.physics.add
              .sprite(x - BULLET_OFFSET, y, 'bullet')
              .setScale(0.2);
            this.bullets.add(this.bullet);
            this.bullet.setVelocityX(-BULLET_MOVEMENT);
            this.bullet.flipX = true;
            return bulletShot;
          case 'down':
            this.bullet = this.physics.add
              .sprite(x, y + BULLET_OFFSET, 'bullet')
              .setScale(0.2);
            this.bullets.add(this.bullet);
            this.bullet.setVelocityY(BULLET_MOVEMENT);
            this.bullet.rotation = 1.55;
            return bulletShot;
          case 'up':
            this.bullet = this.physics.add
              .sprite(x, y - BULLET_OFFSET, 'bullet')
              .setScale(0.2);
            this.bullets.add(this.bullet);
            this.bullet.setVelocityY(-BULLET_MOVEMENT);
            this.bullet.rotation = -1.55;
            return bulletShot;
          default:
            return false;
        }
      }
      return bulletShot;
    };
    // collision
    const playerCollision = async () => {
      this.player.setVelocityY(0);
    };
    this.physics.add.collider(
      this.player,
      collidableObjects,
      playerCollision,
      undefined,
      this,
    );
    this.physics.add.collider(
      this.bullets,
      collidableObjects,
      (theBullet) => {
        theBullet.destroy();
      },
      undefined,
      this,
    );
    this.physics.add.collider(
      this.bullets,
      this.otherPlayers,
      (theBullet) => {
        theBullet.destroy();
      },
      undefined,
      this,
    );
    this.physics.add.collider(
      this.otherBullets,
      collidableObjects,
      async (theBullet) => {
        try {
          theBullet.destroy();
        } catch (err) {
          console.log(err.message);
          this.error = err.message;
        }
      },
      undefined,
      this,
    );
    this.physics.add.collider(
      this.otherBullets,
      this.player,
      // the bullet is the second argument so that the collision destroys the correct object
      async (thePlayer, theBullet: any) => {
        try {
          theBullet?.destroy();
          this.player.health -= HEALTH_DECREMENT;
          this.healthBar.width -= 15;
          if (this.player.health <= 0) {
            const respawnCoords = randomRespawn();
            this.player.health = 100;
            this.healthBar.width = RECT.width;
            this.player.setX(respawnCoords.x);
            this.player.setY(respawnCoords.y);
            this.player.direction = 'down';
            socket.emit('move', {
              x: respawnCoords.x,
              y: respawnCoords.y,
              direction: 'down',
              room: this.gameRoom,
              respawn: true,
              otherSocketId: theBullet.socketId,
            });
          }
        } catch (err) {
          console.log(err.message);
          this.error = err.message;
        }
      },
      undefined,
      this,
    );
    this.player.setCollideWorldBounds(true);
    // keyboard methods
    this.spaceBar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
    // socket methods
    socket.emit('home_game', {
      room: this.gameRoom,
    });
    // socket.on methods
    existingPlayers(this, this.otherPlayers, 'existing_game_players');
    playerMove(
      this.otherPlayers,
      this.player,
      'playerMove',
      this.scoreText,
    );
    endMove(this.otherPlayers, 'playerMoveEnd');
    bulletIsShot(
      this,
      this.otherBullet,
      this.otherBullets,
      this.error,
    );
    socket.on('game_over', (data) => {
      stopGameListeners();
      this.scene.start('EndGame', { winner: data });
    });
  }

  update() {
    keyboardChecker(this.input);
    this.cameras.main.startFollow(this.player);
    if (this.player.kills >= 10) {
      socket.emit('winner', {
        username: this.playerInfo.username,
        room: this.gameRoom,
      });
      stopGameListeners();
      this.scene.start('EndGame', {
        winner: this.playerInfo.username,
      });
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
      this.otherPlayers.children.entries?.forEach((player: any) => {
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
