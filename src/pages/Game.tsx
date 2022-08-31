import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

const GameWrapper = styled.main`
  color: white;
`;

function Game() {
  const { id } = useParams();
  return (
    <GameWrapper>
      <h1>
        Game Lobby
        {id}
      </h1>
    </GameWrapper>
  );
}

export default Game;
