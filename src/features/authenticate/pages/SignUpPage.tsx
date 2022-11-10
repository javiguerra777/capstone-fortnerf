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
import GetReduxStore from '../../../common/hooks/GetStore';
import Part1 from '../components/Part1';
import Part2 from '../components/Part2';
import Part3 from '../components/Part3';
import Part4 from '../components/Part4';

function SignUpPage() {
  const userCollection = collection(db, 'users');
  const dispatch = useDispatch();
  const {
    registration: { email },
  } = GetReduxStore();
  const [state, setState] = useState({
    name: '',
    username: '',
    password: '',
    repeatPassword: '',
    message: '',
    sprite: '',
    part: 0,
  });
  const setSprite = (value: string) => {
    setState({ ...state, sprite: value });
  };
  const updateState = (value: any, option: string) => {
    switch (option) {
      case 'name':
        setState({ ...state, name: value });
        break;
      case 'username':
        setState({ ...state, username: value });
        break;
      case 'password':
        setState({ ...state, password: value });
        break;
      case 'repeatPassword':
        setState({ ...state, repeatPassword: value });
        break;
      case 'message':
        setState({ ...state, message: value });
        break;
      case 'part':
        setState({ ...state, part: value });
        break;
      default:
        break;
    }
  };
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
        state.password,
      ).then((cred) =>
        addDoc(userCollection, {
          userId: cred.user.uid,
          email,
          name: state.name,
          username: state.username.toLowerCase(),
          sprite: state.sprite,
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
          dispatch(setUser({ ...userData, loggedIn: true }));
        };
        await getUserFromDB();
        await dispatch(setEmail(''));
        navigate('/dashboard');
      }
    } catch (err) {
      if (err instanceof Error) {
        updateState(err.message, 'message');
      }
    }
  };
  const switchForm = () => {
    switch (state.part) {
      case 0:
        return (
          <Part1
            name={state.name}
            username={state.username}
            updateState={updateState}
          />
        );
      case 1:
        return (
          <Part2
            sprite={state.sprite}
            setSprite={setSprite}
            updateState={updateState}
          />
        );
      case 2:
        return (
          <Part3
            password={state.password}
            repeatPassword={state.repeatPassword}
            updateState={updateState}
          />
        );
      case 3:
        return (
          <Part4
            name={state.name}
            username={state.username}
            email={email}
            sprite={state.sprite}
            updateState={updateState}
          />
        );
      default:
        return false;
    }
  };
  return (
    <LoginWrapper>
      <section className="main-login">
        {state.message && <h1 id="error">{state.message}</h1>}
        <h1>Sign up for an Account</h1>
        <form onSubmit={completeRegistration}>{switchForm()}</form>
      </section>
    </LoginWrapper>
  );
}

export default SignUpPage;
