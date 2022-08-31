import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BiUser } from 'react-icons/bi';
import UserNavBar from '../components/UserNavBar';

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
  const navigate = useNavigate();
  const signOut = () => {
    navigate('/login');
  };
  return (
    <UserInfoWrapper>
      <UserNavBar />
      <section className="user-information">
        <h2>Account Info</h2>
        <section className="details">
          <section className="img-name">
            <BiUser size={70} />
            <p>Javi Guerra</p>
          </section>
          <section className="username">
            <h3>Username:</h3>
            <p>JHoodie777</p>
          </section>
          <section className="email">
            <h3>Email:</h3>
            <p>placeholderemail@u.pacific.edu</p>
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
