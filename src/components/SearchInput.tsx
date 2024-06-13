import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SearchInput: React.FC = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const triggerSearch = () => {
    navigate(`/search?q=${searchQuery}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      triggerSearch();
    }
  };

  return (
    <div className="flex items-center border-2 bg-white border-[var(--color-primary)] w-auto lg:w-96 overflow-hidden">
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        type="text"
        placeholder={t("search.search-book")}
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
