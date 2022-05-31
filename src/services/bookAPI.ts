import { IBookResponseObject } from "../types/Book";

export const fetchBooksObject = async (): Promise<IBookResponseObject> => {
  const URL_FETCH_ALL_BOOKS =
    "https://book-catalog-api-default-rtdb.firebaseio.com/books.json";

  try {
    const response = await fetch(URL_FETCH_ALL_BOOKS, {
      method: "GET",
    });
    const booksObj = await response.json();

    return booksObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
