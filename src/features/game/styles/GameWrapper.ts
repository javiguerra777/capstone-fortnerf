import styled from 'styled-components';

const GameWrapper = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  button {
    cursor: pointer;
  }
  #error {
    position: fixed;
    background: white;
    color: black;
    width: auto;
    left: 25%;
  }
  .game-chat-container {
    height: 94%;
    width: 100%;
    display: flex;
    flex-direction: row;
  }
  .background-color {
    background: #333333;
  }
  .chat-bar {
    height: 100%;
    width: 15%;
    bottom: 6vh;
    right: 0;
    border-bottom: 3px solid #333333;
    border-left: 3px solid #333333;
    display: flex;
    flex-direction: column;
    .chat-options {
      height: 40%;
      overflow-y: scroll;
      display: flex;
      flex-direction: column;
      align-items: center;
      button {
        width: 90%;
        margin-top: 1em;
        background: none;
        border: solid 1px white;
        border-radius: 0.5em;
        color: white;
        padding: 0.5em;
      }
    }
    .main-chat {
      background: #3b3c36;
      height: 88%;
      overflow-y: scroll;
      overflow-x: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      .ind-message {
        width: 95%;
        height: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        background: #83b0f1;
        color: #fffafa;
        border-radius: 0.5em;
        word-wrap: break-word;
        h3 {
          margin-left: 0.3em;
          font-size: 0.9em;
        }
        h5 {
          font-size: 0.7em;
        }
        p {
          margin-left: 0.4em;
          margin-right: 0.3em;
          font-size: 0.8em;
        }
        .ind-msg-h3 {
          max-width: 100%;
        }
        .ind-msg-header {
          width: 100%;
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          align-items: center;
          max-width: 100%;
          svg {
            margin-left: 0.5em;
          }
          h5 {
            margin-right: 0.5em;
          }
        }
      }
    }
    .message-form {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 7%;
      input {
        width: 93%;
        height: 2em;
        border-radius: 1em;
        background: none;
        border: solid 1px gray;
        color: white;
      }
    }
    .chat-header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 8%;
      h1 {
        color: white;
        margin-left: 0.5em;
      }
      button {
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        margin-right: 0.1em;
      }
    }
  }
  .user-settings {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 6%;
    width: 100%;
    border-top: 3px solid #333333);
  }
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .video-voice {
    align-items: center;
    p, button {
      background: #414a4c;
      margin-left: 0.5em;
    }
    p {
      color: white;
      padding: 0.4em;
      border-radius: 0.5em;
    }
    button {
      font-size: 1.5em;
      color: green;
      border: none;
      padding-top: 0.2em;
      border-radius: 1em;
    }
  }
  .text-users {
    button {
      margin-right: 0.5em;
      border: none;
      background: #414a4c;
      font-size: 1.5em;
      color: white;
      border-radius: 0.5em;
    }
  }
  #videoElement {
    margin-left: 1em;
    height: 100%;
    width: 50px;
    transform: rotateY(180deg);
    -webkit-transform:rotateY(180deg); /* Safari and Chrome */
    -moz-transform:rotateY(180deg); /* Firefox */
  }
`;

export default GameWrapper;
