import React from 'react';
import { useGetDirectMessagesByRoomIdQuery } from '../../../../common/api/DirectMessagesApi.js';
import DirectMessageRoomHeader from './DirectMessageRoomHeader';
import SendDirectMessageToRoom from './SendDirectMessageToRoom';
import DirectMessageDetails from './DirectMessageDetails';

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
          <DirectMessageDetails key={message._id} message={message} />
        ))}
      </div>
      <SendDirectMessageToRoom
        activeRoomId={activeRoomId}
        users={data.roomDetails.users}
      />
    </div>
  );
}
