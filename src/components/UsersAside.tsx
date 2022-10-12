import React from 'react';
import styled from 'styled-components';

const UsersWrapper = styled.aside`
  height: 100%;
  width: 10%;
  background: #333333;
`;

function UsersAside() {
  return (
    <UsersWrapper>
      <h1>Users Aside</h1>
    </UsersWrapper>
  );
}

export default UsersAside;
