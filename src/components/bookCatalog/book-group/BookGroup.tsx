import React, { FunctionComponent } from "react";
import { IAuthor } from "../../../types/Author";
import { IBook } from "../../../types/Book";
import BookCard from "../book-card/BookCard";

import cl from "./bookGroup.module.css";

interface BookGroupProps {
  books: IBook[];
}

const BookGroup: FunctionComponent<BookGroupProps> = ({ books }) => {
  return (
    <div>
      <h2>{books[0].publicationYear ?? "Книги без указания года"}</h2>
      <ul className={cl.list}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </ul>
    </div>
  );
};

export default BookGroup;
