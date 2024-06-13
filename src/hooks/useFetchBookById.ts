import { useQuery } from "@tanstack/react-query";
import { fetchBookById } from "api/client";

const useFetchBookById = (id: string | undefined) => {
  return useQuery({
    queryKey: ["book", id],
    queryFn: () => fetchBookById(id),
  });
};

export default useFetchBookById;
