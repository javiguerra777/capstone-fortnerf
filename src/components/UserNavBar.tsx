import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  width: 100vw;
  margin-top: 1em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  a {
    color: #fff5ee;
    text-decoration: none;
    margin-right: 2em;
  }
  a:hover {
    text-decoration: underline;
  }
`;

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
