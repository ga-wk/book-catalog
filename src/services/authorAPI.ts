import { IAuthor, IAuthorResponseObject } from "../types/Author";

/**
 * Запрос на получение всех авторов
 * @returns авторы
 */
export const fetchGetAuthors = async (): Promise<IAuthorResponseObject> => {
  const URL_FETCH_ALL_BOOKS =
    "https://book-catalog-api-default-rtdb.firebaseio.com/authors.json";

  try {
    const response = await fetch(URL_FETCH_ALL_BOOKS, {
      method: "GET",
    });

    const authorObj = await response.json();

    return authorObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};

/**
 * Запрос на сохранение автора
 * @param author автор
 * @returns id автора
 */
export const fetchPostAuthor = async (
  author: IAuthor
): Promise<{ id: string }> => {
  const URL_FETCH_POST_BOOK =
    "https://book-catalog-api-default-rtdb.firebaseio.com/authors.json";

  try {
    const response = await fetch(URL_FETCH_POST_BOOK, {
      method: "POST",
      body: JSON.stringify(author),
    });
    const authorObj = await response.json();

    return authorObj;
  } catch (error) {
    throw new Error("Ошибка");
  }
};
