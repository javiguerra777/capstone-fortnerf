import React, { FormEvent, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { auth, db } from '../../firebase/FirebaseTS';
import LoginWrapper from '../styles/AuthWrapper';
import { setUser } from '../../../app/redux/UserSlice';
import { setEmail } from '../../../app/redux/Registrations';
import useLoggedIn from '../hooks/useLoggedin';
import GetReduxStore from '../../../common/functions/GetStore';

function SignUpPage() {
  const dispatch = useDispatch();
  const userCollection = collection(db, 'users');
  const {
    registration: { email },
  } = GetReduxStore();
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(
    () => () => {
      dispatch(setEmail(''));
    },
    [dispatch],
  );
  useLoggedIn();
  const completeRegistration = async (
    e: FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    try {
      const createdUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      ).then((cred) =>
        addDoc(userCollection, {
          userId: cred.user.uid,
          email,
          name,
          username: username.toLowerCase(),
        }),
      );
      if (createdUser) {
        const q = query(userCollection, where('email', '==', email));
        const getUserFromDB = async () => {
          let userData = {};
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            userData = { ...doc.data(), id: doc.id };
          });
          dispatch(setUser({ ...userData }));
        };
        await getUserFromDB();
        await dispatch(setEmail(''));
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
        {message && <h1 id="error">{message}</h1>}
        <h1>Sign up for an Account</h1>
        <form onSubmit={completeRegistration}>
          <label htmlFor="name">
            <p>Name:</p>
            <input
              type="text"
              placeholder="ex: John Appleseed"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="username">
            <p>Username:</p>
            <input
              type="text"
              placeholder="ex: Username777"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <p>Email:</p>
            <input
              type="email"
              placeholder="ex: Johnappleseed@gmail.com"
              value={email}
              onChange={(e) => dispatch(setEmail(e.target.value))}
            />
          </label>
          <label htmlFor="password">
            <p>Password:</p>
            <input
              type="password"
              placeholder="min 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <hr />
          </div>
          <button className="register-acc" type="submit">
            Complete Registration
          </button>
        </form>
      </section>
    </LoginWrapper>
  );
}

export default SignUpPage;
