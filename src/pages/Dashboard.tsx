import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUsers } from 'react-icons/hi';
import { nanoid } from 'nanoid';
import nerfTarget from '../img/nerf_target.png';
import UserNavBar from '../components/UserNavBar';
import { getAllRooms } from '../utils/api';
import { socket } from '../service/socket';
import {
  DashboardWrapper,
  GameDetails,
} from '../styles/ReusableStyles';

type Game = {
  name: string;
  users: [];
  _id: string;
};
function Dashboard() {
  const navigate = useNavigate();
  const [gameServers, setGameServers] = useState([]);
  // useEffects
  useEffect(() => {
    getAllRooms().then((res) => setGameServers(res.data));
  }, []);
  useEffect(() => {
    socket.on('updatedRooms', (data) => {
      setGameServers(data);
    });
  }, []);
  // functions
  const navToGame = (gameId: string, usersInGame: number) => {
    if (usersInGame === 2) {
      return;
    }
    navigate(`/game/${gameId}`);
  };
  const playSoloGame = () => {
    navigate('/singleplayer');
  };
  return (
    <DashboardWrapper>
      <UserNavBar />
      <section className="active-games">
        <h1>Click to Join a Game</h1>
        <nav className="game-options-nav">
          <button className="nav-btn btn-one" type="button">
            Public
          </button>
          <button className="nav-btn btn-two" type="button">
            Private
          </button>
          <button
            className="nav-btn btn-three"
            type="button"
            onClick={playSoloGame}
          >
            Single Player
          </button>
        </nav>
        {gameServers?.map((game: Game) => (
          <GameDetails
            key={nanoid()}
            onClick={() => navToGame(game._id, game.users.length)}
          >
            <section id="item1">
              <p>Fort Nerf</p>
              <img src={nerfTarget} alt="game-logo" />
            </section>
            <section id="item2">
              <p>{game.name}</p>
            </section>
            <section id="item3">
              <p>{game.users.length}/2</p>
              <HiOutlineUsers size={28} />
            </section>
          </GameDetails>
        ))}
      </section>
    </DashboardWrapper>
  );
}

export default Dashboard;
