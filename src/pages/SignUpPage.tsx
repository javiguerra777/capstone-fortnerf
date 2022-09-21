import React, { FormEvent, useState } from 'react';
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
import { auth, db } from '../firebase/FirebaseTS';
import LoginWrapper from '../styles/ReusableStyles';
import { setUser } from '../store/UserSlice';

function SignUpPage() {
  const dispatch = useDispatch();
  const userCollection = collection(db, 'users');
  const [name, setName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
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
            userData = { ...doc.data() };
          });
          dispatch(setUser({ ...userData }));
        };
        await getUserFromDB();
        navigate('/dashboard');
      }
    } catch (err: any) {
      setMessage(err.message);
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
              onChange={(e) => setEmail(e.target.value)}
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
