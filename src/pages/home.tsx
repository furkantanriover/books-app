import React, { useState, useEffect } from "react";
import Carousel from "components/Carousel/index";
import useFetchBooks from "hooks/useFetchBooks";
import { FC } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import book_1 from "assets/images/book-1.png";
import book_2 from "assets/images/book-2.png";
import discount_1 from "assets/images/discount-1.png";
import discount_2 from "assets/images/discount-2.png";
import discount_3 from "assets/images/discount-3.png";
import { useSearchStore } from "store/search-store";

const TOTAL_PAGES = 5; // Assuming you know the total number of pages

export const Home: FC = () => {
  const [page, setPage] = useState(0);
  const searchQuery = useSearchStore((state) => state.searchQuery);
  console.log("searchQuery", searchQuery);
  const {
    data: books,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useFetchBooks(searchQuery, page * 10);

  useEffect(() => {
    window.scrollTo(0, 500);
  }, [page]);

  const carouselData = [
    { id: "1", smallThumbnail: book_1 },
    { id: "2", smallThumbnail: book_2 },
    { id: "3", smallThumbnail: discount_1 },
    { id: "4", smallThumbnail: discount_2 },
    { id: "5", smallThumbnail: discount_3 },
  ];

  const handlePreviousPage = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, TOTAL_PAGES - 1));
  };

  const handlePageClick = (pageNumber: number) => {
    setPage(pageNumber);
  };

  if (error) return <div>Error fetching books: {error.message}</div>;

  return (
    <div>
      <Carousel data={carouselData} />
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
                <img
                  src={book.smallThumbnail}
                  alt={book.title}
                  className="w-60 h-60 object-fill"
                />
                <div>
                  <h2 className="mt-2 text-center">
                    {book.title.trim().substring(0, 30) + "..."}
                  </h2>
                  {book.authors && (
                    <p className="text-sm text-gray-600 text-center">
                      {book.authors.join(", ")}
                    </p>
                  )}
                </div>
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center mt-12 pb-12">
        <button
          onClick={handlePreviousPage}
          disabled={page === 0}
          className="bg-[var(--color-primary)]  text-white px-4 py-2 rounded disabled:opacity-50"
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
