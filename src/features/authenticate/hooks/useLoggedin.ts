import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../app/redux/hooks';

const useLoggedIn = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAppSelector(
    (state) => state.user,
    shallowEqual,
  );
  useEffect(() => {
    if (loggedIn) {
      navigate('/dashboard');
    }
  }, []);
};

export default useLoggedIn;
