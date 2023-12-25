import React, { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {
  collection,
  addDoc,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { auth, db } from '../../../firebase/FirebaseTS';
import { LoginWrapper } from '../styles/LoginPage.style';
import { setUser } from '../../../store/UserSlice';

function SignUpPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';
  const userCollection = collection(db, 'users');
  const [name, setName] = useState('');
  const [email, setEmail] = useState(initialEmail);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
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
            userData = { ...doc.data(), id: doc.id };
          });
          dispatch(setUser({ ...userData }));
        };
        await getUserFromDB();
        navigate('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <LoginWrapper>
      <section className="inner-container">
        <p className="text-center font-semibold text-2xl">
          Sign up for an Account
        </p>
        <form onSubmit={completeRegistration}>
          <label htmlFor="name">
            <p className="text-lg mb-1">Name</p>
            <input
              type="text"
              placeholder="ex: John Appleseed"
              id="name"
              className="h-10 w-full rounded p-2 text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label htmlFor="username">
            <p className="text-lg mb-1 mt-2">Username</p>
            <input
              type="text"
              placeholder="ex: Username777"
              id="username"
              className="h-10 w-full rounded p-2 text-black"
              value={username}
              onChange={(e) => setUserName(e.target.value)}
            />
          </label>
          <label htmlFor="email">
            <p className="text-lg mb-1 mt-2">Email</p>
            <input
              type="email"
              placeholder="ex: Johnappleseed@gmail.com"
              id="email"
              className="h-10 w-full rounded p-2 text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            <p className="text-lg mb-1 mt-2">Password</p>
            <input
              type="password"
              placeholder="min 6 characters"
              id="password"
              className="h-10 w-full rounded mb-3 p-2 text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <div>
            <hr />
          </div>
          <button
            className="bg-green-300 w-full h-10 text-black rounded-lg mt-3"
            type="submit"
          >
            Complete Registration
          </button>
        </form>
      </section>
    </LoginWrapper>
  );
}

export default SignUpPage;
