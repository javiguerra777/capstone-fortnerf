import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/FirebaseTS';
import { updateUsername } from '../../../store/UserSlice';
import { ChangeNameWrapper } from '../styles/ChangeName.style';

type NameComponentProps = {
  username: string;
  id: string;
  toggleActiveComponent: () => void;
};
function ChangeName({
  username,
  id,
  toggleActiveComponent,
}: NameComponentProps) {
  const dispatch = useDispatch();
  const userDoc = doc(db, 'users', id);
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
        toast.error(err.message);
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
        <form onSubmit={submitNewUsername}>
          <label htmlFor="newUsername">
            New Username:
            <input
              type="text"
              id="newUsername"
              value={newUsername}
              placeholder="raptors4life"
              onChange={(e) => setNewUsername(e.target.value)}
              required
            />
          </label>
          <button
            className="submit-btn"
            type="submit"
            disabled={username === ''}
          >
            Change Username
          </button>
        </form>
      </section>
    </ChangeNameWrapper>
  );
}

export default ChangeName;
