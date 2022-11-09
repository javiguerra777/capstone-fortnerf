import React from 'react';
import { nanoid } from 'nanoid';
import UsersWrapper from '../styles/UsersWrapper';
import GetReduxStore from '../../../common/functions/GetStore';

type Users = {
  users: [];
  privateRoom: boolean;
  roomPassword: string;
};
type User = {
  username: string;
};

function UsersAside({ users, privateRoom, roomPassword }: Users) {
  const {
    user: { username },
  } = GetReduxStore();
  return (
    <UsersWrapper>
      <header className="users-header">
        <h1>Users</h1>
      </header>
      <section className="users-section">
        {users?.map((user: User) => (
          <div className="each-user" key={nanoid()}>
            {username === user.username ? (
              <h4>Host</h4>
            ) : (
              <h1>Participant</h1>
            )}
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
