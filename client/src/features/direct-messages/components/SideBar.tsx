import React, { useMemo } from 'react';
import { FiMessageSquare } from 'react-icons/fi';
import { FaPhoneAlt, FaVideo } from 'react-icons/fa';
import { IoIosSettings } from 'react-icons/io';
import { NavLink, useLocation } from 'react-router-dom';
import UseGetUserFromStore from '../../../common/hooks/UseGetUserFromStore.hook';

export default function SideBar() {
  const { profilePicture } = UseGetUserFromStore();
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
    <div className="overflow-auto bg-indigo-400 h-full w-24 flex flex-col items-center">
      <img
        src={profilePicture}
        alt="profile-pic"
        className="w-20 h-20 rounded-full my-3"
      />
      {routes.map((route) => (
        <NavLink
          key={route.path}
          to={route.path}
          className={`flex items-center justify-center h-20 w-full p-1.5 hover:bg-indigo-600 ${
            pathname === route.pathname && 'bg-indigo-500'
          }`}
        >
          {route.icon}
        </NavLink>
      ))}
    </div>
  );
}
