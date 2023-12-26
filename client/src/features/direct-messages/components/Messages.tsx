import React, { useState, useCallback, useEffect } from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { MessagesPlaceholder } from '../service/Messages.service';

export default function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(
    searchParams.get('search') || '',
  );
  const [activeRoomId, setActiveRoomId] = useState(
    searchParams.get('activeRoomId') || '',
  );
  useEffect(() => {
    setSearchParams({ search, activeRoomId });
  }, [search, activeRoomId]);
  const handleRoomClick = useCallback((id: string) => {
    setActiveRoomId(id);
  }, []);

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
      <div className="overflow-auto">
        {MessagesPlaceholder.map(
          ({ message, id, from, time, roomId }) => (
            <div
              key={id}
              onClick={() => handleRoomClick(roomId)}
              onKeyDown={() => null}
              aria-label="button"
              role="button"
              tabIndex={0}
              className="bg-white my-2 px-1 py-3 rounded hover:bg-neutral-300"
            >
              <div className="flex flex-row justify-between">
                <p>{from}</p>
                <p>{time}</p>
              </div>
              <p>{message}</p>
            </div>
          ),
        )}
      </div>
      <button
        type="button"
        className="bg-indigo-400 absolute bottom-2 right-2 w-12 h-12 rounded-full flex items-center justify-center"
      >
        <FaPlus size={20} color="white" />
      </button>
    </div>
  );
}
