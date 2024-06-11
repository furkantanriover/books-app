import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SettingsState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: "settings",
    }
  )
);
