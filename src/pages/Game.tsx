import React from 'react';
import styled from 'styled-components';
import GameComponent from '../components/GameComponent';

const GameWrapper = styled.main``;

function Game() {
  return (
    <GameWrapper>
      <GameComponent />
    </GameWrapper>
  );
}

export default Game;
