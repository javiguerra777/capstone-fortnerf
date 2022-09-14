import React, {
  useState,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { nanoid } from 'nanoid';
import { AiOutlineUser } from 'react-icons/ai';
import convertToDate from '../utils/functions';
import { Message } from '../types/AppTypes';

type ChatProps = {
  asideOptions: () => void;
  messages: Message[];
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

function GameChat({
  asideOptions,
  messages,
  setMessages,
}: ChatProps) {
  const [chatMessage, setChatMessage] = useState('');
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessages((prevState) => [
      ...prevState,
      {
        username: 'jhoodie777',
        message: chatMessage,
        date: Date.now(),
      },
    ]);
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
