import { IAuthorObject } from "../types/Author";

export const fetchAuthorsObject = async (): Promise<IAuthorObject> => {
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
