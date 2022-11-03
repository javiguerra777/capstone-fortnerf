import styled from 'styled-components';

const ContactWrapper = styled.main`
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
export default ContactWrapper;
