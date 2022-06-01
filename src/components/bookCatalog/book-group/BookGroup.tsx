import React, { FunctionComponent } from "react";
import { IBook } from "../../../types/Book";
import BookCard from "../book-card/BookCard";

import cl from "./bookGroup.module.css";

interface BookGroupProps {
  books: IBook[];
}

const BOOKS_WITH_NO_YEAR = "Книги без указания года"

const BookGroup: FunctionComponent<BookGroupProps> = ({ books }) => {
  return (
    <div>
      <h2>{books[0].publicationYear ?? BOOKS_WITH_NO_YEAR}</h2>
      <ul className={cl.list}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookGroup;
