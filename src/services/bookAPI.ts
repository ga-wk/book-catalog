import { IBaseBook, IBook, IBookGetResponseObject } from "../types/Book";

/**
 * Запрос на получение всех книг
 * @returns книги
 */
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

/**
 * Запрос на сохранение книги
 * @param book книга
 * @returns id книги
 */
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

/**
 * Запрос на удаление книги
 * @param book книга
 * @returns null
 */
export const fetchDeleteBook = async (book: IBook): Promise<{ id: string }> => {
  const URL_FETCH_DELETE_BOOK = `https://book-catalog-api-default-rtdb.firebaseio.com/books/${book.id}.json`;

  try {
    const response = await fetch(URL_FETCH_DELETE_BOOK, {
      method: "DELETE",
    });
    const bookObj = await response.json();

    return bookObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

/**
 * Запрос на изменение книги
 * @param book книга
 * @param id id книги
 * @returns id книги
 */
export const fetchPutBook = async (
  book: IBaseBook,
  id: string
): Promise<{ id: string }> => {
  const URL_FETCH_PUT_BOOK = `https://book-catalog-api-default-rtdb.firebaseio.com/books/${id}.json`;

  try {
    const response = await fetch(URL_FETCH_PUT_BOOK, {
      method: "PUT",
      body: JSON.stringify(book),
    });
    const bookObj = await response.json();

    return bookObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
