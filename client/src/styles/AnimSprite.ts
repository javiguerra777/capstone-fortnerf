import styled from 'styled-components';

const AnimateCharacter = styled.section`
  max-height: 8em;
  width: 75vw;
  background: #96ffc1;
  position: relative;
  --pixel-size: 2;
  .Character {
    width: calc(32px * var(--pixel-size));
    height: calc(46px * var(--pixel-size));
    overflow: hidden;
    position: relative;
    bottom: 3em;
    margin: 4em auto;
  }

  .Character_spritesheet {
    animation: moveSpritesheet 1s steps(3) infinite;
    width: calc(120px * var(--pixel-size));
    position: absolute;
  }
  .Character_shadow {
    position: absolute;
    top: 25px;
    width: calc(40px * var(--pixel-size));
    height: calc(32px * var(--pixel-size));
  }

  .pixelart {
    image-rendering: pixelated;
  }

  .face-right {
    top: calc(-32px * var(--pixel-size));
  }
  .face-up {
    top: calc(-64px * var(--pixel-size));
  }
  .face-left {
    top: calc(-96px * var(--pixel-size));
  }

  @keyframes moveSpritesheet {
    from {
      transform: translate3d(0px, 0, 0);
    }
    to {
      transform: translate3d(-100%, 0, 0);
    }
  }
`;

export default AnimateCharacter;
