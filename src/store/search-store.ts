import { create } from "zustand";

interface SearchState {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const useSearchStore = create<SearchState>()((set) => ({
  searchQuery: "javascript",
  setSearchQuery: (query) => set({ searchQuery: query }),
}));
