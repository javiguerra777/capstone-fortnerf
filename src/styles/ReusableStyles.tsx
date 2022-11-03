import styled from 'styled-components';
import nerfBackground from '../img/nerf_background.png';

const LoginWrapper = styled.main`
  background: #00c399;
  height: 100vh;
  width: 100vw;
  position: fixed;
  left: 0;
  top: 0;
  form {
    width: 30rem;
    display: flex;
    flex-direction: column;
    margin-top: 1em;
    label {
      color: #fff5ee;
      font-size: 1.5rem;
      p {
        position: relative;
        right: 3em;
      }
    }
    input {
      color: #fff5ee;
      background: #222222;
      width: 100%;
      border: none;
      border-radius: 0.5em;
      height: 2.5em;
    }
    div {
      margin-top: 0.5em;
      margin-bottom: 1em;
      align-self: center;
      width: 35em;
      hr {
        width: 100%;
        background-color: #00c399;
      }
    }
  }
  .main-login {
    width: 98vw;
    height: 98vh;
    background: #333333;
    position: fixed;
    left: 1vw;
    top: 1vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    h1,
    h2,
    h3,
    h4,
    h5 {
      text-align: center;
    }
    h1 {
      color: #fff5ee;
      font-size: 1.5rem;
    }
    h2 {
      color: #fff5ee;
      font-size: 1rem;
    }
  }
  .img-holder {
    background: whitesmoke;
    width: 75vw;
    height: 10rem;
  }
  .login-btn {
    background: #62c888;
    border: none;
    border-radius: 1em;
    align-self: center;
    margin-top: 1.5em;
    height: 2em;
    width: 10em;
    cursor: pointer;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: 1.2rem;
  }
  .login-footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-top: 1em;
    div {
      color: #fff5ee;
      margin-left: 1em;
      margin-right: 1em;
    }
    a {
      color: #fff5ee;
    }
  }
  .register-acc {
    align-self: center;
    background: #62c888;
    width: 15em;
    height: 2.5em;
    border: none;
    border-radius: 1em;
    cursor: pointer;
    font-size: 1.2rem;
  }
`;
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
export const StyledHome = styled.main`
  height: 100vh;
  width: 100vw;
  background: #d38312; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #a83279,
    #d38312
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #a83279,
    #d38312
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  button {
    cursor: pointer;
    opacity: 0.8;
  }
  button:hover {
    opacity: 1;
  }
  .home-container {
    background-color: #333333;
    position: fixed;
    top: 2.5%;
    right: 2.5%;
    height: 95%;
    width: 95%;
    display: flex;
    flex-direction: column;
  }
  .home-title {
    color: #fff5ee;
    h2,
    h1,
    h3,
    h4,
    h5 {
      text-align: center;
    }
    h2 {
      font-size: 2.5rem;
    }
  }
  .center {
    align-self: center;
  }
  .enter-email {
    margin-top: 1em;
    height: 6vh;
    border: solid 1px white;
    display: flex;
    flex-direction: row;
    align-items: center;
    .items {
      height: 4vh;
    }
    input {
      background: none;
      border: none;
      color: #fff5ee;
      margin-left: 0.5em;
    }
    input::placeholder {
      color: #fff5ee;
    }
    .home-get-started {
      background: #16d892;
      color: #fff5ee;
      border: none;
      border-radius: 5px;
      margin-right: 0.5em;
    }
  }
  .preview {
    display: flex;
    flex-direction: row;
    margin-top: 2em;
    width: 75vw;
    height: 20rem;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    .dash-img {
      height: 100%;
      width: 50%;
    }
    .prev-img {
      height: 100%;
      width: 50%;
    }
  }
  #online-web-game {
    color: #16d892;
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
export const ContactWrapper = styled.main`
  height: auto;
  textarea {
    resize: none;
  }
  textarea,
  input {
    color: #fff5ee;
    background: #222222;
    border: none;
  }
  input {
    height: 2em;
    margin-bottom: 0.5em;
    width: 30em;
  }
  textarea {
    width: 40em;
  }
  form {
    display: flex;
    flex-direction: column;
    margin-right: 3em;
  }
  .main-contact {
    color: #fff5ee;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 3em;
    margin-left: 2em;
    margin-right: 2em;
    h2 {
      color: #16d892;
      font-size: 2em;
    }
  }
  .email-btn {
    background: #16d892;
    color: #fff5ee;
    cursor: pointer;
    margin-top: 1em;
    height: 3em;
    width: 10em;
  }
  @media (max-width: 860px) {
    input {
      width: 30vw;
    }
    textarea {
      width: 45vw;
    }
  }
`;
export const AboutWrapper = styled.main`
  background: url(${nerfBackground});
  background-repeat: no-repeat;
  background-size 60% 100%;
  background-position: right;
  color: #fff5ee;
  height: 100vh;
  width: 100vw;
  .about-main {
    margin-top: 3em;
    margin-left: 2em;
    h1 {
      font-size: 3rem;
    }
    .content-desc {
      border-top: 0.5em solid #ff0913;
      width: 40%;
    }
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
      .player-sprite {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
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
      .radio {
        width: 100%;
        height: auto;
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 0.5em;
        label {
          width: auto;
        }
        input {
          justify-self: flex-start;
          margin: 0 auto;
          margin-right: 1.5em;
          width: 10px;
        }
      }
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
export const EmailWrapper = styled.main`
  background: #dadefb;
  height: 100vh;
  width: 100vw;
  color: white;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .error {
    color: red;
  }
  .sent-email {
    background: whitesmoke;
    color: black;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .unsent-email {
    color: black;
    background: whitesmoke;
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 2em;
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
      button {
        background: #7b72dc;
        color: white;
        border: solid 1px white;
        width: 10em;
        padding: 5px;
      }
      button:hover {
        cursor: pointer;
      }
    }
  }
`;

export default LoginWrapper;
