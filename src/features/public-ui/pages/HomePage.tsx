import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import HomeNavBar from '../../../common/components/HomeNavBar';
import dashboardimage from '../../../assets/img/dashboard.png';
import PreviewGame from '../../../assets/img/prev_game.png';
import { setEmail } from '../../../app/redux/Registrations';
import StyledHome from '../styles/Home';
import GetReduxStore from '../../../common/hooks/GetStore';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    registration: { email },
  } = GetReduxStore();
  const toLoginPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
              onChange={(e) => dispatch(setEmail(e.target.value))}
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
          <img
            className="prev-img"
            src={PreviewGame}
            alt="preview game"
          />
        </section>
      </section>
    </StyledHome>
  );
}

export default HomePage;
