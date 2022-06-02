import React, { FunctionComponent, MouseEventHandler } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import modalSlice from "../../../redux/reducers/modalReducer";

import cl from "./modal.module.css";

interface ModelProps extends React.HTMLAttributes<HTMLBodyElement> {}

const Modal: FunctionComponent<ModelProps> = ({ children }) => {
  const { title, isShowModal } = useAppSelector((state) => state.modal);
  const { closeModal } = modalSlice.actions;
  const dispatch = useAppDispatch();

  /**
   * Закрытие модального окна изнутри
   */
  const closeModalHandle = (event: React.MouseEvent) => {
    dispatch(closeModal());
  };

  return isShowModal ? (
    <div className={cl.wrapper} onClick={closeModalHandle}>
      <div
        className={cl.modalWindow}
        onClick={(event) => event.stopPropagation()}
      >
        <div className={cl.modal}>
          <header className={cl.modalHeader}>
            <p>{title}</p>
            <button type="button" onClick={closeModalHandle}>
              X
            </button>
          </header>

          <div className={cl.modalContent}> {children}</div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
