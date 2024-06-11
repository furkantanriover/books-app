import BaseLayout from "layouts/BaseLayout";
import { BookDetail, Cart, Home } from "pages";
import React from "react";
import { Route, Routes } from "react-router-dom";

const AppRouter: React.FC = () => {
  return (
    <BaseLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/book-detail" element={<BookDetail />} />
      </Routes>
    </BaseLayout>
  );
};

export default AppRouter;
