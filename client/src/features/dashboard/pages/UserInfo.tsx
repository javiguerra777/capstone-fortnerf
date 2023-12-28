import React, { useState } from 'react';
import { BiUser } from 'react-icons/bi';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../../store';
import { logout, resetStore } from '../../../store/UserSlice';
import { UserInfoWrapper } from '../styles/UserInfo.style';
import ChangeName from '../components/ChangeName';

function UserInfo() {
  const dispatch = useDispatch();
  const { name, username, email, id } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const [componentActive, setComponentActive] = useState(false);
  const signOut = () => {
    dispatch(logout());
    dispatch(resetStore());
  };
  const toggleActiveComponent = () => {
    setComponentActive(!componentActive);
  };
  return (
    <UserInfoWrapper>
      <section className="user-information">
        <h2>Account Info</h2>
        <section className="details">
          <section className="img-name">
            <BiUser size={70} />
            <p>{name}</p>
          </section>
          <section className="username">
            <h3>Username:</h3>
            <p>{username}</p>
          </section>
          <section className="email">
            <h3>Email:</h3>
            <p>{email}</p>
          </section>
        </section>
        <footer className="user-info-footer">
          <button type="button" onClick={signOut}>
            Sign Out
          </button>
          <button type="button" onClick={toggleActiveComponent}>
            Change Name
          </button>
        </footer>
      </section>
      {componentActive && (
        <ChangeName
          username={username}
          id={id}
          toggleActiveComponent={toggleActiveComponent}
        />
      )}
    </UserInfoWrapper>
  );
}

export default UserInfo;
