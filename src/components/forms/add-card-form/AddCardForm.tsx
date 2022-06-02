import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useState,
} from "react";
import {
  defaultOptionRatingSelect,
  HTMLText,
  initBookState,
  initError,
  optionsRatingSelect,
} from "../../../constants/form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import authorSlice from "../../../redux/reducers/authorReducer";
import bookSlice from "../../../redux/reducers/bookReducer";
import modalSlice from "../../../redux/reducers/modalReducer";
import { fetchPostBook } from "../../../services/bookAPI";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select from "../../UI/select/Select";
import AddAuthorForm from "../add-author-form/AddAuthorForm";
import { isValidForm } from "../validateForms";

import cl from "../../../styles/form.module.css";

import {  findAuthor } from "../helpers";
import { IAuthor } from "../../../types/Author";

interface AddCardFormProps {}

const AddCardForm: FunctionComponent<AddCardFormProps> = () => {
  const { authors } = useAppSelector((state) => state.author);
  const { initCardForm } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const { addAuthor } = authorSlice.actions;
  const { addBook } = bookSlice.actions;
  const { closeModal } = modalSlice.actions;
  const [newAuthors, setNewAuthors] = useState<string[]>([]);
  const [error, setError] = useState(initError);
  const [book, setBook] = useState(initCardForm);

  /**
   * Очистка состояний
   */
  const clearState = () => {
    setError(initError);
    setBook(initBookState);
    setNewAuthors([]);
  };

  /**
   * Ввод названия книги
   */
  const setBookTitltHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, title: event.currentTarget.value });
  };

  /**
   * Ввод даты публикации книги
   */
  const setBookPublicationYearHandle = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBook({ ...book, publicationYear: +event.currentTarget.value });
  };

  /**
   * Ввод рейтинга книги
   */
  const setBookRatingHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setBook({ ...book, rating: +event.currentTarget.value });
  };

  /**
   * Ввод ISBN книги
   */
  const setBookISBNHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, ISBN: event.currentTarget.value });
  };

  /**
   * Создание объектов автора
   * @returns id авторов
   */
  const createAuthorObjects = (newAuthors: string[], authors: IAuthor[]) => {
    const getLastAuthorId = authors.reduce(
      (acc, cur) => (cur.id > acc ? cur.id : acc),
      0
    );

    const authorIds: number[] = [];

    newAuthors.forEach((newAuthor) => {
      const isAuthor = findAuthor(newAuthor, authors);
      // если автор уже есть в хранилище, то добавить Id
      if (isAuthor) {
        return authorIds.push(isAuthor.id);
      }

      // если нет, то добавить автора в хранилище авторов
      const nameArray = newAuthor.split(" ");
      const currentAuthorId = getLastAuthorId + 1;
      authorIds.push(currentAuthorId);

      dispatch(
        addAuthor({
          id: currentAuthorId,
          firstName: nameArray[0],
          lastName: nameArray[1],
        })
      );
    });
    return authorIds;
  };

  /**
   * Добавить книгу
   */
  const addBookHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error } = isValidForm(book, newAuthors);

    if (isValid) {
      const authorIds = createAuthorObjects(newAuthors, authors);

      const newBook = {
        ...book,
        authors: [...authorIds],
        rating: book.rating && book.rating < 0 ? 0 : book.rating,
      };

      // отправка post запроса
      const { id } = await fetchPostBook(newBook);

      dispatch(addBook({ ...newBook, id: id }));

      dispatch(closeModal());

      return clearState();
    }
    return setError(error);
  };

  return (
    <form className={cl.card} onSubmit={addBookHandle}>
      {error && <p className={cl.error}>{error}</p>}
      <Input
        placeholder={HTMLText.PH_TITLE}
        value={book.title}
        onChange={setBookTitltHandle}
      />
      <AddAuthorForm setAuthors={setNewAuthors} />
      <Input
        placeholder={HTMLText.PH_PUBLICATION_YEAR}
        type="number"
        onChange={setBookPublicationYearHandle}
        value={book.publicationYear}
      />
      <Select
        defaultOption={defaultOptionRatingSelect}
        options={optionsRatingSelect}
        onChange={setBookRatingHandle}
      />
      <Input
        placeholder={HTMLText.PH_ISBN}
        onChange={setBookISBNHandle}
        value={book.ISBN}
      />
      <Button type="submit">{HTMLText.BTN_ADD_BOOK}</Button>
    </form>
  );
};

export default AddCardForm;
