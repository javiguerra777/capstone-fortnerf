import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../../../common/components/UserNavBar';
import createNewRoom from '../api/createNewRoom';
import { socket } from '../../../common/service/socket';
import NewServerWrapper from '../styles/NewServer';
import GetReduxStore from '../../../common/hooks/GetStore';

function CreateNewServer() {
  const navigate = useNavigate();
  const {
    user: { username },
  } = GetReduxStore();
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
      navigate(`/game/${data._id}`);
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
