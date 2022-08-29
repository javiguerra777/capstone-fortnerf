import React from 'react';
import { Outlet } from 'react-router-dom';
import GlobalStyles from '../styles/GlobalStyles';

function Main() {
  return (
    <section>
      <GlobalStyles />
      <Outlet />
    </section>
  );
}

export default Main;
