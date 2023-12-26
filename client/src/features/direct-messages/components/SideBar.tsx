import React, { useMemo } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';

export default function SideBar() {
  const { pathname } = useLocation();
  const iconSize = useMemo(() => 40, []);
  const routes = useMemo(
    () => [
      {
        icon: <FiMessageSquare size={iconSize} />,
        path: '/direct-messages',
        pathname: '/direct-messages',
      },
      {
        icon: <FaPhoneAlt size={iconSize} />,
        path: 'voice-calls',
        pathname: '/direct-messages/voice-calls',
      },
      {
        icon: <FaVideo size={iconSize} />,
        path: 'video-chats',
        pathname: '/direct-messages/video-chats',
      },
      {
        icon: <IoIosSettings size={iconSize} />,
        path: '/dashboard/userinfo',
        pathname: '/dashboard/userinfo',
      },
    ],
    [iconSize],
  );
  return (
    <div className="overflow-auto bg-indigo-400 h-full w-24 flex flex-col">
      <p className="p-1.5">PlaceHolder image</p>
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={`flex items-center justify-center h-20 p-1.5 ${
            pathname === route.pathname && 'bg-indigo-500'
          }`}
        >
          {route.icon}
        </NavLink>
      ))}
    </div>
  );
}
