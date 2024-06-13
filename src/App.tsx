import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRouter from "./router";
import { useSettingsStore } from "./store/settings-store";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

const App: React.FC = () => {
  const isDarkMode = useSettingsStore((state) => state.isDarkMode);

  return (
    <QueryClientProvider client={queryClient}>
      <div
        className={isDarkMode ? "dark" : ""}
        style={{
          backgroundColor: `var(--color-background)`,
          color: `var(--color-text)`,
        }}
      >
        <Router>
          <AppRouter />
        </Router>
        <ToastContainer />
      </div>
    </QueryClientProvider>
  );
};

export default App;
