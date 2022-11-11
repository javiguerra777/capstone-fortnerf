import styled from 'styled-components';

const StyledButton = styled.button`
  :disabled {
    background-color: lightgray;
  }
  :enabled {
    cursor: pointer;
  }
  margin-top: 1em;
  display: flex;
  align-items: center;
  width: 4em;
  height: 4em;
  border-radius: 3em;
  border: none;
  background: white;
  .button {
    border: none;
    border-radius: 50em;
    color: #04c399;
    width: auto;
    height: 3em;
    padding: 0;
    background: none;
  }
  .single {
    left: 10px;
  }
`;

export default StyledButton;
