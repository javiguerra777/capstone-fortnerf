import styled from 'styled-components';

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
      overflow-x: scroll;
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
    justify-content: space-evenly;
    margin-bottom: 1em;
    button {
      padding: 0.5em 1em 0.5em 1em;
      background: none;
      color: white;
      border: solid 1px white;
      border-radius: 0.5em;
      cursor: pointer;
    }
  }
  @media (max-width: 700px) {
    .user-information {
      width: 75%;
    }
    button {
      font-size: 0.7rem;
    }
  }
`;

export default UserInfoWrapper;
