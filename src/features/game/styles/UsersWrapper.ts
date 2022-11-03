import styled from 'styled-components';

const UsersWrapper = styled.aside`
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

export default UsersWrapper;
