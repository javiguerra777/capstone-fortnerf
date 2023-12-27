import React from 'react';
import { useSearchParams } from 'react-router-dom';
import DirectMessageRoomChat from './DirectMessageRoomChat';
import NoRoomMessage from './NoRoomMessage';

export default function DirectMesageRoom() {
  const [searchParams] = useSearchParams();
  const activeRoomId = searchParams.get('activeRoomId') || '';
  return (
    <div className="h-full flex-1">
      {activeRoomId ? (
        <DirectMessageRoomChat activeRoomId={activeRoomId} />
      ) : (
        <NoRoomMessage />
      )}
    </div>
  );
}
