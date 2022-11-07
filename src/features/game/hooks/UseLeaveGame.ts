import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { leaveGame } from '../../../app/redux/GameSlice';

const UseLeaveGame = () => {
  const dispatch = useDispatch();
  useEffect(
    () => () => {
      dispatch(leaveGame());
    },
    [],
  );
};

export default UseLeaveGame;
