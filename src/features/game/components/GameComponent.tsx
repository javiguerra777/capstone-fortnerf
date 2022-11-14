import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import config from '../phaser-game/multiplayer/config/MultiPlayerConfig';

type styleProps = {
  width: string;
};
function GameComponent({ width }: styleProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const [focus, setFocus] = useState(false);
  const makeActive = () => {
    if (gameRef.current && !focus) {
      gameRef.current.focus();
      setFocus(true);
    }
  };
  useEffect(() => {
    const phaserGame = new Phaser.Game(config);
    // when component unmounts
    return () => {
      phaserGame.destroy(false, false);
    };
  }, []);
  return (
    <div
      id="main-game"
      role="button"
      onClick={makeActive}
      tabIndex={0}
      onKeyDown={() => null}
      onBlur={() => setFocus(false)}
      style={{ height: '94vh', width }}
      aria-label="canvas element"
      ref={gameRef}
    />
  );
}

export default GameComponent;
