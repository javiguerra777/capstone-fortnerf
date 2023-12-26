/* eslint-disable no-unused-vars */
import React, { useMemo, useState, useCallback } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import Logo from '../../img/nerf_logo.png';

type DrawerProps = {
  toggleDrawerOpen: () => void;
};
function Drawer({ toggleDrawerOpen }: DrawerProps) {
  const navigate = useNavigate();
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
  const navigateTo = useCallback(
    (path: string) => {
      navigate(path);
      toggleDrawerOpen();
    },
    [navigate, toggleDrawerOpen],
  );
  return (
    <div className="fixed z-20 left-0 top-0 w-screen h-screen bg-black/50 flex flex-row">
      <div
        role="button"
        aria-label="Toggle Drawer"
        onClick={toggleDrawerOpen}
        onKeyDown={() => null}
        tabIndex={0}
        className="flex-1 h-full"
      />
      <aside className="h-full w-2/3 bg-white text-black md:1/2 lg:w-80 p-2 flex flex-col">
        <button
          type="button"
          className="bg-white text-black rounded border-2 hover:bg-neutral-300 h-12 w-12 flex items-center justify-center"
          onClick={toggleDrawerOpen}
        >
          <GiHamburgerMenu size={30} />
        </button>
        <p className="text-2xl mt-2">Settings</p>
        {routes.map((route) => (
          <NavLink
            key={route.path}
            to={route.path}
            className="hover:underline ml-4 text-lg hover:bg-neutral-200"
            onClick={() => navigateTo(route.path)}
          >
            {route.name}
          </NavLink>
        ))}
        <NavLink
          to="/direct-messages"
          className="mt-2 hover:underline hover:bg-neutral-200 text-lg"
        >
          Chat
        </NavLink>
      </aside>
    </div>
  );
}
export default function DashboardNavBar() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const toggleDrawerOpen = useCallback(() => {
    setDrawerOpen((prev) => !prev);
  }, []);
  return (
    <nav className="w-full flex flex-row justify-between pt-5 px-3 items-center">
      <NavLink
        to="/dashboard"
        className="flex flex-row items-center hover:underline"
      >
        <img src={Logo} alt="Nerf Logo" className="h-20 w-20" />
        <h1 className="text-4xl">Fort Nerf</h1>
      </NavLink>
      <button
        type="button"
        className="bg-white text-black h-12 w-12 rounded hover:bg-neutral-300 flex items-center justify-center"
        onClick={toggleDrawerOpen}
      >
        <GiHamburgerMenu size={30} />
      </button>
      {drawerOpen && <Drawer toggleDrawerOpen={toggleDrawerOpen} />}
    </nav>
  );
}
