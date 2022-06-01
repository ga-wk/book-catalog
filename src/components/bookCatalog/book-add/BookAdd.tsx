import React, { FunctionComponent, useState } from "react";
import { HTMLText, modalTitleAddCardForm } from "../../../constants/bookAdd";
import { useAppDispatch } from "../../../hooks/redux";
import modalSlice from "../../../redux/reducers/modalReducer";
import AddCardForm from "../../forms/add-card-form/AddCardForm";
import Button from "../../UI/button/Button";
import Modal from "../../UI/modal/Modal";

import cl from "./bookList.module.css";

interface BookAddProps {}

const BookAdd: FunctionComponent<BookAddProps> = () => {
  const { openModal } = modalSlice.actions;
  const dispatch = useAppDispatch();
  const openModalAddCardFormHandle = () => {
    dispatch(
      openModal({
        initCardForm: {
          id:"-1",
          title: "",
          authors: [-1],
          publicationYear: undefined,
          rating: 0,
          ISBN: "",
        },
        title: modalTitleAddCardForm,
        isEdit:false
      })
    );
  };

  return (
    <div>
      <Modal>
        <AddCardForm />
      </Modal>

      <Button onClick={openModalAddCardFormHandle} type={"button"}>
        {HTMLText.BTN_OPEN_MODAL}
      </Button>
    </div>
  );
};

export default BookAdd;
