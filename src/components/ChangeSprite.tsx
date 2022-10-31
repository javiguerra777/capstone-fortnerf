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
  const updatePlayerSprite = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      dispatch(changePlayerSprite(newSprite));
    } catch (err) {
      //
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
          <button type="submit">Change Sprite</button>
        </form>
      </section>
    </ChangeNameWrapper>
  );
}

export default ChangeSprite;
