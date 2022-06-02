import React, {
  ChangeEvent,
  FunctionComponent,
  useEffect,
  useRef,
  useState,
} from "react";
import { HTMLText, initAuthorName, initError } from "../../../constants/form";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import modalSlice from "../../../redux/reducers/modalReducer";
import Button from "../../UI/button/Button";
import Input from "../../UI/input/Input";
import Select from "../../UI/select/Select";
import { isValidName } from "../validateForms";

import cl from "../../../styles/form.module.css";

interface AddAuthorFormProps {
  setAuthors: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddAuthorForm: FunctionComponent<AddAuthorFormProps> = ({
  setAuthors,
}) => {
  const { authors } = useAppSelector((state) => state.author);
  const authorsSelectRef = useRef<HTMLSelectElement>(null);
  const [authorName, setAuthorName] = useState(initAuthorName);
  const [error, setError] = useState(initError);

  const inputAuthorNameHandle = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthorName(event.currentTarget.value);
  };

  const addAuthor = (name: string) => {
    setAuthors((state) => [...state, name]);
  };

  const removeAuthor = (removedAuthor: string) => {
    setAuthors((state) => state.filter((author) => author !== removedAuthor));
  };

  const clearState = () => {
    setError(initError);
    setAuthorName(initAuthorName);
  };

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
      <p>{error}</p>

      <Input
        type="text"
        placeholder={HTMLText.PH_ENTER_FIRST_NAME_AND_LAST_NAME_AUTHOR}
        onChange={inputAuthorNameHandle}
        value={authorName}
      />

      <Button type="button" onClick={addAuthorToCollectionHandle}>
        {HTMLText.BTN_ADD_AUTHOR}
      </Button>

      <label className={cl.allAuthorSelect}>
        {HTMLText.LIST_AUTHORS}
        <Select
          defaultOption=""
          options={[]}
          multiple={true}
          ref={authorsSelectRef}
        />
      </label>

      <Button type="button" onClick={removeAuthorFromCollectionHandle}>
        {HTMLText.BTN_REMOVE_SELECT_AUTHOR}
      </Button>
    </div>
  );
};

export default AddAuthorForm;
