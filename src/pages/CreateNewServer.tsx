import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import UserNavBar from '../components/UserNavBar';
import createNewRoom from '../utils/api';
import { RootState } from '../store';
import { socket } from '../service/socket';

const NewServerWrapper = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  width: 100vw;
  button:hover {
    cursor: pointer;
  }
  .game-Error {
    color: white;
  }
  .game-form {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    label {
      margin-bottom: 1em;
      input {
        margin-left: 0.5em;
      }
    }
    button {
      background: none;
      color: white;
      border: solid 1px white;
      border-radius: 0.5em;
      padding: 5px;
    }
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
          Game Room Name:
          <input
            type="text"
            id="gameName"
            placeholder="Max: 15 characters"
            onChange={(e) => setGameName(e.target.value)}
          />
        </label>
        <button type="submit">Create New Game</button>
      </form>
    </NewServerWrapper>
  );
}

export default CreateNewServer;
