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
} from "../../../constants/addCardForm";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import authorSlice from "../../../redux/reducers/authorReducer";
import bookSlice from "../../../redux/reducers/bookReducer";
import modalSlice from "../../../redux/reducers/modalReducer";
import { fetchDeleteBook, fetchPostBook } from "../../../services/bookAPI";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select from "../../UI/select/Select";
import AddAuthorForm from "../add-author-form/AddAuthorForm";
import { isValidForm } from "../validateForms";

import cl from "./addCardForm.module.css";

interface AddCardFormProps {}

const AddCardForm: FunctionComponent<AddCardFormProps> = () => {
  const { authors } = useAppSelector((state) => state.author);
  const { addAuthor } = authorSlice.actions;
  const { addBook, removeBook } = bookSlice.actions;

  const { initCardForm, isEdit } = useAppSelector((state) => state.modal);
  const { closeModal, setEdit } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const createInitAuthors = () => {
    return initCardForm.authors.map((a) => {
      const currentAuthor = authors.find((aa) => aa.id === a);
      const firstName = currentAuthor?.firstName;
      const lastName = currentAuthor?.lastName;
      const fullName = `${firstName} ${lastName}`
      
      return fullName;
    });
  };
  const [newAuthors, setNewAuthors] = useState<string[]>(createInitAuthors());
  const [error, setError] = useState(initError);
  const [book, setBook] = useState(initCardForm);

  const clearState = () => {
    setError(initError);
    setBook(initBookState);
  };

  const setBookTitltHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, title: event.currentTarget.value });
  };

  const setBookPublicationYearHandle = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setBook({ ...book, publicationYear: +event.currentTarget.value });
  };

  const setBookRatingHandle = (event: ChangeEvent<HTMLSelectElement>) => {
    setBook({ ...book, rating: +event.currentTarget.value });
  };

  const setBookISBNHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setBook({ ...book, ISBN: event.currentTarget.value });
  };

  const findAuthor = (newAuthor: string) => {
    return authors.find((author) => {
      return `${author.firstName} ${author.lastName}` === newAuthor;
    });
  };

  const createAuthorObjects = () => {
    const getLastAuthorId = authors.reduce(
      (acc, cur) => (cur.id > acc ? cur.id : acc),
      0
    );

    const authorIds: number[] = [];

    newAuthors.forEach((newAuthor) => {
      const isAuthor = findAuthor(newAuthor);
      if (isAuthor) {
        return authorIds.push(isAuthor.id);
      }

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

  const addBookHandle = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { isValid, error } = isValidForm(book, newAuthors);

    if (isValid) {
      const authorIds = createAuthorObjects();

      const newBook = {
        ...book,
        authors: [...authorIds],
        rating: book.rating && book.rating < 0 ? 0 : book.rating,
      };
      console.log(newBook);
      
      await fetchDeleteBook(book);
      dispatch(removeBook(book));

      const { id } = await fetchPostBook(newBook);

      dispatch(addBook({ ...newBook, id: id }));
      dispatch(closeModal());
      return clearState();
    }
    return setError(error);
  };

  const editBookHandle = () => {
    dispatch(setEdit(false));
  };

  const removeBookHandle = () => {
    dispatch(removeBook(book));
    fetchDeleteBook(book);
    dispatch(closeModal());
  };

  return (
    <form className={cl.addCard} onSubmit={addBookHandle}>
      <p>{error}</p>
      <Input
        placeholder={HTMLText.PH_TITLE}
        value={book.title}
        onChange={setBookTitltHandle}
        disabled={isEdit}
      />
      <AddAuthorForm setAuthors={setNewAuthors} />
      <Input
        placeholder={HTMLText.PH_PUBLICATION_YEAR}
        type="number"
        onChange={setBookPublicationYearHandle}
        value={book.publicationYear}
        disabled={isEdit}
      />
      <Select
        defaultOption={defaultOptionRatingSelect}
        options={
          isEdit
            ? [{ title: `${book.rating ?? 0}`, value: `${book.rating ?? 0}` }]
            : optionsRatingSelect
        }
        onChange={setBookRatingHandle}
        disabled={isEdit}
      />
      <Input
        placeholder={HTMLText.PH_ISBN}
        onChange={setBookISBNHandle}
        value={book.ISBN}
        disabled={isEdit}
      />
      {!isEdit && <Button type="submit">{HTMLText.BTN_ADD_BOOK}</Button>}
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

export default AddCardForm;
