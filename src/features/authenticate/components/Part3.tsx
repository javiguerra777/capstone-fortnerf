import React from 'react';
import FormFooter from '../styles/Footer';
import LeftArrow, { RightArrow } from '../../../common/icons';
import StyledButton from '../../../common/styles/ArrowButton';

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
      <header>
        <h1>Step 3: Create a Password</h1>
      </header>
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
        <StyledButton
          type="button"
          onClick={() => updateState(1, 'part')}
        >
          <LeftArrow className="button" />
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => updateState(3, 'part')}
          disabled={disableButton()}
        >
          <RightArrow className="button" />
        </StyledButton>
      </FormFooter>
    </>
  );
}

export default Part3;
