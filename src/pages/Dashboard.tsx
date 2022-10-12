import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { HiOutlineUsers } from 'react-icons/hi';
import { nanoid } from 'nanoid';
import nerfTarget from '../img/nerf_target.png';
import UserNavBar from '../components/UserNavBar';
import { getAllRooms } from '../utils/api';
import { socket } from '../service/socket';

const DashboardWrapper = styled.main`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .active-games {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    height: auto;
    max-height: 35em;
    border: solid white 4px;
    border-radius: 0.5em;
    overflow-y: scroll;
  }
  .game-options-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .nav-btn {
      background: none;
      color: white;
      border: solid 0.2em white;
      border-radius: 0.3em;
      padding: 1em;
      cursor: pointer;
      width: 10em;
    }
    .btn-one {
      margin-right: 2em;
    }
    .btn-three {
      margin-left: 2em;
    }
  }
`;
const GameDetails = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  border: solid white 2px;
  border-radius: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  cursor: pointer;
  #item1 {
    margin-left: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    img {
      height: 2em;
      width: 2em;
      border-radius: 2em;
      margin-left: 0.5em;
    }
  }
  #item2 {
    align-text: center;
  }
  #item3 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

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
