import React from 'react';
import styled from 'styled-components';

const EmailWrapper = styled.main`
  color: white;
`;
function ValidateEmail() {
  return (
    <EmailWrapper>
      <h1>Enter Email Below</h1>
      <form>
        <label htmlFor="email">
          <input
            type="text"
            placeholder="Ex: johnappleseed@gmail.com"
          />
        </label>
      </form>
    </EmailWrapper>
  );
}

export default ValidateEmail;
