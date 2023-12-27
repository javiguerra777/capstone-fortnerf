import React from 'react';
import { useSearchParams } from 'react-router-dom';

export default function MesageRoom() {
  const [searchParams] = useSearchParams();
  const activeRoomId = searchParams.get('activeRoomId') || '';
  return (
    <div className="h-full flex-1">
      {activeRoomId ? (
        <p>Message Room: {activeRoomId}</p>
      ) : (
        <p>No room Selected</p>
      )}
    </div>
  );
}
