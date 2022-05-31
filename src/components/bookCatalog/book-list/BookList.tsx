import React, { FunctionComponent, useEffect, useMemo } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { IBook } from "../../../types/Book";
import { groupBy } from "../../../utils";
import BookGroup from "../book-group/BookGroup";

import cl from "./bookList.module.css";

interface BookListProps {}

const BookList: FunctionComponent<BookListProps> = () => {
  const book = useAppSelector((state) => state.book);
  const author = useAppSelector((state) => state.author);

  const isLoadingBookAndAauthor = book.isLoading && author.isLoading;
  const isErrorBookOrAauthor = book.error || author.error;

  const organizeBooksIntoGroups = useMemo(() => {
    console.log("Группировка");
    const { groups, keys } = groupBy<IBook>(book.books, "publicationYear");

    
    return { groups, keys: keys };
  }, [book.books]);

  const sortedAndOrganizeBooks = useMemo(() => {
    console.log("сортировка");
    
    for (const key in organizeBooksIntoGroups.groups) {
      if (
        Object.prototype.hasOwnProperty.call(
          organizeBooksIntoGroups.groups,
          key
        )
      ) {
        const groups = organizeBooksIntoGroups.groups[key];
        groups.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

    organizeBooksIntoGroups.keys.sort((a, b) => b.localeCompare(a));
    
    return organizeBooksIntoGroups
  }, [organizeBooksIntoGroups]);

  return !isLoadingBookAndAauthor ? (
    <h1>Загрузка</h1>
  ) : isErrorBookOrAauthor ? (
    <h1>{isErrorBookOrAauthor}</h1>
  ) : (
    <div>
      {organizeBooksIntoGroups.keys.map((key) => {
        const booksGroup = sortedAndOrganizeBooks.groups[key]
        return (
         <BookGroup key={key} authors={author.authors} books={booksGroup}/>
        );
      })}
    </div>
  );
};

export default BookList;
