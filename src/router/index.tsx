import BaseLayout from "layouts/BaseLayout";
import { BookDetail, Cart, Home, Search } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book/:slug" element={<BookDetail />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BaseLayout>
  );
};

export default AppRouter;
