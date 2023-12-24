import styled from 'styled-components';

export const NavBarWrapper = styled.nav`
  width: 100vw;
  margin-top: 1em;
  margin-bottom: 2em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  a {
    color: white;
    text-decoration: none;
    margin-right: 2em;
  }
  a:hover {
    text-decoration: underline;
  }
`;
export default {};
