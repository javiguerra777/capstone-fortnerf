import styled from 'styled-components';

const FooterWrapper = styled.footer`
  background: #333333;
  width: 100vw;
  height: 6%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  .flex-row {
    display: flex;
    flex-direction: row;
  }
  .user-div {
    align-items: center;
    justify-content: center;
    margin-left: 1em;
    height: 100%;
    p {
      color: white;
      padding: 0.4em;
      border-radius: 0.5em;
      background: #414a4c;
      margin-left: 0.5em;
    }
    img {
      height: 85%;
    }
  }
  .text-users {
    height: 100%;
    align-items: center;
    button {
      margin-right: 0.5em;
      border: none;
      background: #414a4c;
      font-size: 1.5em;
      color: white;
      border-radius: 0.5em;
      height: 50%;
    }
  }
  @media (max-width: 700px) {
    .text-users {
      button {
        font-size: 1.2rem;
      }
    }
    p {
      font-size: 1rem;
    }
  }
  @media (max-height: 600px) {
    .video-voice,
    .text-users {
      button {
        font-size: 0.8rem;
      }
    }
    p {
      font-size: 0.5rem;
    }
  }
  // for galaxy fold or any phone this small
  @media (max-width: 300px) {
    .text-users {
      button {
        font-size: 0.7rem;
      }
    }
    p {
      font-size: 0.8rem;
    }
  }
  @media (max-height: 300px) {
    .text-users {
      button {
        font-size: 0.6rem;
      }
    }
    p {
      font-size: 0.4rem;
    }
  }
`;

export default FooterWrapper;
