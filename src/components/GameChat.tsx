import React, { useRef, useEffect, FormEvent, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { nanoid } from 'nanoid';
import convertToDate, { switchSpriteSheet } from '../utils/functions';
import { Message } from '../types/AppTypes';
import { socket } from '../service/socket';
import { RootState } from '../store';
import { disableKeyBoard } from '../store/GameSlice';

type ChatProps = {
  toggleAside: () => void;
  messages: Message[];
};

function useChatScroll<T>(dep: T) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}
function GameChat({ toggleAside, messages }: ChatProps) {
  const dispatch = useDispatch();
  const { username, playerSprite } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { id } = useSelector(
    (state: RootState) => state.game,
    shallowEqual,
  );
  const [msg, setMessage] = useState('');
  const ref = useChatScroll(messages);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    socket.emit('chat', {
      username,
      message: msg,
      date: Date.now(),
      room: id,
      sprite: playerSprite,
    });
    setMessage('');
  };
  const disablePhaserKeyboard = () => {
    dispatch(disableKeyBoard());
  };
  return (
    <aside className="chat-bar background-color">
      <header className="chat-header">
        <h1>Chat</h1>
        <div>
          <button type="button" onClick={toggleAside}>
            x
          </button>
        </div>
      </header>
      <div className="main-chat" ref={ref}>
        {messages.length > 0 &&
          messages.map((message: Message) => (
            <section key={nanoid()} className="ind-message">
              <header className="ind-msg-header">
                <img
                  src={switchSpriteSheet(message.sprite)}
                  alt={message.sprite}
                />
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
      </div>
      <form className="message-form" onSubmit={sendChat}>
        <input
          type="text"
          onClick={disablePhaserKeyboard}
          value={msg}
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          ref={inputRef}
        />
      </form>
    </aside>
  );
}

export default GameChat;
