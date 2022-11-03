import styled from 'styled-components';

const SinglePlayerWrapper = styled.main`
  width: 100vw;
  height: 100vh;
  .single-footer {
    width: 100%;
    height: 35vh;
    background: white;
    overflow-y: scroll;
  }
  .game-description {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export default SinglePlayerWrapper;
