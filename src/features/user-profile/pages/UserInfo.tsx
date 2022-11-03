import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import UserNavBar from '../../../common/components/UserNavBar';
import { RootState } from '../../../app/redux';
import { setUser } from '../../../app/redux/UserSlice';
import UserInfoWrapper from '../styles/UserInfoWrapper';
import ChangeName from '../components/ChangeName';
import ChangeSprite from '../components/ChangeSprite';
import SpriteContainer from '../../../common/styles/SpriteContainer';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';

function UserInfo() {
  const dispatch = useDispatch();
  const { name, username, email, docId, playerSprite } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const [state, setState] = useState({
    nameComponent: false,
    spriteComponent: false,
  });
  const signOut = () => {
    dispatch(setUser({ loggedIn: false }));
  };
  const toggleActiveComponent = (option: string) => {
    switch (option) {
      case 'name':
        setState({
          ...state,
          nameComponent: !state.nameComponent,
        });
        break;
      case 'sprite':
        setState({
          ...state,
          spriteComponent: !state.spriteComponent,
        });
        break;
      default:
        break;
    }
  };
  return (
    <UserInfoWrapper>
      <UserNavBar />
      <section className="user-information">
        <h2>Account Info</h2>
        <section className="details">
          <section className="img-name">
            <SpriteContainer
              src={switchSpriteSheet(playerSprite)}
              alt="Users current player"
            />
            <p>{name}</p>
          </section>
          <section className="username">
            <h3>Username:</h3>
            <p>{username}</p>
          </section>
          <section className="email">
            <h3>Email:</h3>
            <p>{email}</p>
          </section>
        </section>
        <footer className="user-info-footer">
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
          <button
            type="button"
            onClick={() => toggleActiveComponent('sprite')}
          >
            {' '}
            Change Player
          </button>
          <button
            type="button"
            onClick={() => toggleActiveComponent('name')}
          >
            Change Name
          </button>
        </footer>
      </section>
      {state.nameComponent && (
        <ChangeName
          username={username}
          docId={docId}
          toggleActiveComponent={toggleActiveComponent}
        />
      )}
      {state.spriteComponent && (
        <ChangeSprite
          sprite={playerSprite}
          docId={docId}
          toggleActiveComponent={toggleActiveComponent}
        />
      )}
    </UserInfoWrapper>
  );
}

export default UserInfo;
