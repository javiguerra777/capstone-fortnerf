import React, { useEffect, useRef } from 'react';
import Phaser from 'phaser';
import { useDispatch } from 'react-redux';
import { enableKeyBoard } from '../../../app/redux/GameSlice';
import config from '../phaser-game/multiplayer/config/MultiPlayerConfig';

type styleProps = {
  width: string;
};

function GameComponent({ width }: styleProps) {
  const dispatch = useDispatch();
  const canvasRef = useRef<HTMLDivElement>(null);
  const clickEvent = () => {
    if (canvasRef.current) {
      canvasRef.current.focus();
    }
    dispatch(enableKeyBoard());
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
      style={{ height: '94vh', width }}
      role="button"
      onClick={clickEvent}
      tabIndex={0}
      onKeyDown={() => null}
      aria-label="canvas element"
      ref={canvasRef}
    />
  );
}

export default GameComponent;
