import styled from 'styled-components';

const NewServerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  button:hover {
    cursor: pointer;
  }
  .game-Error {
    color: white;
  }
  .game-form {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      margin-bottom: 1em;
      input {
        margin-left: 0.5em;
      }
    }
    button {
      background: none;
      color: white;
      border: solid 1px white;
      border-radius: 0.5em;
      padding: 5px;
    }
  }
`;
export default NewServerWrapper;
