import React from 'react';

type Props = {
  name: string;
  username: string;
  email: string;
  sprite: string;
  // eslint-disable-next-line no-unused-vars
  updateState: (value: string | number, option: string) => void;
};

function Part4({
  name,
  username,
  email,
  sprite,
  updateState,
}: Props) {
  return (
    <>
      <header>
        <h1>Preview</h1>
      </header>
      <div>
        <h2>Name: {name}</h2>
        <h2>Username: {username}</h2>
        <h2>Email: {email}</h2>
        <h2>Character: {sprite}</h2>
      </div>
      <div>
        <h1>Need to Make a Change?</h1>
        <button type="button" onClick={() => updateState(0, 'part')}>
          Part 1
        </button>
        <button type="button" onClick={() => updateState(1, 'part')}>
          Part 2
        </button>
        <button type="button" onClick={() => updateState(2, 'part')}>
          Part 3
        </button>
      </div>
      <div>
        <hr />
      </div>
      <button className="register-acc" type="submit">
        Complete Registration
      </button>
    </>
  );
}

export default Part4;
