import React from 'react';
import UseGetUserFromStore from '../../../../common/hooks/UseGetUserFromStore.hook';
import { DirectMessageUser } from '../../model/DirectMessageUser.model';

type Props = {
  users: DirectMessageUser[];
};
export default function DirectMessageRoomHeader({ users }: Props) {
  const { id } = UseGetUserFromStore();
  const otherUsers = users.filter((user) => user._id !== id);
  return (
    <div>
      <p className="text-center text-lg font-semibold">
        {otherUsers.map((user) => user.name)}
      </p>
    </div>
  );
}
