import { IBaseBook } from "../../types/Book";

const errorText = {
  ENTER_AUTHOR: "Пожалуйсто введите автора",
  ENTER_FIRST_NAME_AND_LAST_NAME_AUTHOR:
    "Пожалуйсто введите имя и фамилю автора(через пробел)",
  TITLE_MUST_BE: "Название должно быть",
  MAXIMUM_100_CHAR: "Не более 100 символов",
  BOOK_MUST_CONTAIN_ONE_AUTHOR: "Книга должна содержать хотя бы одного автора",
  PUBLISHED_BEFORE_1800: "Книга должна быть изданна раньше 1800 года",
  PUBLISHED_BEFORE_THIS_YEAR: "Книга должна быть издана раньше текущего года",
  INCORRECT_ISBN: "Не корректный ISBN",
};

export const isValidName = (authorName: string) => {
  if (authorName === "") {
    return { isValid: false, error: errorText.ENTER_AUTHOR };
  }
  if (authorName.split(" ").length !== 2) {
    return {
      isValid: false,
      error: errorText.ENTER_FIRST_NAME_AND_LAST_NAME_AUTHOR,
    };
  }
  return { isValid: true, error: "" };
};

export const isValidForm = (book: IBaseBook, authors: string[]) => {
  if (book.title.length < 1) {
    return { isValid: false, error: errorText.TITLE_MUST_BE };
  }
  if (book.title.length > 100) {
    return { isValid: false, error: errorText.MAXIMUM_100_CHAR };
  }

  if (authors.length < 1) {
    return { isValid: false, error: errorText.BOOK_MUST_CONTAIN_ONE_AUTHOR };
  }

  if (book.publicationYear && book.publicationYear < 1800) {
    return { isValid: false, error: errorText.PUBLISHED_BEFORE_1800 };
  }

  if (book.publicationYear && book.publicationYear > new Date().getFullYear()) {
    return { isValid: false, error: errorText.PUBLISHED_BEFORE_THIS_YEAR };
  }

  const ISBNregex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/g;

  if (book.ISBN && !ISBNregex.test(book.ISBN)) {
    return { isValid: false, error: errorText.INCORRECT_ISBN };
  }

  return { isValid: true, error: "" };
};
