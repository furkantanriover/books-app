import useFetchBooks from "hooks/useFetchBooks";
import { FC, useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSearchParams, Link } from "react-router-dom";
import { useBasketStore } from "store/basket-store";

const TOTAL_PAGES = 5;

export const Search: FC = () => {
  const { t } = useTranslation();
  const [page, setPage] = useState<number>(0);
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("q") || "";

  const addItem = useBasketStore((state) => state.addItem);
  const incrementQuantity = useBasketStore((state) => state.incrementQuantity);
  const decrementQuantity = useBasketStore((state) => state.decrementQuantity);
  const basketItems = useBasketStore((state) => state.items);

  const {
    data: books,
    error,
    isLoading,
    isFetching,
  } = useFetchBooks(searchQuery, page * 10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const handlePreviousPage = useCallback(() => {
    setPage((prev) => Math.max(prev - 1, 0));
  }, []);

  const handleNextPage = useCallback(() => {
    setPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1));
  }, []);

  const handlePageClick = useCallback((pageNumber: number) => {
    setPage(pageNumber);
  }, []);

  const handleAddToBasket = useCallback(
    (book: any) => {
      const item = basketItems.find((item) => item.id === book.id);
      if (item) {
        incrementQuantity(book.id);
      } else {
        addItem({
          id: book.id,
          title: book.title,
          authors: book.authors || [],
          smallThumbnail: book.smallThumbnail,
          price: book.saleInfo.listPrice?.amount || 0,
        });
      }
    },
    [addItem, incrementQuantity, basketItems]
  );

  const getQuantity = useCallback(
    (bookId: string) => {
      const item = basketItems.find((item) => item.id === bookId);
      return item ? item.quantity : 0;
    },
    [basketItems]
  );

  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">
        {t("search.search-result-for")}:{" "}
        <span className="font-bold">{searchQuery}</span>
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-5 mt-36">
        {isLoading || isFetching
          ? Array.from({ length: 10 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col h-76 items-center justify-between mb-4"
              >
                <Skeleton width={240} height={240} />
                <div className="mt-2">
                  <Skeleton width={180} height={20} />
                  <Skeleton width={120} height={15} />
                </div>
              </div>
            ))
          : books?.map((book: any) => (
              <div
                key={book.id}
                className="flex flex-col h-76 items-center justify-between mb-4"
              >
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.smallThumbnail}
                    alt={book.title}
                    className="w-60 h-60 object-fill"
                  />
                </Link>
                <div>
                  <Link to={`/book/${book.id}`}>
                    <h2 className="mt-2 text-center">
                      {book.title.trim().substring(0, 30) + "..."}
                    </h2>
                  </Link>
                  {book.authors && (
                    <p className="text-sm text-gray-600 text-center">
                      {book.authors.join(", ")}
                    </p>
                  )}
                </div>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => decrementQuantity(book.id)}
                    className="px-2 py-1 bg-[var(--color-primary)] text-white rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{getQuantity(book.id)}</span>
                  <button
                    onClick={() => handleAddToBasket(book)}
                    className="px-2 py-1 bg-[var(--color-primary)] text-white rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-12 pb-12">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <FiArrowLeft size={24} />
        </button>
        <div className="flex space-x-2 mx-4">
          {Array.from({ length: TOTAL_PAGES }, (_, index) => (
            <button
              key={index}
              onClick={() => handlePageClick(index)}
              className={`px-4 py-2 rounded ${
                index === page
                  ? "bg-[var(--color-primary)] text-white"
                  : "bg-gray-500 text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
        <button
          onClick={handleNextPage}
          disabled={page === TOTAL_PAGES - 1}
          className="bg-[var(--color-primary)] text-white px-4 py-2 rounded disabled:opacity-50"
        >
          <FiArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};
