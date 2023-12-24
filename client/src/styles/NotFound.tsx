import styled from 'styled-components';

const NotFoundWrapper = styled.main`
  height: 100vh;
  width: 100vw;
  header {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    button {
      background: none;
      border: none;
    }
    p {
      display: flex;
      align-items: center;
    }
    button:hover {
      cursor: pointer;
    }
  }
`;
export default NotFoundWrapper;
