import React, { useState, useCallback, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { useGetDirectMessagesQuery } from '../../../common/api/DirectMessagesApi.js';
import MessageDetails from './MessageDetails';

type DirectMessageData = [string, any[]];
export default function Messages() {
  const { data, isLoading, error } = useGetDirectMessagesQuery('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search') || '',
  );
  const [activeRoomId, setActiveRoomId] = useState(
    searchParams.get('activeRoomId') || '',
  );
  const handleActiveRoom = useCallback(() => {
    if (!isLoading && !error && data !== undefined) {
      const [firstRoomId] = Object.keys(data);
      setActiveRoomId(firstRoomId);
    }
  }, [data, error, isLoading]);
  useEffect(() => {
    setSearchParams({ search, activeRoomId });
  }, [search, activeRoomId]);
  useEffect(() => {
    handleActiveRoom();
  }, [handleActiveRoom]);
  const handleRoomClick = useCallback((id: string) => {
    setActiveRoomId(id);
  }, []);
  const renderDirectMessages = () => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>Error fetching data refetch here</div>;
    }
    return (
      <div className="overflow-auto">
        {(Object.entries(data) as DirectMessageData[]).map(
          ([roomId, item]) => (
            <MessageDetails
              key={roomId}
              roomId={roomId}
              item={item}
              handleRoomClick={handleRoomClick}
            />
          ),
        )}
      </div>
    );
  };

  return (
    <div className="h-full w-96 bg-zinc-300 border-r-2 flex flex-col relative p-2">
      <div className="flex flex-row bg-gray-100 rounded-md items-center">
        <div className="p-1.5">
          <FaSearch size={20} />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search messages"
          className="flex-1 bg-transparent h-10 px-2"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      {renderDirectMessages()}
      <button
        type="button"
        className="bg-indigo-400 absolute bottom-2 right-2 w-12 h-12 rounded-full flex items-center justify-center hover:bg-indigo-600"
      >
        <FaPlus size={20} color="white" />
      </button>
    </div>
  );
}
