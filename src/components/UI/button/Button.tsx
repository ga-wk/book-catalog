import React, {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  FunctionComponent,
} from "react";

import cl from "./button.module.css";

const Button: FunctionComponent<
  DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
> = ({ children, onClick, type, ...props }) => {
  return (
    <button className={cl.button} style={props} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
