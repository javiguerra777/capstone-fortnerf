import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { HiOutlineUsers } from 'react-icons/hi';
import { nanoid } from 'nanoid';
import nerfTarget from '../../../assets/img/nerf_target.png';
import UserNavBar from '../../../common/components/UserNavBar';
import getAllRooms from '../api/getAllRooms';
import { socket } from '../../../common/service/socket';
import DashboardWrapper, { GameDetails } from '../styles';

type Game = {
  name: string;
  users: [];
  _id: string;
  maxUsers: number;
  started: boolean;
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
  const playSoloGame = () => {
    navigate('/singleplayer');
  };
  const toGame = (
    route: string,
    usersInGame: number,
    maxUsers: number,
  ) => {
    if (usersInGame >= maxUsers) {
      return true;
    }
    navigate(`/game/${route}`);
    return true;
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
        {gameServers
          ?.filter((game: Game) => !game.started)
          .map((game: Game) => (
            <GameDetails key={nanoid()}>
              <section id="item1">
                <p>Fort Nerf</p>
                <img src={nerfTarget} alt="game-logo" />
              </section>
              <section id="item2">
                <p>{game.name}</p>
              </section>
              <section id="item3">
                <p>
                  {game.users.length}/{game.maxUsers}
                </p>
                <HiOutlineUsers size={28} />
                <button
                  type="button"
                  onClick={() =>
                    toGame(game._id, game.users.length, game.maxUsers)
                  }
                  className="navLink-btn"
                >
                  {' '}
                  Join Game
                </button>
              </section>
            </GameDetails>
          ))}
      </section>
    </DashboardWrapper>
  );
}

export default Dashboard;
