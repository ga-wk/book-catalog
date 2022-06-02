import React, { FunctionComponent} from "react";
import { HTMLText } from "../../../constants/bookCard";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import modalSlice from "../../../redux/reducers/modalReducer";
import { IBook } from "../../../types/Book";

import cl from "./bookCard.module.css";

export interface BookCardProps {
  book: IBook;
  isRecommended: boolean;
}

const BookCard: FunctionComponent<BookCardProps> = ({
  book,
  isRecommended,
}) => {
  const { authors } = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const { openModal } = modalSlice.actions;

  /**
   * Создание звезд рейгинка
   * @param rating рейтинг книги
   * @returns JSX Element со звездами
   */
  const createStars = (rating: number) => {
    const createStarsKeyId = (count: number) => {
      return isRecommended ? "r" + count : book.id + "nr" + count;
    };
    const maxStars = 10;
    const starsChecked = [];

    for (let i = 0; i < +rating; i++) {
      starsChecked.push("★");
    }
    const starsUnchecked = [];
    for (let i = maxStars - +rating; i > 0; i--) {
      starsUnchecked.push("☆");
    }

    return [
      <span key={createStarsKeyId(1)} className={cl.checked}>
        {starsChecked.join("")}
      </span>,
      <span key={createStarsKeyId(2)}>{starsUnchecked.join("")}</span>,
    ];
  };

  /**
   * Создание списка авторов
   * @returns список авторов
   */
  const createAuthorList = () => {
    return book.authors
      .map((a) => {
        const currentAuthor = authors.find((aa) => aa.id === a);
        const firstName = currentAuthor?.firstName;
        const lastName = currentAuthor?.lastName;
        return `${firstName} ${lastName}`;
      })
      .join(", ");
  };

  /**
   * Открытие модального окна для редактирования книги
   */
  const openModalEditCardFormHandle = () => {
    dispatch(
      openModal({
        initCardForm: {
          ...book,
        },
        title: book.title,
        isEdit: true,
      })
    );
  };

  return (
    <li className={cl.card} onClick={openModalEditCardFormHandle}>
      <h3 className={cl.title}>{book.title}</h3>
      <span>
        {HTMLText.AUTHOR}
        {createAuthorList()}
      </span>
      {book?.publicationYear && (
        <span>
          {HTMLText.YEAR} {book?.publicationYear}
        </span>
      )}
      {book?.rating !== undefined && <div className={cl.stars}>{createStars(book?.rating)}</div>}
      {book?.ISBN && (
        <span>
          {HTMLText.ISBN}
          {book?.ISBN}
        </span>
      )}
    </li>
  );
};

export default BookCard;
