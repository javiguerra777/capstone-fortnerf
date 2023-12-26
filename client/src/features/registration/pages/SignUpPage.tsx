import React, { FormEvent, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { LoginWrapper } from '../styles/LoginPage.style';
// import { registrationUser } from '../../../store/UserSlice';
import { registerUser } from '../../../common/service/User.service';

function SignUpPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialEmail = searchParams.get('email') || '';
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
      const res = await registerUser({
        name,
        username,
        email,
        password,
        profilePicture:
          'https://firebasestorage.googleapis.com/v0/b/capstone-fortnerf.appspot.com/o/profile_pictures%2Ftest_image.png?alt=media&token=783965c2-093d-4971-b1d4-9a9eb057b99e',
      });
      console.log(res, dispatch);
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
