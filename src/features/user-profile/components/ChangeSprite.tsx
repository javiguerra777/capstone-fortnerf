import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseTS';
import { changePlayerSprite } from '../../../app/redux/UserSlice';
import ChangeNameWrapper from '../styles/ChangeName';
import SpriteRadio from './SpriteRadio';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';

type SpriteProps = {
  sprite: string;
  docId: string;
  // eslint-disable-next-line no-unused-vars
  toggleActiveComponent: (option: string) => void;
};
function ChangeSprite({
  sprite,
  docId,
  toggleActiveComponent,
}: SpriteProps) {
  const dispatch = useDispatch();
  const userDoc = doc(db, 'users', docId);
  const [newSprite, setNewSprite] = useState('');
  const [error, setError] = useState('');
  const updatePlayerSprite = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const data = {
        sprite: newSprite,
      };
      await updateDoc(userDoc, data);
      await dispatch(changePlayerSprite(newSprite));
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
          <div className="player-sprite">
            <h1>Current Sprite:</h1>
            <SpriteContainer
              src={switchSpriteSheet(sprite)}
              alt={sprite}
            />
          </div>
          <button
            type="button"
            onClick={() => toggleActiveComponent('sprite')}
          >
            x
          </button>
        </header>
        {error && <h1>{error}</h1>}
        <form onSubmit={updatePlayerSprite}>
          <h2>Player Options</h2>
          <SpriteRadio
            newSprite={newSprite}
            spriteName="player"
            setNewSprite={setNewSprite}
          />
          <SpriteRadio
            newSprite={newSprite}
            spriteName="npc"
            setNewSprite={setNewSprite}
          />
          <SpriteRadio
            newSprite={newSprite}
            spriteName="pumpkin"
            setNewSprite={setNewSprite}
          />
          <SpriteRadio
            newSprite={newSprite}
            spriteName="soldier"
            setNewSprite={setNewSprite}
          />
          <SpriteRadio
            newSprite={newSprite}
            spriteName="robeman"
            setNewSprite={setNewSprite}
          />
          <button
            type="submit"
            className="submit-btn"
            disabled={newSprite === ''}
          >
            Change Sprite
          </button>
        </form>
      </section>
    </ChangeNameWrapper>
  );
}

export default ChangeSprite;
