import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { NavBar } from '../styles/NavBarStyles';
import nerfLogo from '../../assets/img/nerf_logo.png';

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
