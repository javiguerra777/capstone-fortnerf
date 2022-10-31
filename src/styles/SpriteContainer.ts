import styled from 'styled-components';

const SpriteContainer = styled.img`
  --pixel-size: 1;
  width: calc(120px * var(--pixel-size));
  position: relative;
  overflow: hidden;
`;

export default SpriteContainer;
