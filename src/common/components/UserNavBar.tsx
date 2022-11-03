import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBarWrapper from '../styles/NavBarStyles';

function UserNavBar() {
  return (
    <NavBarWrapper>
      <NavLink to="/dashboard">Game Servers</NavLink>
      <NavLink to="/createserver">Create New Game</NavLink>
      <NavLink to="/userinfo">User Info</NavLink>
    </NavBarWrapper>
  );
}

export default UserNavBar;
