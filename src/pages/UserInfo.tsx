import React from 'react';
import { useNavigate } from 'react-router-dom';
import UserNavBar from '../components/UserNavBar';

function UserInfo() {
  const navigate = useNavigate();
  const signOut = () => {
    navigate('/login');
  };
  return (
    <div>
      <UserNavBar />
      <button type="button" onClick={signOut}>
        Sign out
      </button>
    </div>
  );
}

export default UserInfo;
