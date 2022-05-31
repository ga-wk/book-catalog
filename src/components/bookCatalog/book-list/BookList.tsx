import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";
import BookGroup from "../book-group/BookGroup";

import cl from "./bookList.module.css";

interface BookListProps {}

const BookList: FunctionComponent<BookListProps> = () => {
  const book = useAppSelector((state) => state.book);
  const author = useAppSelector((state) => state.author);
  const filter = useAppSelector((state) => state.filter);

  const isLoadingBookAndAauthor = book.isLoading && author.isLoading;
  const isErrorBookOrAauthor = book.error || author.error;

  return !isLoadingBookAndAauthor ? (
    <h1>Загрузка</h1>
  ) : isErrorBookOrAauthor ? (
    <h1>{isErrorBookOrAauthor}</h1>
  ) : (
    <div>
      {filter.sortedBooks.keys.map((key) => {
        const booksGroup = filter.sortedBooks.groups[key];
        return (
          <BookGroup key={key} authors={author.authors} books={booksGroup} />
        );
      })}
    </div>
  );
};

export default BookList;
