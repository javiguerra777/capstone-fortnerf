import React from 'react';
import styled from 'styled-components';
import HomeNavBar from '../components/HomeNavBar';
import nerfBackground from '../img/nerf_background.png';

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
function About() {
  return (
    <AboutWrapper>
      <HomeNavBar />
      <section className="about-main">
        <header>
          <h1>About Fort Nerf</h1>
        </header>
        <section className="content-desc">
          <h2>
            Fort Nerf is a game that the employees at Bitwise play for
            fun
          </h2>
          <p>
            The issue is that Fort Nerf is only hosted at
            Bitwise&#39;s Fresno, Ca location. I wanted to come up
            with a virtual Fort Nerf game that all the employees could
            participate in regardless of location.
          </p>
        </section>
      </section>
    </AboutWrapper>
  );
}

export default About;
