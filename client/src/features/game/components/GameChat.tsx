import React, { useRef, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { nanoid } from 'nanoid';
import { AiOutlineUser } from 'react-icons/ai';
import convertToDate from '../../../common/utils/functions';
import { Message } from '../../../common/models/AppTypes';
import { socket } from '../../../common/service/socket';
import { RootState } from '../../../store';

type ChatProps = {
  toggleAside: () => void;
  messages: Message[];
};

const chatOptions = [
  {
    response: 'Hello there',
  },
  {
    response: 'Want to play again?',
  },
  {
    response: "Good game! Let's play again",
  },
  {
    response: 'Thank you for playing, see you some other time',
  },
  {
    response: 'I am ready to play please start up',
  },
];
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
  const { username } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const { id } = useSelector(
    (state: RootState) => state.game,
    shallowEqual,
  );
  const sendChat = (message: string) => {
    socket.emit('chat', {
      username,
      message,
      date: Date.now(),
      room: id,
    });
  };
  const ref = useChatScroll(messages);
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
      </div>
      <section className="chat-options">
        {chatOptions.map((option) => (
          <button
            className="option-btn"
            type="button"
            onClick={() => sendChat(option.response)}
            key={nanoid()}
          >
            {option.response}
          </button>
        ))}
      </section>
    </aside>
  );
}

export default GameChat;
