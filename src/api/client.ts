import axios from "axios";

const API_URL = "https://www.googleapis.com/books/v1/volumes";

const apiKey = process.env.REACT_APP_GOOGLE_BOOKS_API_KEY;

const axiosInstance = axios.create({
  baseURL: API_URL,
  params: {
    key: apiKey,
  },
});

export const searchBooks = async (query: string, startIndex: number) => {
  try {
    const response = await axiosInstance.get("", {
      params: {
        q: query,
        startIndex,
        maxResults: 10,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const fetchBookById = async (id: string | undefined) => {
  try {
    const response = await axiosInstance.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book by id:", error);
    throw error;
  }
};
