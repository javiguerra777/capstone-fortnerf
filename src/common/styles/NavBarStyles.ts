import styled from 'styled-components';

const NavBarWrapper = styled.nav`
  width: 100vw;
  margin-top: 1em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  a {
    color: white;
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
  @media (max-width: 700px) {
    a {
      font-size: 0.7rem;
    }
  }
`;
export const NavBar = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 8vh;
  width: 100%;
  a {
    color: #fff5ee;
    text-decoration: none;
    margin-right: 2em;
  }
  a:hover {
    text-decoration: underline;
  }
  button {
    cursor: pointer;
  }
  .app-name {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 1em;
    color: #fff5ee;
    h1 {
      font-size: 2rem;
      margin-right: 0.5em;
    }
    img {
      height: 95%;
      width: 3em;
    }
  }
  .navigation {
    button {
      background: white;
      border: none;
      border-radius: 5px;
      padding: 7px;
      margin-right: 1em;
    }
  }
  @media (max-width: 700px) {
    a {
      margin-right: 1em;
      font-size: 0.8rem;
    }
    .app-name {
      h1 {
        font-size: 1rem;
        margin-right: 0.1em;
      }
      img {
        height: 95%;
        width: 1.5em;
      }
    }
    .navigation {
      button {
        padding: 5px;
        margin-right: 0.5em;
        font-size: 0.6em;
      }
    }
  }
`;
export default NavBarWrapper;
