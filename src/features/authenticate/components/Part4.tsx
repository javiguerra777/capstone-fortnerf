import React from 'react';
import styled from 'styled-components';
import switchSpriteSheet from '../../../common/functions/SwitchSpriteSheet';
import SpriteContainer from '../../../common/styles/SpriteContainer';

type Props = {
  name: string;
  username: string;
  email: string;
  sprite: string;
  // eslint-disable-next-line no-unused-vars
  updateState: (value: string | number, option: string) => void;
};

const Wrapper = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .preview-info {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .sprite-choice {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    img {
      margin-left: 1em;
    }
  }
  .update {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1em;
  }
  .return-btn {
    color: green;
    width: auto;
    padding: 0.6em;
    border-radius: 1em;
  }
`;
function Part4({
  name,
  username,
  email,
  sprite,
  updateState,
}: Props) {
  return (
    <Wrapper>
      <header>
        <h1>Preview</h1>
      </header>
      <section className="preview-info">
        <h2>Name: {name}</h2>
        <h2>Username: {username}</h2>
        <h2>Email: {email}</h2>
        <section className="sprite-choice">
          <h2>Character:</h2>
          <SpriteContainer
            src={switchSpriteSheet(sprite)}
            alt={sprite}
          />
        </section>
      </section>
      <section>
        <h1>Need to Make a Change?</h1>
        <section className="update">
          <button
            type="button"
            className="return-btn"
            onClick={() => updateState(0, 'part')}
          >
            Step 1
          </button>
          <button
            type="button"
            className="return-btn"
            onClick={() => updateState(1, 'part')}
          >
            Step 2
          </button>
          <button
            type="button"
            className="return-btn"
            onClick={() => updateState(2, 'part')}
          >
            Step 3
          </button>
        </section>
      </section>
      <section>
        <hr />
      </section>
      <button className="register-acc" type="submit">
        Complete Registration
      </button>
    </Wrapper>
  );
}

export default Part4;
