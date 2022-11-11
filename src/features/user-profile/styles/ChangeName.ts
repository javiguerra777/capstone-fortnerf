import styled from 'styled-components';

const ChangeNameWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  .container {
    background: black;
    color: white;
    border: solid 1px white;
    width: 80%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.5em 1em 0.5em;
    header {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      .player-sprite {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
    }
    button {
      background: none;
      border: none;
      color: white;
      font-size: 1.5em;
    }
    button:hover {
      cursor: pointer;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      label {
        margin-bottom: 1em;
      }
      input {
        margin-left: 10px;
        width: 15em;
      }
      .character-option {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        margin-bottom: 1em;
      }
      .radio {
        width: 25%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 1em;
        label {
          width: auto;
        }
        input {
          justify-self: flex-start;
          margin: 0 auto;
          width: 15px;
        }
      }
    }
    .submit-btn {
      background: black;
      color: white;
      border: solid 1px white;
      border-radius: 0.3em;
      font-size: 0.8em;
      width: 10em;
      padding: 5px;
    }
  }
`;

export default ChangeNameWrapper;
