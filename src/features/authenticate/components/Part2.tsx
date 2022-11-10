/* eslint-disable no-unused-vars */
import React from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import {
  BsArrowLeftSquareFill,
  BsArrowRightSquareFill,
} from 'react-icons/bs';
import sprites from '../../../common/constants';
import SpriteRadio from '../../../common/components/SpriteRadio';
import SwitchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';
import FormFooter from '../styles/Footer';

type Props = {
  sprite: string;
  setSprite: (value: string) => void;
  updateState: (value: string | number, option: string) => void;
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .sprite-choice {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .sprite-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    .radio {
      width: 25%;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }
`;
function Part2({ sprite, setSprite, updateState }: Props) {
  return (
    <Wrapper>
      <header>
        <h1>Select your character</h1>
        <div className="sprite-choice">
          <p>Your choice is:</p>
          <SpriteContainer
            src={SwitchSpriteSheet(sprite)}
            alt={sprite}
          />
        </div>
      </header>
      <div className="sprite-container">
        {sprites.map((theSprite: string) => (
          <SpriteRadio
            key={nanoid()}
            newSprite={sprite}
            spriteName={theSprite}
            setNewSprite={setSprite}
          />
        ))}
      </div>
      <FormFooter>
        <button type="button" onClick={() => updateState(0, 'part')}>
          <BsArrowLeftSquareFill />
        </button>
        <button
          type="button"
          onClick={() => updateState(2, 'part')}
          disabled={!sprite}
        >
          <BsArrowRightSquareFill />
        </button>
      </FormFooter>
    </Wrapper>
  );
}

export default Part2;
