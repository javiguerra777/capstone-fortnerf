import React from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdSend } from 'react-icons/md';
import { useGetDirectMessagesByRoomIdQuery } from '../../../common/api/DirectMessagesApi.js';
import UseGetUserFromStore from '../../../common/hooks/UseGetUserFromStore.hook';

type Props = {
  activeRoomId: string;
};
type User = {
  _id: string;
  name: string;
  profilePicture: string;
};
type DirectMessageRoomHeaderProps = {
  users: User[];
};
function DirectMessageRoomHeader({
  users,
}: DirectMessageRoomHeaderProps) {
  const { id } = UseGetUserFromStore();
  const otherUsers = users.filter((user) => user._id !== id);
  return (
    <div>
      <p className="text-center text-lg font-semibold">
        {otherUsers.map((user: any) => user.name)}
      </p>
    </div>
  );
}
export default function DirectMessageRoomChat({
  activeRoomId,
}: Props) {
  const { data, isLoading, error } =
    useGetDirectMessagesByRoomIdQuery(activeRoomId);
  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error loading data, refetch data.</p>;
  }
  return (
    <div className="w-full h-full flex flex-col">
      <DirectMessageRoomHeader users={data.roomDetails.users} />
      <div className="overflow-auto flex-1">
        {data.messages.map((message: any) => (
          <div
            key={message._id}
            className="flex flex-row py-2 hover:bg-neutral-300"
          >
            <div>
              <img
                src={message.sender.profilePicture}
                alt="profile-pic"
                className="w-14 h-14 rounded-full shadow-lg ml-1"
              />
            </div>
            <div className="flex flex-col ml-2">
              <p className="text-lg font-medium">
                {message.sender.name}
              </p>
              <p className="text-md">{message.message}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="h-14 bg-gray-200 px-3 py-1 w-full">
        <form className="h-full flex flex-row items-center bg-white rounded-lg border border-gray-400 shadow-lg">
          <button
            type="button"
            className="bg-stone-600 p-2 rounded-full ml-2"
          >
            <FaPlus color="white" size={20} />
          </button>
          <input
            type="text"
            placeholder="Send Message"
            className="h-full flex-1 ml-2 p-1"
          />
          <button
            type="submit"
            className="bg-green-400 h-full w-12 rounded-r-lg flex items-center justify-center"
          >
            <MdSend size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
