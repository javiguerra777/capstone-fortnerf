import React from 'react';
import { useSearchParams } from 'react-router-dom';
import UseGetUserFromStore from '../../../common/hooks/UseGetUserFromStore.hook';

type User = {
  _id: string;
  name: string;
  profilePicture: string;
};
type Item = {
  roomId: {
    users: User[];
  };
  message: string;
};
type Props = {
  roomId: string;
  item: Item[];
  // eslint-disable-next-line no-unused-vars
  handleRoomClick: (id: string) => void;
};
export default function MessageDetails({
  roomId,
  item,
  handleRoomClick,
}: Props) {
  const [searchParams] = useSearchParams();
  const activeRoomId = searchParams.get('activeRoomId') || '';
  const { id } = UseGetUserFromStore();
  const otherUsers = item[0].roomId.users.filter(
    (user) => user._id !== id,
  );
  return (
    <div
      role="button"
      aria-label="button"
      tabIndex={0}
      onKeyDown={() => null}
      key={roomId}
      onClick={() => handleRoomClick(roomId)}
      className={`bg-white rounded-md px-1 py-2 my-1 hover:bg-neutral-400 cursor-pointer w-full flex flex-row ${
        roomId === activeRoomId && 'bg-zinc-200'
      }`}
    >
      <div
        className={`w-1 ${roomId === activeRoomId && 'bg-blue-500'}`}
      />
      <div className="ml-1">
        <img
          src={`${
            otherUsers.length === 1 && otherUsers[0].profilePicture
          }`}
          alt="profile-pic"
          className="w-14 h-14 rounded-full shadow-lg"
        />
      </div>
      <div className="flex flex-col ml-2">
        <p className="text-lg">
          {otherUsers.map((user) => user.name)}
        </p>
        <p className="text-md">{item[0].message}</p>
      </div>
    </div>
  );
}
