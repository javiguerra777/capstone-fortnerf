import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, shallowEqual } from 'react-redux';
import { toast } from 'react-toastify';
import { createNewRoom } from '../../../common/service/Game.service';
import { RootState } from '../../../store';
import { socket } from '../../../common/service/socket';

function CreateNewServer() {
  const navigate = useNavigate();
  const { username } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const [gameName, setGameName] = useState('');
  const [maxPlayers, setMaxPlayers] = useState(4);
  const createGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const gameData = {
      name: gameName,
      username,
      maxPlayers,
    };
    try {
      const { data } = await createNewRoom(gameData);
      socket.emit('updateRooms');
      navigate(`/game/game/${data._id}`);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form
        onSubmit={createGame}
        className="border-4 border-white w-3/4 lg:w-1/2 p-2"
      >
        <p className="text-center text-semibold text-3xl">
          Enter Details for Game Room
        </p>
        <br />
        <label htmlFor="gamename">
          <p className="text-lg mb-1">Room Name</p>
          <input
            type="text"
            id="gamename"
            className="w-full h-10 p-2 rounded text-black"
            placeholder="Max: 15 characters"
            onChange={(e) => setGameName(e.target.value)}
            required
          />
        </label>
        <label htmlFor="maxplayers">
          <p className="mb-1 mt-3">
            Max Players Allowed (must be between 4-6 players)
          </p>
          <input
            type="number"
            id="maxplayers"
            className="w-full h-10 p-2 rounded text-black"
            min={4}
            max={6}
            value={maxPlayers}
            onChange={(e) =>
              setMaxPlayers(parseFloat(e.target.value))
            }
            required
          />
        </label>
        <br />
        <button
          type="submit"
          className="mt-4 mb-2 border border-white rounded w-full p-2 h-15 text-lg"
        >
          Create New Game
        </button>
      </form>
    </div>
  );
}

export default CreateNewServer;
