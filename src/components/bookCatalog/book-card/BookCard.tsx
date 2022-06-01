import React, { FunctionComponent } from "react";
import { useAppSelector } from "../../../hooks/redux";
import { IBook } from "../../../types/Book";

import cl from "./bookCard.module.css";

export interface BookCardProps {
  book: IBook;
}

const BookCard: FunctionComponent<BookCardProps> = ({ book }) => {
  const { authors } = useAppSelector((state) => state.author);
  
  return (
    <li className={cl.card}>
      <p>Название: {book.title}</p>
      <p>
        Авторы:
        {book.authors
          .map((a) => {
            const currentAuthor = authors.find((aa) => aa.id === a);
            const firstName = currentAuthor?.firstName;
            const lastName = currentAuthor?.lastName;
            return `${firstName} ${lastName}`;
          })
          .join(", ")}
      </p>
      {book?.publicationYear && <p>Год публикации: {book?.publicationYear}</p>}
      {book?.rating && <p>Рейтинг: {book?.rating}</p>}
      {book?.ISBN && <p>ISBN: {book?.ISBN}</p>}
    </li>
  );
};

export default BookCard;
