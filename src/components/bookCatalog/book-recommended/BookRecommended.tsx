import React, { FunctionComponent, useMemo } from "react";
import { HTMLText } from "../../../constants/bookRecommended";
import { useAppSelector } from "../../../hooks/redux";
import { getRandomNumber } from "../../../utils";
import BookCard from "../book-card/BookCard";

import cl from "./bookRecommended.module.css";

interface BookRecommendedProps {}

const BookRecommended: FunctionComponent<BookRecommendedProps> = () => {
  const { books } = useAppSelector((state) => state.book);

  // Самый высогий рейтинг книги
  const highRating = useMemo(() => {
    return books.reduce((acc, curr) => {
      if (curr.rating) {
        return curr.rating > acc ? curr.rating : acc;
      }
      return acc;
    }, 0);
  }, [books]);

  // Рекомендованная книга
  const recommendedBook = useMemo(() => {
    const allNewAndHighRatingBooks = books.filter((book) => {
      const todayYear = new Date().getFullYear();
      const bookPublicationYear = book.publicationYear || todayYear;

      const differenceYear = todayYear - bookPublicationYear;
      const threeYears = 3;

      return differenceYear >= threeYears && book.rating === highRating;
    });

    const getRandomBook = () => {
      const countBook = allNewAndHighRatingBooks.length - 1;
      const randomIndexBook = getRandomNumber(0, countBook);
      return allNewAndHighRatingBooks[randomIndexBook];
    };

    const randomBook = getRandomBook();
    return randomBook;
  }, [books]);

  return recommendedBook ? (
    <div className={cl.bookRecommended}>
      <h2 className={cl.title}>{HTMLText.RECOMMENDED_BOOK}</h2>
      <BookCard book={recommendedBook} isRecommended={true} />
    </div>
  ) : (
    <div>{HTMLText.NO_RECOMMENDED_BOOK}</div>
  );
};

export default BookRecommended;
