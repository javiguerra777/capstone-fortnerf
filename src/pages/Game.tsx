import React, { useState } from 'react';
import { AiOutlineWechat } from 'react-icons/ai';
import { BsPeople, BsFillCameraVideoFill } from 'react-icons/bs';
import { FaMicrophoneAlt } from 'react-icons/fa';
import { GiExitDoor } from 'react-icons/gi';
import GameComponent from '../components/GameComponent';
import GameChat from '../components/GameChat';
import GameWrapper from '../styles/GameStyle';

function Game() {
  const [displayAside, setDisplayAside] = useState(true);
  const asideOptions = () => {
    if (displayAside) {
      setDisplayAside(false);
    } else {
      setDisplayAside(true);
    }
  };
  const maxWidth = '100%';
  const width = '90%';
  return (
    <GameWrapper>
      <div className="game-chat-container">
        <GameComponent width={displayAside ? width : maxWidth} />
        {displayAside && <GameChat asideOptions={asideOptions} />}
      </div>
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
            <button type="button" onClick={asideOptions}>
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
