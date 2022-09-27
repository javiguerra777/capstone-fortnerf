import React, { FormEvent, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
  getDocs,
  collection,
  where,
  query,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import LoginWrapper from '../styles/ReusableStyles';
import HomeNavBar from '../components/HomeNavBar';
import { db, auth } from '../firebase/FirebaseTS';
import { setUser } from '../store/UserSlice';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userCollection = collection(db, 'users');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

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
            userData = { ...doc.data() };
          });
          dispatch(setUser({ ...userData }));
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
        <section className="img-holder">Image placeholder</section>
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
