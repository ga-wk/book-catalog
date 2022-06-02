import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { HTMLText, initAuthorName, initError } from "../../../constants/form";
import { useAppSelector } from "../../../hooks/redux";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select from "../../UI/select/Select";
import { isValidName } from "../validateForms";

import cl from "../../../styles/form.module.css";

import { IOption } from "../../../types/Option";
import { IBook } from "../../../types/Book";
import { IAuthor } from "../../../types/Author";

interface EditAuthorFormProps {
  setNewAuthors: React.Dispatch<React.SetStateAction<string[]>>;
  isEdit: boolean;
}

const EditAuthorForm: FunctionComponent<EditAuthorFormProps> = ({
  setNewAuthors,
  isEdit,
}) => {
  const { authors } = useAppSelector((state) => state.author);
  const { initCardForm } = useAppSelector((state) => state.modal);
  const [initAuthors, setInitAuthors] = useState<IOption[]>([]);
  const [authorName, setAuthorName] = useState(initAuthorName);
  const [error, setError] = useState(initError);
  const authorsSelectRef = useRef<HTMLSelectElement>(null);
  /**
   * Создание изначальных авторов в книги
   * @param initCard начальное состояние книги
   * @param authors все авторы
   * @returns изначальные авторы
   */
  const createInitAuthors = (initCard: IBook, authors: IAuthor[]) => {
    return initCard.authors.map((authorId) => {
      const currentAuthor = authors.find((author) => author.id === authorId);
      const firstName = currentAuthor?.firstName;
      const lastName = currentAuthor?.lastName;
      const fullName = `${firstName} ${lastName}`;

      return {
        title: fullName,
        value: fullName,
      };
    });
  };

  useEffect(() => {
    setInitAuthors(createInitAuthors(initCardForm, authors));
  }, []);

  /**
   * Ввод имени и фамилии автора
   */
  const inputAuthorNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.currentTarget.value);
  };

  /**
   * Добавление автора из хранилища авторов
   * @param name имя и фамилия автора
   */
  const addAuthor = (name: string) => {
    setNewAuthors((state) => [...state, name]);
  };

  /**
   * Удаление автора из хранилища авторов
   * @param removedAuthor имя и фамилия автора
   */
  const removeAuthor = (removedAuthor: string) => {
    setNewAuthors((state) =>
      state.filter((author) => author !== removedAuthor)
    );
  };

  /**
   * Очистка состояний
   */
  const clearState = () => {
    setError(initError);
    setAuthorName(initAuthorName);
  };

  /**
   * Добавление автора в коллекцию авторов
   */
  const addAuthorToCollectionHandle = () => {
    const { isValid, error } = isValidName(authorName.trim());

    if (!isValid) {
      return setError(error);
    }

    const option = new Option(authorName, authorName);

    if (authorsSelectRef && authorsSelectRef.current) {
      authorsSelectRef.current.add(option, undefined);
    }

    addAuthor(authorName.trim());

    clearState();
  };

  /**
   *  Удаление автора в коллекции авторов
   */
  const removeAuthorFromCollectionHandle = () => {
    let selected = [];
    if (authorsSelectRef && authorsSelectRef.current) {
      const select = authorsSelectRef.current;

      for (let i = 0; i < select.options.length; i++) {
        selected[i] = select.options[i].selected;
      }

      let index = select.options.length;
      while (index--) {
        if (selected[index]) {
          const removedAuthor = select.item(index)?.value || "";
          removeAuthor(removedAuthor);
          select.remove(index);
        }
      }
    }
  };

  return (
    <div className={cl.author}>
      {error && <p className={cl.error}>{error}</p>}
      {!isEdit && (
        <Input
          type="text"
          placeholder={HTMLText.PH_ENTER_FIRST_NAME_AND_LAST_NAME_AUTHOR}
          onChange={inputAuthorNameHandle}
          value={authorName}
        />
      )}

      {!isEdit && (
        <Button type="button" onClick={addAuthorToCollectionHandle}>
          {HTMLText.BTN_ADD_AUTHOR}
        </Button>
      )}

      <label className={cl.allAuthorSelect}>
        {HTMLText.LIST_AUTHORS}
        <Select
          defaultOption=""
          options={initAuthors}
          multiple={true}
          ref={authorsSelectRef}
          disabled={isEdit}
        />
      </label>

      {!isEdit && (
        <Button type="button" onClick={removeAuthorFromCollectionHandle}>
          {HTMLText.BTN_REMOVE_SELECT_AUTHOR}
        </Button>
      )}
    </div>
  );
};

export default EditAuthorForm;
