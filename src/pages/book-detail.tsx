import React, { FC, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import useFetchBookById from "hooks/useFetchBookById";
import { useBasketStore } from "store/basket-store";
import { useTranslation } from "react-i18next";
import { cleanHtml } from "util/format-desc";
import { toast } from "react-toastify";

export const BookDetail: FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();
  const { data: book, isLoading, error } = useFetchBookById(slug);
  const addItem = useBasketStore((state) => state.addItem);
  const incrementQuantity = useBasketStore((state) => state.incrementQuantity);
  const basketItems = useBasketStore((state) => state.items);

  const handleAddToBasket = useCallback(() => {
    if (!book) return;
    const item = basketItems.find((item) => item.id === book.id);
    if (item) {
      incrementQuantity(book.id);
      toast.success(
        t("toast.quantityIncreased", { title: book.volumeInfo.title })
      );
    } else {
      addItem({
        id: book.id,
        title: book.volumeInfo.title,
        authors: book.volumeInfo.authors || [],
        smallThumbnail: book.volumeInfo.imageLinks.smallThumbnail,
        price: book.saleInfo.listPrice?.amount || 0,
      });
      toast.success(t("toast.addedToBasket", { title: book.volumeInfo.title }));
    }
  }, [book, addItem, incrementQuantity, basketItems, t]);

  const getQuantity = useCallback(
    (bookId: string) => {
      const item = basketItems.find((item) => item.id === bookId);
      return item ? item.quantity : 0;
    },
    [basketItems]
  );

  const bookQuantity = useMemo(
    () => getQuantity(book?.id || ""),
    [book, getQuantity]
  );

  if (isLoading) {
    return (
      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-60 h-60 bg-gray-300 rounded-lg shadow-lg mb-8 lg:mb-0 animate-pulse"></div>
          <div className="lg:ml-8 w-full space-y-4">
            <div className="w-3/5 h-9 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-2/5 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-1/3 h-6 bg-gray-300 rounded animate-pulse"></div>
            <div className="h-18 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-1/5 h-11 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{t("error.fetchingBooks")}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col lg:flex-row items-center">
        <img
          src={book.volumeInfo.imageLinks.thumbnail}
          alt={book.volumeInfo.title}
          className="w-60 h-60 object-cover rounded-lg shadow-lg mb-8 lg:mb-0"
        />
        <div className="lg:ml-8">
          <h1 className="text-3xl font-bold mb-4">{book.volumeInfo.title}</h1>
          <p className="text-lg mb-4">
            {book.volumeInfo.authors?.join(", ") || t("unknown-author")}
          </p>
          <p className="text-lg mb-4">
            {t("price")}:{" "}
            {book.saleInfo.listPrice?.amount || t("not-available")}
          </p>
          <p className="text-base mb-8 text-gray-500">
            {cleanHtml(book.volumeInfo.description)}
          </p>
          <div className="flex items-center mt-2">
            <button
              onClick={handleAddToBasket}
              className="flex items-center px-4 py-2 bg-[var(--color-primary)] text-white rounded mr-4"
            >
              {t("add-to-basket")}
              <span className="ml-2 text-white px-2 py-1 rounded">
                {bookQuantity}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
