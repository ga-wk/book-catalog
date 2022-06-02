import React, { FunctionComponent, useMemo } from "react";
import { groupType } from "../../../constants/filter";
import { useAppSelector } from "../../../hooks/redux";
import { IBook } from "../../../types/Book";
import BookCard from "../book-card/BookCard";

import cl from "./bookGroup.module.css";

interface BookGroupProps {
  books: IBook[];
  groupTitle: string;
}

const BOOKS_WITH_NO_YEAR = "Книги без указания года";
const BOOKS_WITH_NO_RATING = "Книги без рейтинга";
const BookGroup: FunctionComponent<BookGroupProps> = ({
  books,
  groupTitle,
}) => {
  const { authors } = useAppSelector((state) => state.author);
  const { groupBy, sortDirection } = useAppSelector((state) => state.filter);

  const title = useMemo(() => {
    switch (groupBy) {
      case groupType.YEAR:
        return <h2>{groupTitle ?? BOOKS_WITH_NO_YEAR}</h2>;
      case groupType.RATING:
        return <h2>{~groupTitle ? groupTitle : BOOKS_WITH_NO_RATING}</h2>;
      case groupType.AUTHOR:
        const author = authors.find((author) => author.id === +groupTitle);
        return <h2>{`${author?.firstName} ${author?.lastName}`}</h2>;
    }
  }, [groupBy]);

  return books.length > 0 ? (
    <div className={cl.group}>
      {title}
      <ul className={cl.list}>
        {books.map((book) => (
          <BookCard key={book.id} book={book} isRecommended={false} />
        ))}
      </ul>
    </div>
  ) : null;
};

export default BookGroup;
