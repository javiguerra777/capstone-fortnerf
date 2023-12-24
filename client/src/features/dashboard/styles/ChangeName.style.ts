import styled from 'styled-components';

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
export default {};
