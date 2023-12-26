import React from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';

export default function Messages() {
  return (
    <div className="h-full w-96 border-r-2 flex flex-col relative p-2">
      <div className="flex flex-row bg-gray-200 rounded-md items-center">
        <div className="p-1.5">
          <FaSearch size={20} />
        </div>
        <input
          type="search"
          name="search"
          id="search"
          placeholder="search messages"
          className="flex-1 bg-transparent h-10 px-2"
        />
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
