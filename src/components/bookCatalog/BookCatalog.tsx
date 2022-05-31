import React, { FunctionComponent } from "react";
import BookFilter from "./book-filter/BookFilter";
import BookList from "./book-list/BookList";

const BookCatalog: FunctionComponent = () => {
  return (
    <article>
      <BookFilter/>
      <BookList />
    </article>
  );
};

export default BookCatalog;
