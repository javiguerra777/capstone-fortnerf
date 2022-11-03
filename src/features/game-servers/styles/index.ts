import styled from 'styled-components';

export const DashboardWrapper = styled.main`
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  .active-games {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 75%;
    height: auto;
    max-height: 35em;
    border: solid white 4px;
    border-radius: 0.5em;
    overflow-y: scroll;
  }
  .game-options-nav {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    .nav-btn {
      background: none;
      color: white;
      border: solid 0.2em white;
      border-radius: 0.3em;
      padding: 1em;
      cursor: pointer;
      width: 10em;
    }
    .btn-one {
      margin-right: 2em;
    }
    .btn-three {
      margin-left: 2em;
    }
  }
`;
export const GameDetails = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 96%;
  border: solid white 2px;
  border-radius: 0.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  #item1 {
    margin-left: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    img {
      height: 2em;
      width: 2em;
      border-radius: 2em;
      margin-left: 0.5em;
    }
  }
  #item2 {
    align-text: center;
  }
  #item3 {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;
export default DashboardWrapper;
