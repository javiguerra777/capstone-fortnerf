import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../app/redux/hooks';

const GetReduxStore = () => {
  const { user, game, registration } = useAppSelector(
    (state) => state,
    shallowEqual,
  );
  return { user, game, registration };
};

export default GetReduxStore;
