import React, { FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import dashboardimage from '../../../img/dashboard.png';
import PreviewGame from '../../../img/prev_game.png';
import { setEmail } from '../../../store/Registrations';
import { RootState } from '../../../store';
import { HomePageContainer } from '../styles/HomePage.style';

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { email } = useSelector(
    (state: RootState) => state.registration,
    shallowEqual,
  );
  const toLoginPage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setEmail('');
    navigate('/signup');
  };
  return (
    <HomePageContainer>
      <div className="bg-zinc-800 inner-container my-4 flex flex-col">
        <div className="p-1">
          <p className="text-center text-2xl font-semibold mt-2">
            Online Web Game Application
          </p>
          <p className="text-center text-xl font-medium my-2">
            Fort Nerf
          </p>
          <p className="text-xl text-center">
            A place where you and others can compete, have fun, and
            communicate
          </p>
        </div>

        <section className="self-center my-4">
          <form onSubmit={toLoginPage}>
            <input
              className="p-2 rounded text-black"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
            <button
              type="submit"
              className="bg-green-400 p-2 ml-1 rounded hover:bg-green-600"
            >
              Get Started
            </button>
          </form>
        </section>
        <section className="lg:flex lg:flex-row w-full">
          <img
            className="w-full"
            src={dashboardimage}
            alt="dashboard"
          />
          <img
            className="w-full"
            src={PreviewGame}
            alt="preview game"
          />
        </section>
      </div>
    </HomePageContainer>
  );
}

export default HomePage;
