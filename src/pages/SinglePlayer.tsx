import React from 'react';
import { useNavigate } from 'react-router-dom';
import GameComponent from '../components/GameComponent';

function SinglePlayer() {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate('/dashboard');
  };
  return (
    <div>
      <GameComponent width="100%" />
      <footer>
        <button type="button" onClick={returnHome}>
          Return to Dashboard
        </button>
      </footer>
    </div>
  );
}

export default SinglePlayer;
