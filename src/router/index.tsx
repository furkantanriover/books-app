import { BookDetail, Cart, Home } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/book/:id" element={<BookDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default AppRouter;
