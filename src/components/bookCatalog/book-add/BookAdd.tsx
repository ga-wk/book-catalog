import React, { FunctionComponent, useState } from "react";
import { HTMLText, modalTitleAddCardForm } from "../../../constants/bookAdd";
import AddCardForm from "../../forms/add-card-form/AddCardForm";
import Button from "../../UI/button/Button";
import Modal from "../../UI/modal/Modal";

import cl from "./bookList.module.css";

interface BookAddProps {}

const BookAdd: FunctionComponent<BookAddProps> = () => {
  const [isShowModalAddCardForm, setIsShowModalAddCardForm] = useState(false);

  const openModalAddCardFormHandle = () => {
    setIsShowModalAddCardForm(true);
  };

  return (
    <div>
      <Modal
        isShow={isShowModalAddCardForm}
        setIsShow={setIsShowModalAddCardForm}
        title={modalTitleAddCardForm}
      >
        <AddCardForm />
      </Modal>

      <Button onClick={openModalAddCardFormHandle} type={"button"}>
        {HTMLText.BTN_OPEN_MODAL}
      </Button>
    </div>
  );
};

export default BookAdd;
