import React from 'react';
import { useDispatch } from 'react-redux';
import { setEmail } from '../../../app/redux/Registrations';
import GetReduxStore from '../../../common/hooks/GetStore';
import validateEmail from '../../../common/functions/validateEmail';

type Props = {
  name: string;
  username: string;
  // eslint-disable-next-line no-unused-vars
  updateState: (value: string | number, option: string) => void;
};

function Part1({ name, username, updateState }: Props) {
  const dispatch = useDispatch();
  const {
    registration: { email },
  } = GetReduxStore();
  const disableButton = () => {
    if (!name || !username || !validateEmail(email)) {
      return true;
    }
    return false;
  };
  return (
    <>
      <header>
        <h1>Step 1</h1>
      </header>
      <label htmlFor="name">
        <p>Name:</p>
        <input
          type="text"
          placeholder="ex: John Appleseed"
          value={name}
          onChange={(e) => updateState(e.target.value, 'name')}
        />
      </label>
      <label htmlFor="username">
        <p>Username:</p>
        <input
          type="text"
          placeholder="ex: Username777"
          value={username}
          onChange={(e) => updateState(e.target.value, 'username')}
        />
      </label>
      <label htmlFor="email">
        <p>Email:</p>
        <input
          type="email"
          placeholder="ex: Johnappleseed@gmail.com"
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
      </label>
      <button
        type="button"
        onClick={() => updateState(1, 'part')}
        disabled={disableButton()}
      >
        Next Part
      </button>
    </>
  );
}

export default Part1;
