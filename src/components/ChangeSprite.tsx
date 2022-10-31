import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePlayerSprite } from '../store/UserSlice';
import { ChangeNameWrapper } from '../styles/ReusableStyles';

type SpriteProps = {
  sprite: string;
  // eslint-disable-next-line no-unused-vars
  toggleActiveComponent: (option: string) => void;
};
function ChangeSprite({
  sprite,
  toggleActiveComponent,
}: SpriteProps) {
  const dispatch = useDispatch();
  const [newSprite, setNewSprite] = useState('');
  const [error, setError] = useState('');
  const updatePlayerSprite = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      dispatch(changePlayerSprite(newSprite));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <ChangeNameWrapper>
      <section className="container">
        <header>
          <p />
          <h1>Current Sprite: {sprite} </h1>
          <button
            type="button"
            onClick={() => toggleActiveComponent('sprite')}
          >
            x
          </button>
        </header>
        {error && <h1>{error}</h1>}
        <form onSubmit={updatePlayerSprite}>
          <div className="radio">
            <label htmlFor="player">
              <input
                type="radio"
                value="player"
                checked={newSprite === 'player'}
                onChange={(e) => setNewSprite(e.target.value)}
              />
              player
            </label>
          </div>
          <div className="radio">
            <label htmlFor="npc">
              <input
                type="radio"
                value="npc"
                checked={newSprite === 'npc'}
                onChange={(e) => setNewSprite(e.target.value)}
              />
              npc
            </label>
          </div>
          <div className="radio">
            <label htmlFor="pumpkin">
              <input
                type="radio"
                value="pumpkin"
                checked={newSprite === 'pumpkin'}
                onChange={(e) => setNewSprite(e.target.value)}
              />
              Pumpkin
            </label>
          </div>
          <div className="radio">
            <label htmlFor="soldier">
              <input
                type="radio"
                value="soldier"
                checked={newSprite === 'soldier'}
                onChange={(e) => setNewSprite(e.target.value)}
              />
              Soldier
            </label>
          </div>
          <div className="radio">
            <label htmlFor="robeman">
              <input
                type="radio"
                value="robeman"
                checked={newSprite === 'robeman'}
                onChange={(e) => setNewSprite(e.target.value)}
              />
              Robeman
            </label>
          </div>
          <button type="submit" disabled={newSprite === ''}>
            Change Sprite
          </button>
        </form>
      </section>
    </ChangeNameWrapper>
  );
}

export default ChangeSprite;
