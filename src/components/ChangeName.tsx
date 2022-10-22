import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/FirebaseTS';
import { updateUsername } from '../store/UserSlice';
import { ChangeNameWrapper } from '../styles/ReusableStyles';

type NameComponentProps = {
  username: string;
  docId: string;
  toggleActiveComponent: () => void;
};
function ChangeName({
  username,
  docId,
  toggleActiveComponent,
}: NameComponentProps) {
  const dispatch = useDispatch();
  const userDoc = doc(db, 'users', docId);
  const [error, setError] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const submitNewUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        username: newUsername,
      };
      await updateDoc(userDoc, data);
      await dispatch(updateUsername(newUsername));
      setNewUsername('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };
  return (
    <ChangeNameWrapper>
      <section className="container">
        <header>
          <p />
          <h1>Current Username: {username}</h1>
          <button type="button" onClick={toggleActiveComponent}>
            X
          </button>
        </header>
        {error && <h1>{error}</h1>}
        <form onSubmit={submitNewUsername}>
          <label htmlFor="newUsername">
            New Username:
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              placeholder="raptors4life"
              onChange={(e) => setNewUsername(e.target.value)}
            />
          </label>
          <button className="submit-btn" type="submit">
            Change Username
          </button>
        </form>
      </section>
    </ChangeNameWrapper>
  );
}

export default ChangeName;
