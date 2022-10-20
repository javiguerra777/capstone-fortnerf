import React, { FormEvent, useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import styled from 'styled-components';
import { auth } from '../firebase/FirebaseTS';

const EmailWrapper = styled.main`
  color: white;
`;
function ValidateEmail() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const sendEmail = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      sendPasswordResetEmail(auth, email);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <EmailWrapper>
      {error && <h1>{error}</h1>}
      <h1>Enter Email Below to Reset Password</h1>
      <form onSubmit={sendEmail}>
        <label htmlFor="email">
          <input
            type="email"
            value={email}
            placeholder="Ex: johnappleseed@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
      </form>
    </EmailWrapper>
  );
}

export default ValidateEmail;
