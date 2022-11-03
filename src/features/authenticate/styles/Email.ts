import styled from 'styled-components';

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
export default EmailWrapper;
