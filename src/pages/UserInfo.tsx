import React from 'react';
import { BiUser } from 'react-icons/bi';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import UserNavBar from '../components/UserNavBar';
import { RootState } from '../store';
import { setUser } from '../store/UserSlice';
import { UserInfoWrapper } from '../styles/ReusableStyles';

function UserInfo() {
  const dispatch = useDispatch();
  const { name, username, email } = useSelector(
    (state: RootState) => state.user,
    shallowEqual,
  );
  const signOut = () => {
    dispatch(setUser({}));
  };
  return (
    <UserInfoWrapper>
      <UserNavBar />
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
          <button type="button">Change Name</button>
        </footer>
      </section>
    </UserInfoWrapper>
  );
}

export default UserInfo;
