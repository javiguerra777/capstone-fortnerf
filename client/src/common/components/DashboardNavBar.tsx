import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';

export default function DashboardNavBar() {
  const routes = useMemo(
    () => [
      {
        path: '/dashboard',
        name: 'Game Servers',
      },
      {
        path: 'createserver',
        name: 'Create New Game',
      },
      {
        path: 'userinfo',
        name: 'User Info',
      },
    ],
    [],
  );
  return (
    <nav className="w-full flex flex-row justify-evenly h-20 pt-5">
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className="hover:underline"
        >
          {route.name}
        </NavLink>
      ))}
    </nav>
  );
}
