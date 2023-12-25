import { shallowEqual } from 'react-redux';
import { useAppSelector } from '../../store/hooks';

export default function UseGetUserFromStore() {
  const user = useAppSelector((state) => state.user, shallowEqual);
  return user;
}
