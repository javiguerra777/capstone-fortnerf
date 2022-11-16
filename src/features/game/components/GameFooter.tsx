import React from 'react';
import { AiOutlineWechat } from 'react-icons/ai';
import { BsPeople } from 'react-icons/bs';
import { GiExitDoor } from 'react-icons/gi';
import GetReduxStore from '../../../common/hooks/GetStore';
import switchSpritesheet from '../../../common/functions/SwitchSpriteSheet';
import FooterWrapper from '../styles/Footer';

type Footer = {
  users: [];
  toggleAside: () => void;
  toggleDisplayUsers: () => void;
  closeTab: () => void;
};
function GameFooter({
  toggleAside,
  toggleDisplayUsers,
  users,
  closeTab,
}: Footer) {
  const {
    user: { username, playerSprite },
  } = GetReduxStore();
  return (
    <FooterWrapper>
      <section className="flex-row user-div">
        <img
          src={switchSpritesheet(playerSprite)}
          alt={playerSprite}
        />
        <p>{username}</p>
      </section>
      <section className="flex-row text-users">
        <section>
          <button type="button" onClick={toggleAside}>
            <AiOutlineWechat />
          </button>
          <button type="button" onClick={toggleDisplayUsers}>
            <BsPeople />
            {users?.length}
          </button>
        </section>
        <div>
          <button type="button" onClick={closeTab}>
            <GiExitDoor />
          </button>
        </div>
      </section>
    </FooterWrapper>
  );
}

export default GameFooter;
