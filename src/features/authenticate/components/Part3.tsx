import React from 'react';
import FormFooter from '../styles/Footer';

type Props = {
  password: string;
  repeatPassword: string;
  // eslint-disable-next-line no-unused-vars
  updateState: (value: string | number, option: string) => void;
};

function Part3({ password, repeatPassword, updateState }: Props) {
  const disableButton = () => {
    if (
      password.length < 6 ||
      repeatPassword.length < 6 ||
      password !== repeatPassword
    ) {
      return true;
    }
    return false;
  };
  return (
    <>
      <label htmlFor="password">
        <p>Password:</p>
        <input
          type="password"
          placeholder="min 6 characters"
          value={password}
          onChange={(e) => updateState(e.target.value, 'password')}
        />
      </label>
      <label htmlFor="repeatPassword">
        <p>Repeat Password:</p>
        <input
          type="password"
          placeholder="******"
          value={repeatPassword}
          onChange={(e) =>
            updateState(e.target.value, 'repeatPassword')
          }
        />
      </label>
      <FormFooter>
        <button type="button" onClick={() => updateState(1, 'part')}>
          Prev
        </button>
        <button
          type="button"
          onClick={() => updateState(3, 'part')}
          disabled={disableButton()}
        >
          Next Part
        </button>
      </FormFooter>
    </>
  );
}

export default Part3;
