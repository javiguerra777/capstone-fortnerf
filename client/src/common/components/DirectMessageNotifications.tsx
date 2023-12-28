import { useEffect } from 'react';
import { socket } from '../service/socket';
import { useAppDispatch } from '../../store/hooks';
import DirectMessagesApi from '../api/DirectMessagesApi.js';

export default function DirectMessageNotifications() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    socket.on('directMessage/newDirectMessage', ({ data }) => {
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
  useEffect(() => {
    socket.on('directMessage/updateDirectMessage', ({ data }) => {
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessages',
          '',
          (draft) => {
            draft[data.roomId].messages = draft[
              data.roomId
            ].messages.map((message: any) =>
              message._id === data._id
                ? { ...message, message: data.message }
                : message,
            );
          },
        ),
      );
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessagesByRoomId',
          data.roomId,
          (draft) => {
            draft.messages = draft.messages.map((message: any) =>
              message._id === data._id
                ? { ...message, message: data.message }
                : message,
            );
          },
        ),
      );
    });
    return () => {
      socket.off('directMessage/updateDirectMessage');
    };
  }, []);
  useEffect(() => {
    socket.on('directMessage/deleteDirectMessage', ({ data }) => {
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessages',
          '',
          (draft) => {
            draft[data.roomId].messages = draft[
              data.roomId
            ].messages.filter(
              (item: { _id: string }) => item._id !== data._id,
            );
          },
        ),
      );
      dispatch(
        DirectMessagesApi.util.updateQueryData(
          'getDirectMessagesByRoomId',
          data.roomId,
          (draft) => {
            draft.messages = draft.messages.filter(
              (item: { _id: string }) => item._id !== data._id,
            );
          },
        ),
      );
    });
    return () => {
      socket.off('directMessage/deleteDirectMessage');
    };
  }, []);
  return null;
}
