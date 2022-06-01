import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../hooks/redux";
import BookAdd from "./book-add/BookAdd";
import BookFilter from "./book-filter/BookFilter";
import BookList from "./book-list/BookList";
import BookRecommended from "./book-recommended/BookRecommended";

export const HTMLText = {
  LOADING: "Загрузка",
};

const BookCatalog: FunctionComponent = () => {
  const book = useAppSelector((state) => state.book);
  const author = useAppSelector((state) => state.author);

  const isLoadingBookAndAauthor = book.isLoading && author.isLoading;
  const isErrorBookOrAauthor = book.error || author.error;

  return !isLoadingBookAndAauthor ? (
    <h1>{HTMLText.LOADING}</h1>
  ) : isErrorBookOrAauthor ? (
    <h1>{isErrorBookOrAauthor}</h1>
  ) : (
    <article>
      <BookAdd />
      <BookFilter />
      <BookRecommended />
      <BookList />
    </article>
  );
};

export default BookCatalog;
