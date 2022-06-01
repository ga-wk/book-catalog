import { IBaseBook, IBook, IBookGetResponseObject } from "../types/Book";

export const fetchGetBooksObject =
  async (): Promise<IBookGetResponseObject> => {
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
// {
//   "name": "-N3TfWWJUrQ3wsVvte9d"
// }
export const fetchPostBook = async (
  book: IBaseBook
): Promise<{ id: string }> => {
  const URL_FETCH_POST_BOOK =
    "https://book-catalog-api-default-rtdb.firebaseio.com/books.json";

  try {
    const response = await fetch(URL_FETCH_POST_BOOK, {
      method: "POST",
      body: JSON.stringify(book),
    });
    const bookObj = await response.json();

    return bookObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

export const fetchDeleteBook = async (
  book: IBook
): Promise<{ id: string }> => {
  const URL_FETCH_DELETE_BOOK =
  `https://book-catalog-api-default-rtdb.firebaseio.com/books/${book.id}.json`;

  try {
    const response = await fetch(URL_FETCH_DELETE_BOOK, {
      method: "DELETE"
    });
    const bookObj = await response.json();

    return bookObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
