import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoginWrapper } from '../styles/LoginPage.style';
import { registrationUser } from '../../../store/UserSlice';
import AnimateCharacter from '../styles/AnimSprite';
import { loginUser } from '../../../common/service/User.service';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginToAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data } = await loginUser({ email, password });
      dispatch(registrationUser(data));
      navigate('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <LoginWrapper>
      <section className="inner-container">
        <p className="font-semibold text-2xl text-center my-2">
          Login to your account
        </p>
        <div className="my-2 self-center">
          <p className="text-lg">
            Join the world of FortNerf! Play with others, there are
            several servers to choose from.
          </p>
        </div>
        <AnimateCharacter>
          <div className="Character">
            {/* Taken from aws existing spritesheet */}
            <img
              className="Character_shadow pixelart"
              src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/21542/DemoRpgCharacterShadow.png"
              alt="Shadow"
            />

            <img
              className="Character_spritesheet pixelart face-down"
              src="/assets/characters/male_player.png"
              alt="Character"
            />
          </div>
        </AnimateCharacter>
        <form onSubmit={loginToAccount}>
          <label htmlFor="username">
            <p className="mt-2 mb-1 text-lg">Email</p>
            <input
              type="email"
              name="username"
              id="username"
              className="w-full text-black p-2 rounded"
              placeholder="ex: johnappleseed@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <p className="mt-2 mb-1 text-lg">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="w-full text-black p-2 rounded"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button
            className="bg-green-400 my-4 w-full flex flex-row justify-between items-center h-10 px-2 rounded-lg text-black hover:bg-green-500"
            type="submit"
          >
            Log In
            <BsArrowRight />
          </button>
        </form>
        <footer className="login-footer">
          <p className="text-lg">
            Don&#8217;t have an account?{' '}
            <NavLink
              to="signup"
              className="underline hover:text-blue-600"
            >
              Sign up Here
            </NavLink>
          </p>
          <p className="text-lg">
            Forgot password?{' '}
            <NavLink
              to="emailvalidation"
              className="underline hover:text-blue-600"
            >
              Cliek Here
            </NavLink>
          </p>
        </footer>
      </section>
    </LoginWrapper>
  );
}

export default LoginPage;
