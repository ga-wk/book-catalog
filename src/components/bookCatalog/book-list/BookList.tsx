import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";
import BookGroup from "../book-group/BookGroup";

import cl from "./bookList.module.css";

interface BookListProps {}

const BookList: FunctionComponent<BookListProps> = () => {
  const { sortedBooks } = useAppSelector((state) => state.filter);

  return (
    <div className={cl.scrollList}>
      {sortedBooks.keys.map((key) => {
        const booksGroup = sortedBooks.groups[key];
        return <BookGroup key={key} books={booksGroup} />;
      })}
    </div>
  );
};

export default BookList;
