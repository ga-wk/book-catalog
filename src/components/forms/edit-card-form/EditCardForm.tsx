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
import AddAuthorForm from "../add-author-form/AddAuthorForm";
import { isValidForm } from "../validateForms";

interface EditCardFormProps {}

import cl from "../../../styles/form.module.css";
import EditAuthorForm from "../edit-author-form/EditAuthorForm";

const EditCardForm: FunctionComponent<EditCardFormProps> = () => {
  const { initCardForm } = useAppSelector((state) => state.modal);
  const { authors } = useAppSelector((state) => state.author);
  const [isEdit, setIsEdit] = useState(true);
  const [book, setBook] = useState(initCardForm);
  const [error, setError] = useState(initError);
  const [newAuthors, setNewAuthors] = useState<string[]>([]);
  const { removeBook, updateBook } = bookSlice.actions;
  const { addAuthor } = authorSlice.actions;
  const { closeModal } = modalSlice.actions;
  const dispatch = useAppDispatch();

  const clearState = () => {
    setError(initError);
    setBook(initBookState);
  };

  useEffect(() => {
    const createInitAuthors = () => {
      return initCardForm.authors.map((a) => {
        const currentAuthor = authors.find((aa) => aa.id === a);
        const firstName = currentAuthor?.firstName;
        const lastName = currentAuthor?.lastName;
        const fullName = `${firstName} ${lastName}`;

        return fullName;
      });
    };

    const initAuthors = createInitAuthors();

    setNewAuthors(initAuthors);
  }, []);

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

  const updateBookHandle = (event: FormEvent<HTMLFormElement>) => {
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

      fetchPutBook(newBook, newBook.id);
      dispatch(updateBook(newBook));

      dispatch(closeModal());

      return clearState();
    }
    return setError(error);
  };

  const editBookHandle = () => {
    setIsEdit(false);
  };

  const removeBookHandle = () => {
    dispatch(removeBook(book));
    fetchDeleteBook(book);
    dispatch(closeModal());
  };

  const ratingOptions = isEdit
    ? [{ title: `${book.rating ?? 0}`, value: `${book.rating ?? 0}` }]
    : optionsRatingSelect;

  return (
    <form className={cl.card} onSubmit={updateBookHandle}>
      <p>{error}</p>
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
