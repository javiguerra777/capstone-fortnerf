/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import styled from 'styled-components';
import { HiOutlineUsers } from 'react-icons/hi';
import gameServers from '../games.json';
import nerfTarget from '../img/nerf_target.png';

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
    max-height: 30em;
    border: solid white 4px;
    border-radius: 0.5em;
    overflow-y: scroll;
  }
  .game-details {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 96%;
    border: solid white 2px;
    border-radius: 0.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    cursor: pointer;
  }
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
function Dashboard() {
  return (
    <DashboardWrapper>
      <h1>NavBar</h1>
      <section className="active-games">
        <h1>Click to Join a Game</h1>
        {gameServers.map(({ server, players, maxPlayers }) => (
          <section className="game-details" key="hello">
            <section id="item1">
              <p>Fort Nerf</p>
              <img src={nerfTarget} alt="game-logo" />
            </section>
            <section id="item2">
              <p>{server}</p>
            </section>
            <section id="item3">
              <p>
                {players}/{maxPlayers}
              </p>
              <HiOutlineUsers size={28} />
            </section>
          </section>
        ))}
      </section>
    </DashboardWrapper>
  );
}

export default Dashboard;
