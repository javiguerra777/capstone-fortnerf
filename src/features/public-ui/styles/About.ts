import styled from 'styled-components';
import nerfBackground from '../../../assets/img/nerf_background.png';

const AboutWrapper = styled.main`
  background: url(${nerfBackground});
  background-repeat: no-repeat;
  background-size 60% 100%;
  background-position: right;
  color: #fff5ee;
  height: 100vh;
  width: 100vw;
  .about-main {
    margin-top: 3em;
    margin-left: 2em;
    h1 {
      font-size: 3rem;
    }
    .content-desc {
      border-top: 0.5em solid #ff0913;
      width: 40%;
    }
  }
`;
export default AboutWrapper;
