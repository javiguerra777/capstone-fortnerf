import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useDeleteDirectMessageMutation } from '../../../../common/api/DirectMessagesApi.js';

type Props = {
  message: any;
};
export default function DirectMessageDetails({ message }: Props) {
  const [isHovering, setIsHovering] = useState(false);
  const [deleteDirectMessage] = useDeleteDirectMessageMutation();
  const deleteMessage = async () => {
    try {
      deleteDirectMessage({
        id: message._id,
        roomId: message.roomId,
      }).unwrap();
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  };
  return (
    <div
      className="flex flex-row py-2 hover:bg-neutral-300 relative"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div>
        <img
          src={message.sender.profilePicture}
          alt="profile-pic"
          className="w-14 h-14 rounded-full shadow-lg ml-1"
        />
      </div>
      <div className="flex flex-col ml-2 flex-1 px-2">
        <p className="text-lg font-medium">{message.sender.name}</p>
        <p className="text-md break-all word-wrap">
          {message.message}
        </p>
      </div>
      {isHovering && (
        <div className="absolute top-0 right-0">
          <button type="button" onClick={deleteMessage}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}
