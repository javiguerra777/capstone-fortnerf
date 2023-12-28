import { useEffect } from 'react';
import { socket } from '../service/socket';
import { useAppDispatch } from '../../store/hooks';
import DirectMessagesApi from '../api/DirectMessagesApi.js';

export default function DirectMessageNotifications() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('directMessage/newDirectMessage', ({ data }) => {
      console.log('received socket data');
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessages',
          '',
          (draft) => {
            draft[data.roomId].messages.unshift(data);
          },
        ),
      );
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessagesByRoomId',
          data.roomId,
          (draft) => {
            draft.messages.push(data);
          },
        ),
      );
    });
    return () => {
      socket.off('directMessage/newDirectMessage');
    };
  }, []);
  return null;
}
