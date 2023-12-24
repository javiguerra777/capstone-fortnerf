import styled from 'styled-components';

export const UserInfoWrapper = styled.main`
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

export const DashboardWrapper = styled.main`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .active-games {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    height: auto;
    max-height: 35em;
    border: solid white 4px;
    border-radius: 0.5em;
    overflow-y: scroll;
  }
  .game-options-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .nav-btn {
      background: none;
      color: white;
      border: solid 0.2em white;
      border-radius: 0.3em;
      padding: 1em;
      cursor: pointer;
      width: 10em;
    }
    .btn-one {
      margin-right: 2em;
    }
    .btn-three {
      margin-left: 2em;
    }
  }
`;
export const GameDetails = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  border: solid white 2px;
  border-radius: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  cursor: pointer;
  #item1 {
    margin-left: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    img {
      height: 2em;
      width: 2em;
      border-radius: 2em;
      margin-left: 0.5em;
    }
  }
  #item2 {
    align-text: center;
  }
  #item3 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

export const UsersWrapper = styled.aside`
  height: 100%;
  width: 15%;
  background: #333333;
  color: white;
  display: flex;
  font-size: 0.9rem;
  flex-direction: column;
  .each-user {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .users-header {
    display: flex;
    flex-direction: column;
    align-items: center;
    h1 {
      text-align: center;
      border-bottom: solid 1px white;
      padding-bottom: 0.5em;
      width: 95%;
    }
  }
  .users-section {
    background: #3b3c36;
    height: 100%;
  }
`;
export const NavBarWrapper = styled.nav`
  width: 100vw;
  margin-top: 1em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  a {
    color: white;
    text-decoration: none;
    margin-right: 2em;
  }
  a:hover {
    text-decoration: underline;
  }
`;

export const ChangeNameWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 2;
  background: rgba(0, 0, 0, 0.5);
  .container {
    background: black;
    color: white;
    border: solid 1px white;
    width: 60%;
    position: relative;
    top: 10em;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 0.5em 1em 0.5em;
    header {
      width: 100%;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    button {
      background: none;
      border: none;
      color: white;
      font-size: 1.5em;
    }
    button:hover {
      cursor: pointer;
    }
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      label {
        margin-bottom: 1em;
      }
      input {
        width: 15em;
      }
    }
    .submit-btn {
      background: black;
      color: white;
      border: solid 1px white;
      border-radius: 0.3em;
      font-size: 0.8em;
      width: 10em;
      padding: 5px;
    }
  }
`;
