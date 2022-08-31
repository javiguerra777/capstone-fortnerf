/* eslint-disable prettier/prettier */
import React, { FormEvent } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import LoginWrapper from '../styles/ReusableStyles';
import HomeNavBar from '../components/HomeNavBar';

function LoginPage() {
  const navigate = useNavigate();
  const loginToAccount = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate('/dashboard');
  };
  return (
    <LoginWrapper>
      <section className="main-login">
        <HomeNavBar />
        <h1>Login to your account</h1>
        <h2>
          Join the world of FortNerf! Play with others, there are
          several servers to choose from.
        </h2>
        <section className="img-holder">Image placeholder</section>
        <form onSubmit={loginToAccount}>
          <label htmlFor="username">
            <p>Username:</p>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="ex: Username777"
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input type="password" placeholder="Password" />
          </label>
          <button className="login-btn" type="submit">
            Log In
            <BsArrowRight />
          </button>
        </form>
        <footer className="login-footer">
          <div>
            Don&#8217;t have an account? Sign up
            {' '}
            <NavLink to="/signup">Here</NavLink>
          </div>
          <div>
            Forgot password? Click
            {' '}
            <NavLink to="/emailvalidation">Here</NavLink>
          </div>
        </footer>
      </section>
    </LoginWrapper>
  );
}

export default LoginPage;
