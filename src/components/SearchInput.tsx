import React from "react";
import { FiSearch } from "react-icons/fi";
import { useSearchStore } from "store/search-store";

const SearchInput: React.FC = () => {
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const setSearchQuery = useSearchStore((state) => state.setSearchQuery);
  const triggerSearch = () => {
    console.log("Search triggered with query:", searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="flex items-center border-2 bg-white border-[var(--color-primary)] w-auto  lg:w-96 overflow-hidden">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder="kitap adı arayınız..."
        className="flex-grow py-2 px-4 text-gray-700 focus:outline-none"
        onKeyDown={handleKeyDown}
      />

      <button
        onClick={triggerSearch}
        className="flex items-center justify-center px-4 py-2 bg-[var(--color-primary)] text-white"
      >
        <FiSearch size={24} />
      </button>
    </div>
  );
};

export default SearchInput;
