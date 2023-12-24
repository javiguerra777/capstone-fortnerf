import React from 'react';
import { NavLink } from 'react-router-dom';
import nerfLogo from '../../img/nerf_logo.png';

function HomeNavBar() {
  return (
    <nav className="flex justify-between py-2 bg-black">
      <NavLink
        to="/home"
        className="flex items-center hover:underline"
      >
        <img
          src={nerfLogo}
          className="h-20 w-20 ml-2"
          alt="nerf-gun-logo"
        />
        <h1 className="text-4xl">Fort Nerf</h1>
      </NavLink>
      <section className="flex items-center">
        <NavLink
          to="/home"
          className="mx-2 hover:underline hover:text-blue-600"
        >
          Home
        </NavLink>
        <NavLink
          to="about"
          className="mx-2 hover:underline hover:text-blue-600"
        >
          About
        </NavLink>
        <NavLink
          to="contact"
          className="mx-2 hover:underline hover:text-blue-600"
        >
          Contact
        </NavLink>
        <NavLink
          to="login"
          className="mx-2 hover:underline hover:text-blue-600"
        >
          Login
        </NavLink>
        <NavLink
          to="signup"
          className="bg-neutral-200 text-black p-2 rounded mx-2 hover:bg-neutral-300"
        >
          Get Started
        </NavLink>
      </section>
    </nav>
  );
}

export default HomeNavBar;
