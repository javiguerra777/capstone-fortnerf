import React, { FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseTS';
import EmailWrapper from '../styles/Email';

function ValidateEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSent, setIsSent] = useState(false);
  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setEmail('');
      setIsSent(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <EmailWrapper>
      {isSent ? (
        <section className="sent-email">
          <h1>Email was sent, check your email.</h1>
          <p>Make sure to check your spam as well.</p>
        </section>
      ) : (
        <section className="unsent-email">
          {error && <h1 className="error">{error}</h1>}
          <h1>Trouble signing in?</h1>
          <h2>Enter your email below</h2>
          <form onSubmit={sendEmail}>
            <label htmlFor="email">
              Email:
              <input
                type="email"
                value={email}
                placeholder="Ex: johnappleseed@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <button type="submit">Reset Password</button>
          </form>
        </section>
      )}
    </EmailWrapper>
  );
}

export default ValidateEmail;
