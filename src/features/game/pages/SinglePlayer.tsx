import React from 'react';
import { useNavigate } from 'react-router-dom';
import SinglePlayerGame from '../components/SinglePlayerGame';
import SinglePlayerWrapper from '../styles/SinglePlayerWrapper';

function SinglePlayer() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/dashboard');
  };
  return (
    <SinglePlayerWrapper>
      <SinglePlayerGame />
      <footer className="single-footer">
        <button type="button" onClick={returnHome}>
          Return to Dashboard
        </button>
        <section className="game-description">
          <h1>How to play Fort Nerf</h1>
          <p>
            Welcome to a single player version of Fort Nerf, this game
            mode will allow you to get comfortable with the controls
            of the game
          </p>
          <h2>Controls</h2>
          <p>Movement</p>
          <ul>
            <li>Move Right: Right Arrow Key</li>
            <li>Move Left: Left Arrow Key</li>
            <li>Move Up: Up Arrow Key</li>
            <li>Move Down: Down Arrow Key</li>
            <li>Shoot Bullets: Space Key</li>
            <li>Increase Speed: Hold Shift Key</li>
          </ul>
        </section>
      </footer>
    </SinglePlayerWrapper>
  );
}

export default SinglePlayer;
