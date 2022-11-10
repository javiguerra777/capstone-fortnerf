import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { nanoid } from 'nanoid';
import { db } from '../../firebase/FirebaseTS';
import { changePlayerSprite } from '../../../app/redux/UserSlice';
import ChangeNameWrapper from '../styles/ChangeName';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteRadio from '../../../common/components/SpriteRadio';
import SpriteContainer from '../../../common/styles/SpriteContainer';
import GetReduxStore from '../../../common/hooks/GetStore';
import sprites from '../../../common/constants';

type SpriteProps = {
  // eslint-disable-next-line no-unused-vars
  toggleActiveComponent: (option: string) => void;
};
function ChangeSprite({ toggleActiveComponent }: SpriteProps) {
  const {
    user: { docId, playerSprite },
  } = GetReduxStore();
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
              src={switchSpriteSheet(playerSprite)}
              alt={playerSprite}
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
          <div className="character-option">
            {sprites.map((theSprite: string) => (
              <SpriteRadio
                key={nanoid()}
                newSprite={newSprite}
                spriteName={theSprite}
                setNewSprite={setNewSprite}
              />
            ))}
          </div>
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
