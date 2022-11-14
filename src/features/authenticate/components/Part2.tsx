/* eslint-disable no-unused-vars */
import React from 'react';
import { nanoid } from 'nanoid';
import styled from 'styled-components';
import LeftArrow, { RightArrow } from '../../../common/icons';
import sprites from '../../../common/constants';
import SpriteRadio from '../../../common/components/SpriteRadio';
import SwitchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';
import FormFooter from '../styles/Footer';
import StyledButton from '../../../common/styles/ArrowButton';

type Props = {
  sprite: string;
  setSprite: (value: string) => void;
  updateState: (value: string | number, option: string) => void;
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  header {
    .sprite-choice {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
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
      justify-content: center;
      input[type='radio'] {
        height: 18px;
        margin-right: 7px;
      }
    }
  }
`;
function Part2({ sprite, setSprite, updateState }: Props) {
  return (
    <Wrapper>
      <header>
        <h1>Step 2: Select your character</h1>
        <section className="sprite-choice">
          <p>Your choice is:</p>
          <SpriteContainer
            src={SwitchSpriteSheet(sprite)}
            alt={sprite}
          />
        </section>
      </header>
      <section className="sprite-container">
        {sprites.map((theSprite: string) => (
          <SpriteRadio
            key={nanoid()}
            newSprite={sprite}
            spriteName={theSprite}
            setNewSprite={setSprite}
          />
        ))}
      </section>
      <FormFooter>
        <StyledButton
          type="button"
          onClick={() => updateState(0, 'part')}
        >
          <LeftArrow className="button" />
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => updateState(2, 'part')}
          disabled={!sprite}
        >
          <RightArrow className="button" />
        </StyledButton>
      </FormFooter>
    </Wrapper>
  );
}

export default Part2;
