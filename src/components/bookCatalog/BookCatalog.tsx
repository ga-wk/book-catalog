import React, { FunctionComponent } from "react";
import BookList from "./book-list/BookList";

const BookCatalog: FunctionComponent = () => {
  return (
    <article>
      <BookList />
    </article>
  );
};

export default BookCatalog;
