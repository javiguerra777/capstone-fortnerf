import React from 'react';
import HomeNavBar from '../../../common/components/HomeNavBar';
import AboutWrapper from '../styles/About';

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
