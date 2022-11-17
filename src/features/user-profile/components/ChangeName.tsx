import React, { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/FirebaseTS';
import { updateUsername } from '../../../app/redux/UserSlice';
import ChangeNameWrapper from '../styles/ChangeName';
import GetReduxStore from '../../../common/hooks/GetStore';

type NameComponentProps = {
  // eslint-disable-next-line no-unused-vars
  toggleActiveComponent: (option: string) => void;
};
function ChangeName({ toggleActiveComponent }: NameComponentProps) {
  const {
    user: { username, docId },
  } = GetReduxStore();
  const dispatch = useDispatch();
  const userDoc = doc(db, 'users', docId);
  const [error, setError] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const submitNewUsername = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const data = {
        username: newUsername.trim(),
      };
      await updateDoc(userDoc, data);
      await dispatch(updateUsername(newUsername.trim()));
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
          <button
            type="button"
            onClick={() => toggleActiveComponent('name')}
          >
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
