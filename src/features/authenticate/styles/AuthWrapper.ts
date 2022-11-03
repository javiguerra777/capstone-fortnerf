import styled from 'styled-components';

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

export default LoginWrapper;
