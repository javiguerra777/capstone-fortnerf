import React, { FormEvent, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineWechat } from 'react-icons/ai';
import { BsPeople, BsFillCameraVideoFill } from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import { nanoid } from 'nanoid';
import GameComponent from '../components/GameComponent';

const GameWrapper = styled.main`
  overflow-y: hidden;
  overflow-x: hidden;
  button {
    cursor: pointer;
  }
  .background-color {
    background: #333333;
  }
  .chat-bar {
    position: fixed;
    height: 94vh;
    width: 10em;
    bottom: 6vh;
    right: 0;
    border-bottom: 3px solid #333333;
    border-left: 3px solid #333333;
    display: flex;
    flex-direction: column;
    .main-chat {
      background: #3b3c36;
      height: 85%;
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
    position: fixed;
    bottom: 0;
    height: 6vh;
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
`;

function Game() {
  const [messages, setMessages] = useState<any[]>([]);
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevState) => [prevState, 'hello']);
  };

  return (
    <GameWrapper>
      <GameComponent />
      <aside className="chat-bar background-color">
        <header className="chat-header">
          <h1>Chat</h1>
          <div>
            <button type="button">x</button>
          </div>
        </header>
        <main className="main-chat">
          {messages.length > 0 &&
            messages.map(({ username, message }: any) => (
              <section key={nanoid()}>
                <h1>{username}</h1>
                <p>{message}</p>
              </section>
            ))}
        </main>
        <form onSubmit={sendChat} className="message-form">
          <label htmlFor="message">
            <input
              type="text"
              name="message"
              id="message"
              placeholder="Message"
            />
          </label>
        </form>
      </aside>
      <footer className="user-settings background-color">
        <section className="flex-row video-voice">
          <p>jhoodie777</p>
          <button type="button">
            <FaMicrophoneAlt />
          </button>
          <button type="button">
            <BsFillCameraVideoFill />
          </button>
        </section>
        <section className="flex-row text-users">
          <section>
            <button type="button">
              <AiOutlineWechat />
            </button>
            <button type="button">
              <BsPeople />
              10
            </button>
          </section>
          <section>
            <button type="button">
              <GiExitDoor />
            </button>
          </section>
        </section>
      </footer>
    </GameWrapper>
  );
}

export default Game;
