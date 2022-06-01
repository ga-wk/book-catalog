import React, { FunctionComponent, useMemo } from "react";
import { HTMLText } from "../../../constants/bookRecommended";
import { useAppSelector } from "../../../hooks/redux";
import { getRandomNumber } from "../../../utils";
import BookCard from "../book-card/BookCard";

interface BookRecommendedProps {}

const BookRecommended: FunctionComponent<BookRecommendedProps> = () => {
  const { books } = useAppSelector((state) => state.book);

  const getHighRating = useMemo(() => {
    return books.reduce((acc, curr) => {
      if (curr.rating) {
        return curr.rating > acc ? curr.rating : acc;
      }
      return acc;
    }, 0);
  }, [books]);

  const getRecommendedBook = useMemo(() => {
    const allNewAndHighRatingBooks = books.filter((book) => {
      const todayYear = new Date().getFullYear();
      const bookPublicationYear = book.publicationYear || todayYear;

      const differenceYear = todayYear - bookPublicationYear;
      const threeYears = 3;

      return differenceYear >= threeYears && book.rating === getHighRating;
    });

    const getRandomBook = () => {
      const countBook = allNewAndHighRatingBooks.length - 1;
      const randomIndexBook = getRandomNumber(0, countBook);
      return allNewAndHighRatingBooks[randomIndexBook];
    };

    const randomBook = getRandomBook();
    return randomBook;
  }, [books]);

  return getRecommendedBook ? (
    <div>
      <h2>{HTMLText.RECOMMENDED_BOOK}</h2>
      <BookCard book={getRecommendedBook} />
    </div>
  ) : (
    <div>{HTMLText.NO_RECOMMENDED_BOOK}</div>
  );
};

export default BookRecommended;
