import discount_1 from "assets/images/discount-1.png";
import discount_3 from "assets/images/discount-3.png";
import Carousel from "components/Carousel/index";
import useFetchBooks from "hooks/useFetchBooks";
import { FC, useCallback, useEffect, useState } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useBasketStore } from "store/basket-store";
import { useSearchStore } from "store/search-store";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const TOTAL_PAGES = 5;

export const Home: FC = () => {
  const [page, setPage] = useState<number>(0);
  const { t } = useTranslation();
  const searchQuery = useSearchStore((state) => state.searchQuery);
  const addItem = useBasketStore((state) => state.addItem);
  const incrementQuantity = useBasketStore((state) => state.incrementQuantity);
  const decrementQuantity = useBasketStore((state) => state.decrementQuantity);
  const removeItem = useBasketStore((state) => state.removeItem);
  const basketItems = useBasketStore((state) => state.items);
  const navigate = useNavigate();

  const {
    data: books,
    error,
    isLoading,
    isFetching,
  } = useFetchBooks(searchQuery, page * 10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const carouselData = [
    { id: "1", smallThumbnail: discount_1 },
    { id: "2", smallThumbnail: discount_3 },
    { id: "3", smallThumbnail: discount_1 },
    { id: "4", smallThumbnail: discount_3 },
    { id: "5", smallThumbnail: discount_1 },
  ];

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
        toast.info(t("toast.quantityIncreased", { title: book.title }));
      } else {
        addItem({
          id: book.id,
          title: book.title,
          authors: book.authors || [],
          smallThumbnail: book.smallThumbnail,
          price: book.saleInfo.listPrice?.amount || 0,
        });
        toast.success(t("toast.addedToBasket", { title: book.title }));
      }
    },
    [addItem, incrementQuantity, basketItems, t]
  );

  const handleRemoveFromBasket = useCallback(
    (book: any) => {
      const item = basketItems.find((item) => item.id === book.id);
      if (item && item.quantity > 1) {
        decrementQuantity(book.id);
        toast.info(t("toast.quantityDecreased", { title: book.title }));
      } else {
        removeItem(book.id);
        toast.error(t("toast.removedFromBasket", { title: book.title }));
      }
    },
    [decrementQuantity, removeItem, basketItems, t]
  );

  const getQuantity = useCallback(
    (bookId: string) => {
      const item = basketItems.find((item) => item.id === bookId);
      return item ? item.quantity : 0;
    },
    [basketItems]
  );

  const handleBookClick = (slug: string) => {
    navigate(`/book/${slug}`);
  };

  if (error)
    return (
      <div>
        {t("error.fetchingBooks")}: {error.message}
      </div>
    );

  return (
    <div>
      <h1 className="text-[28px] lg:mt-8 sm:mt-0 font-bold">
        {t("home.featuredAdvantages")}
      </h1>
      <Carousel data={carouselData} />
      <div className="flex flex-col mt-28 ">
        <h1 className="text-[28px] font-bold mb-8">
          {t("home.featuredBooks")}
        </h1>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 ">
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
                <motion.div
                  key={book.id}
                  className="flex flex-col h-96 items-center justify-between mb-4 p-4 bg-[var(--color-secondary)] rounded-lg shadow-md cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleBookClick(book.id)}
                >
                  <img
                    src={book.smallThumbnail}
                    alt={book.title}
                    className="w-60 h-60 object-cover rounded-md"
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
                  <div className="flex items-center mt-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFromBasket(book);
                      }}
                      className="px-2 py-1 bg-[var(--color-primary)] text-white rounded"
                      disabled={getQuantity(book.id) === 0}
                    >
                      -
                    </button>
                    <span className="mx-2">{getQuantity(book.id)}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToBasket(book);
                      }}
                      className="px-2 py-1 bg-[var(--color-primary)] text-white rounded"
                    >
                      +
                    </button>
                  </div>
                </motion.div>
              ))}
        </div>
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
