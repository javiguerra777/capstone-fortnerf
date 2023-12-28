import React, { useState, useEffect } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [editMessageDetails, setEditMessageDetails] = useState({
    message: '',
    messageId: '',
  });
  const editMessage = (message: string, messageId: string) => {
    setIsEditing(true);
    setEditMessageDetails({
      message,
      messageId,
    });
  };
  const clearEditMessage = () => {
    setIsEditing(false);
    setEditMessageDetails({ message: '', messageId: '' });
  };
  useEffect(() => {
    setIsEditing(false);
    setEditMessageDetails({ message: '', messageId: '' });
  }, [activeRoomId]);
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
          <DirectMessageDetails
            key={message._id}
            message={message}
            editMessage={editMessage}
          />
        ))}
      </div>
      <SendDirectMessageToRoom
        activeRoomId={activeRoomId}
        users={data.roomDetails.users}
        isEditing={isEditing}
        editMessageDetails={editMessageDetails}
        clearEditMessage={clearEditMessage}
      />
    </div>
  );
}
