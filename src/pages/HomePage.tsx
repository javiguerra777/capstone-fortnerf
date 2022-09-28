import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import HomeNavBar from '../components/HomeNavBar';
import dashboardimage from '../img/dashboard.png';

const StyledHome = styled.main`
  height: 100vh;
  width: 100vw;
  background: #d38312; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to left,
    #a83279,
    #d38312
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to left,
    #a83279,
    #d38312
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  button {
    cursor: pointer;
    opacity: 0.8;
  }
  button:hover {
    opacity: 1;
  }
  .home-container {
    background-color: #333333;
    position: fixed;
    top: 2.5%;
    right: 2.5%;
    height: 95%;
    width: 95%;
    display: flex;
    flex-direction: column;
  }
  .home-title {
    color: #fff5ee;
    h2,
    h1,
    h3,
    h4,
    h5 {
      text-align: center;
    }
    h2 {
      font-size: 2.5rem;
    }
  }
  .center {
    align-self: center;
  }
  .enter-email {
    margin-top: 1em;
    height: 6vh;
    border: solid 1px white;
    display: flex;
    flex-direction: row;
    align-items: center;
    .items {
      height: 4vh;
    }
    input {
      background: none;
      border: none;
      color: #fff5ee;
      margin-left: 0.5em;
    }
    input::placeholder {
      color: #fff5ee;
    }
    .home-get-started {
      background: #16d892;
      color: #fff5ee;
      border: none;
      border-radius: 5px;
      margin-right: 0.5em;
    }
  }
  .preview {
    display: flex;
    flex-direction: row;
    margin-top: 2em;
    width: 75vw;
    height: 20rem;
    background-color: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 1rem 0 rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    .dash-img {
      height: 100%;
      width: 50%;
    }
    .prev-vid {
      height: 100%;
      width: 50%;
    }
  }
  #online-web-game {
    color: #16d892;
  }
`;

function HomePage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const toLoginPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    navigate('/signup');
  };
  return (
    <StyledHome>
      <section className="home-container">
        <HomeNavBar />
        <section className="home-title center">
          <h3 id="online-web-game">Online Web Game Application</h3>
          <h2>Fort Nerf</h2>
          <h3>
            A place where you and others can compete, have fun, and
            communicate
          </h3>
        </section>
        <section className="enter-email center">
          <form onSubmit={toLoginPage}>
            <input
              className="items"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit" className="home-get-started items">
              Get Started
            </button>
          </form>
        </section>
        <section className="preview center">
          <img
            className="dash-img"
            src={dashboardimage}
            alt="dashboard"
          />
          <iframe
            className="prev-vid"
            src="https://www.youtube.com/embed/T33NN_pPeNI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture fullscreen"
            allowFullScreen
          />
        </section>
      </section>
    </StyledHome>
  );
}

export default HomePage;
