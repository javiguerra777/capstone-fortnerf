import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';

function Main() {
  return (
    <>
      <GlobalStyles />
      <Outlet />
    </>
  );
}

export default Main;
