import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import nerfLogo from '../img/nerf_logo.jpg';

const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  width: 100%;
  a {
    color: #fff5ee;
    text-decoration: none;
    margin-right: 2em;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    cursor: pointer;
  }
  .app-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 1em;
    color: #fff5ee;
    h1 {
      font-size: 2rem;
      margin-right: 0.5em;
    }
    img {
      height: 95%;
      width: 3em;
    }
  }
  .navigation {
    button {
      background: white;
      border: none;
      border-radius: 5px;
      padding: 7px;
      margin-right: 1em;
    }
  }
`;

function HomeNavBar() {
  const navigate = useNavigate();
  const navToSignUp = () => {
    navigate('/signup');
  };
  return (
    <NavBar>
      <section className="app-name">
        <h1>Fort Nerf</h1>
        <img src={nerfLogo} alt="nerf-gun-logo" />
      </section>
      <section className="navigation">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/login">Login</NavLink>
        <button type="button" onClick={navToSignUp}>
          Get Started
        </button>
      </section>
    </NavBar>
  );
}

export default HomeNavBar;
