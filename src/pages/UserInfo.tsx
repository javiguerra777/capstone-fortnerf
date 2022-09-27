import React from 'react';
import styled from 'styled-components';
import { BiUser } from 'react-icons/bi';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import UserNavBar from '../components/UserNavBar';
import { RootState } from '../store';
import { setUser } from '../store/UserSlice';

const UserInfoWrapper = styled.main`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .user-information {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 40em;
    border: solid white 3px;
    .details {
      background: #8079d1;
      width: 90%;
      display: flex;
      flex-direction: row;
      padding: 1em 0 1em 0;
      margin-bottom: 2em;
      .img-name {
        margin-left: 2em;
        margin-right: 1em;
      }
      .username {
        margin-right: 1em;
      }
    }
  }
  .user-info-footer {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 1em;
    button {
      margin-left: 5em;
      margin-right: 5em;
      padding: 0.5em 1em 0.5em 1em;
      background: none;
      color: white;
      border: solid 1px white;
      border-radius: 0.5em;
      cursor: pointer;
    }
  }
`;
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
