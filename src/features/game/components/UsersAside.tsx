import React from 'react';
import { nanoid } from 'nanoid';
import UsersWrapper from '../styles/UsersWrapper';
import switchSpritesheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';

type Users = {
  users: [];
  privateRoom: boolean;
  roomPassword: string;
};
type User = {
  username: string;
  sprite: string;
};

function UsersAside({ users, privateRoom, roomPassword }: Users) {
  return (
    <UsersWrapper>
      <header className="users-header">
        <h1>Players</h1>
      </header>
      <section className="users-section">
        {users?.map((user: User) => (
          <div className="each-user" key={nanoid()}>
            <SpriteContainer
              src={switchSpritesheet(user.sprite)}
              alt={user.sprite}
            />
            <p>{user.username}</p>
          </div>
        ))}
      </section>
      {privateRoom && (
        <footer className="users-footer">
          <h1>The Password for this private game is:</h1>
          <p>{roomPassword}</p>
        </footer>
      )}
    </UsersWrapper>
  );
}

export default UsersAside;
