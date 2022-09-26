import React, { useState, FormEvent } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { nanoid } from 'nanoid';
import { AiOutlineUser } from 'react-icons/ai';
import convertToDate from '../utils/functions';
import { Message } from '../types/AppTypes';
import { socket } from '../App';
import { RootState } from '../store';

type ChatProps = {
  asideOptions: () => void;
  messages: Message[];
};

function GameChat({ asideOptions, messages }: ChatProps) {
  const { username } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { id } = useSelector(
    (state: RootState) => state.game,
    shallowEqual,
  );
  const [chatMessage, setChatMessage] = useState('');
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chat', {
      username,
      message: chatMessage,
      date: Date.now(),
      room: id,
    });
    setChatMessage('');
  };
  return (
    <aside className="chat-bar background-color">
      <header className="chat-header">
        <h1>Chat</h1>
        <div>
          <button type="button" onClick={asideOptions}>
            x
          </button>
        </div>
      </header>
      <main className="main-chat">
        {messages.length > 0 &&
          messages.map((message: Message) => (
            <section key={nanoid()} className="ind-message">
              <header className="ind-msg-header">
                <AiOutlineUser size="25px" />
                <h5>
                  {convertToDate(Date.now(), true) ===
                  convertToDate(message.date, true)
                    ? convertToDate(message.date, false)
                    : convertToDate(message.date, true)}
                </h5>
              </header>
              <div className="ind-msg-h3">
                <h3>{message.username} to room</h3>
                <p>{message.message}</p>
              </div>
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
            value={chatMessage}
            onChange={(e) => setChatMessage(e.target.value)}
          />
        </label>
      </form>
    </aside>
  );
}

export default GameChat;
