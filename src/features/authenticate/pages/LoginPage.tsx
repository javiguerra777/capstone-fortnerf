import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import LoginWrapper from '../styles/AuthWrapper';
import HomeNavBar from '../../../common/components/HomeNavBar';
import { db, auth } from '../../firebase/FirebaseTS';
import { setUser } from '../../../app/redux/UserSlice';
import AnimateCharacter from '../styles/AnimSprite';
import useLoggedIn from '../hooks/useLoggedin';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCollection = collection(db, 'users');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  useLoggedIn();
  const loginToAccount = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const login = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      );
      if (login) {
        const q = query(userCollection, where('email', '==', email));

        const getUserFromDB = async () => {
          let userData = {};
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            userData = { ...doc.data(), id: doc.id };
          });
          await dispatch(setUser({ ...userData, loggedIn: true }));
        };
        await getUserFromDB();
        navigate('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        setMessage(err.message);
      }
    }
  };
  return (
    <LoginWrapper>
      <section className="main-login">
        <HomeNavBar />
        <h1>Login to your account</h1>
        {message && <h1 id="error">{message}</h1>}
        <h2>
          Join the world of FortNerf! Play with others, there are
          several servers to choose from.
        </h2>
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
            <p>Email:</p>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="ex: johnappleseed@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button className="login-btn" type="submit">
            Log In
            <BsArrowRight />
          </button>
        </form>
        <footer className="login-footer">
          <div>
            Don&#8217;t have an account? Sign up{' '}
            <NavLink to="/signup">Here</NavLink>
          </div>
          <div>
            Forgot password? Click{' '}
            <NavLink to="/emailvalidation">Here</NavLink>
          </div>
        </footer>
      </section>
    </LoginWrapper>
  );
}

export default LoginPage;
