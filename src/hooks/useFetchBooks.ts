import { useQuery } from "@tanstack/react-query";
import { searchBooks } from "api/client";

interface Book {
  id: string;
  title: string;
  thumbnail: string;
  smallThumbnail: string;
  authors: string[];
  infoLink: string;
  saleInfo: {
    buyLink: string;
    country: string;
    listPrice: {
      amount: number;
      currencyCode: string;
    };
    retailPrice: {
      amount: number;
      currencyCode: string;
    };
  };
}

const useFetchBooks = (query: string, startIndex: number) => {
  const fetchBooks = async () => {
    const items = await searchBooks(query || "javascript", startIndex);
    return items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors,
      infoLink: item.volumeInfo.infoLink,
      saleInfo: item.saleInfo,
      smallThumbnail:
        item.volumeInfo.imageLinks?.smallThumbnail ||
        "https://via.placeholder.com/100",
      thumbnail:
        item.volumeInfo.imageLinks?.thumbnail ||
        "https://via.placeholder.com/150",
    }));
  };

  return useQuery<Book[], Error>({
    queryKey: ["books", query, startIndex],
    queryFn: fetchBooks,
    enabled: !!query,
  });
};

export default useFetchBooks;
