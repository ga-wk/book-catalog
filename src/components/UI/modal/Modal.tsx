import React, { FunctionComponent, MouseEventHandler } from "react";

import cl from "./modal.module.css";

interface ModelProps extends React.HTMLAttributes<HTMLBodyElement> {
  title: string;
  isShow: boolean;
  setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: FunctionComponent<ModelProps> = ({
  children,
  title,
  isShow,
  setIsShow,
}) => {
  
  const closeModalHandle = (event: React.MouseEvent) => {
    setIsShow(false);
  };

  return isShow ? (
    <div className={cl.wrapper} onClick={closeModalHandle }>
      <div className={cl.modalWindow} onClick={(event) => event.stopPropagation()}>
        <div className={cl.modal}>
          <header className={cl.modalHeader}>
            <p>{title}</p>
            <button type="button" onClick={closeModalHandle}>
              X
            </button>
          </header>

          {children}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
