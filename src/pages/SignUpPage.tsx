import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginWrapper from '../styles/ReusableStyles';

function SignUpPage() {
  const navigate = useNavigate();
  const completeRegistration = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <LoginWrapper>
      <section className="main-login">
        <h1>Sign up for an Account</h1>
        <form onSubmit={completeRegistration}>
          <label htmlFor="name">
            <p>Name:</p>
            <input type="text" placeholder="ex: John Appleseed" />
          </label>
          <label htmlFor="username">
            <p>Username:</p>
            <input type="text" placeholder="ex: Username777" />
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input
              type="email"
              placeholder="ex: Johnappleseed@gmail.com"
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input type="password" placeholder="password" />
          </label>
          <div>
            <hr />
          </div>
          <button className="register-acc" type="submit">
            Complete Registration
          </button>
        </form>
      </section>
    </LoginWrapper>
  );
}

export default SignUpPage;
