import React, {
  ChangeEvent,
  FormEvent,
  FunctionComponent,
  useEffect,
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
import { fetchDeleteBook, fetchPutBook } from "../../../services/bookAPI";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select from "../../UI/select/Select";
import { isValidForm } from "../validateForms";

interface EditCardFormProps {}

import cl from "../../../styles/form.module.css";
import EditAuthorForm from "../edit-author-form/EditAuthorForm";
import { IBook } from "../../../types/Book";
import { IAuthor } from "../../../types/Author";
import {  findAuthor } from "../helpers";

const EditCardForm: FunctionComponent<EditCardFormProps> = () => {
  const { initCardForm } = useAppSelector((state) => state.modal);
  const { authors } = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();
  const { removeBook, updateBook } = bookSlice.actions;
  const { addAuthor } = authorSlice.actions;
  const { closeModal } = modalSlice.actions;
  const [isEdit, setIsEdit] = useState(true);
  const [book, setBook] = useState(initCardForm);
  const [error, setError] = useState(initError);
  const [newAuthors, setNewAuthors] = useState<string[]>([]);

  /**
   * Очистка состояний
   */
  const clearState = () => {
    setError(initError);
    setBook(initBookState);
  };

  /**
   * Создание массив строк авторов в книги
   * @param initCard начальное состояние книги
   * @param authors все авторы
   * @returns массив строк авторов
   */
  const createInitAuthorsStringArray = (
    initCard: IBook,
    authors: IAuthor[]
  ) => {
    return initCard.authors.map((authorId) => {
      const currentAuthor = authors.find((author) => author.id === authorId);
      const firstName = currentAuthor?.firstName;
      const lastName = currentAuthor?.lastName;
      const fullName = `${firstName} ${lastName}`;

      return fullName;
    });
  };

  useEffect(() => {
    const initAuthors = createInitAuthorsStringArray(initCardForm, authors);

    setNewAuthors(initAuthors);
  }, []);

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
   * Обновление книги
   */
  const updateBookHandle = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error } = isValidForm(book, newAuthors);

    if (isValid) {
      const authorIds = createAuthorObjects(newAuthors, authors);

      const newBook = {
        ...book,
        authors: [...authorIds],
        rating: book.rating && book.rating < 0 ? 0 : book.rating,
      };
      console.log(newBook);

      fetchPutBook(newBook, newBook.id);
      dispatch(updateBook(newBook));

      dispatch(closeModal());

      return clearState();
    }
    return setError(error);
  };

  /**
   * Переход из режима просмотра в режим редактирования
   */
  const editBookHandle = () => {
    setIsEdit(false);
  };

  /**
   * Удаление книги
   */
  const removeBookHandle = () => {
    dispatch(removeBook(book));
    fetchDeleteBook(book);
    dispatch(closeModal());
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

  // определение опций рейтинга книги в режиме просмотра и редактирования
  const ratingOptions = isEdit
    ? [{ title: `${book.rating ?? 0}`, value: `${book.rating ?? 0}` }]
    : optionsRatingSelect;

  return (
    <form className={cl.card} onSubmit={updateBookHandle}>
     {error && <p className={cl.error}>{error}</p>}
      <Input
        placeholder={HTMLText.PH_TITLE}
        value={book.title}
        onChange={setBookTitltHandle}
        disabled={isEdit}
      />
      <EditAuthorForm setNewAuthors={setNewAuthors} isEdit={isEdit} />
      <Input
        placeholder={HTMLText.PH_PUBLICATION_YEAR}
        type="number"
        onChange={setBookPublicationYearHandle}
        value={book.publicationYear}
        disabled={isEdit}
      />
      <Select
        defaultOption={defaultOptionRatingSelect}
        options={ratingOptions}
        onChange={setBookRatingHandle}
        disabled={isEdit}
      />
      <Input
        placeholder={HTMLText.PH_ISBN}
        onChange={setBookISBNHandle}
        value={book.ISBN}
        disabled={isEdit}
      />

      {!isEdit && <Button type="submit">{HTMLText.BTN_UPDATE_BOOK}</Button>}

      {isEdit && (
        <Button type="button" onClick={editBookHandle}>
          {HTMLText.BTN_EDIT_BOOK}
        </Button>
      )}
      {isEdit && (
        <Button type="button" onClick={removeBookHandle}>
          {HTMLText.BTN_REMOVE_BOOK}
        </Button>
      )}
    </form>
  );
};

export default EditCardForm;
