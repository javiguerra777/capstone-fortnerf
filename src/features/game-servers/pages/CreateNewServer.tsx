import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import UserNavBar from '../../../common/components/UserNavBar';
import createNewRoom from '../api/createNewRoom';
import { RootState } from '../../../app/redux';
import { socket } from '../../../service/socket';
import NewServerWrapper from '../styles/NewServer';

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
      await window.open(`http://localhost:3000/game/${data._id}`);
      navigate('/dashboard');
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
