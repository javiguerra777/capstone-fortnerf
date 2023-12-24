import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import UserNavBar from '../../../common/components/UserNavBar';
import { createNewRoom } from '../../../common/service/Game.service';
import { RootState } from '../../../store';
import { socket } from '../../../common/service/socket';

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
  const [maxPlayers, setMaxPlayers] = useState(4);
  const [error, setError] = useState('');
  const createGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameData = {
      name: gameName,
      username,
      maxPlayers,
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
            required
          />
        </label>
        <label htmlFor="maxPlayers">
          <input
            type="number"
            min={4}
            max={6}
            value={maxPlayers}
            onChange={(e) =>
              setMaxPlayers(parseFloat(e.target.value))
            }
            required
            placeholder="enter a number between 4 and 6"
          />
        </label>
        <button type="submit">Create New Game</button>
      </form>
    </NewServerWrapper>
  );
}

export default CreateNewServer;
