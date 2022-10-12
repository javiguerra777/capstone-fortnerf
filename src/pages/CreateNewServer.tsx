import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import UserNavBar from '../components/UserNavBar';
import createNewRoom from '../utils/api';
import { RootState } from '../store';
import { socket } from '../service/socket';

const NewServerWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  .game-Error {
    color: white;
  }
  .game-form {
    color: white;
  }
`;

function CreateNewServer() {
  const navigate = useNavigate();
  const { username } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const [gameName, setGameName] = useState('');
  const [error, setError] = useState('');
  const createGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameData = {
      name: gameName,
      username,
    };
    try {
      const { data } = await createNewRoom(gameData);
      await socket.emit('updateRooms');
      await navigate(`/game/${data._id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <NewServerWrapper>
      <UserNavBar />
      {error && <h1 className="game-Error">{error}</h1>}
      <form onSubmit={createGame} className="game-form">
        <h1>Enter Details for Game Room</h1>
        <label htmlFor="gameName">
          <h2>Game Room Name:</h2>
          <input
            type="text"
            id="gameName"
            onChange={(e) => setGameName(e.target.value)}
          />
        </label>
        <button type="submit">Create New Game</button>
      </form>
    </NewServerWrapper>
  );
}

export default CreateNewServer;
