import React from 'react';
import { useGetDirectMessagesByRoomIdQuery } from '../../../../common/api/DirectMessagesApi.js';
import DirectMessageRoomHeader from './DirectMessageRoomHeader';
import SendDirectMessageToRoom from './SendDirectMessageToRoom';

type Props = {
  activeRoomId: string;
};

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
      <SendDirectMessageToRoom
        activeRoomId={activeRoomId}
        users={data.roomDetails.users}
      />
    </div>
  );
}
