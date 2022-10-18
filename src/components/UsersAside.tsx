import React from 'react';
import styled from 'styled-components';
import { nanoid } from 'nanoid';

const UsersWrapper = styled.aside`
  height: 100%;
  width: 10%;
  background: #333333;
`;

type Users = {
  users: [];
  username: string;
  privateRoom: boolean;
  roomPassword: string;
};
type User = {
  username: string;
};

function UsersAside({
  users,
  username,
  privateRoom,
  roomPassword,
}: Users) {
  return (
    <UsersWrapper>
      <header>
        <h1>List of users in game</h1>
      </header>
      <section>
        {users?.map((user: User) => (
          <div key={nanoid()}>
            {username === user.username ? (
              <h1>Host</h1>
            ) : (
              <h1>Participant</h1>
            )}
            <p>{user.username}</p>
          </div>
        ))}
      </section>
      {privateRoom && (
        <footer>
          <h1>The Password for this private game is:</h1>
          <p>{roomPassword}</p>
        </footer>
      )}
    </UsersWrapper>
  );
}

export default UsersAside;
