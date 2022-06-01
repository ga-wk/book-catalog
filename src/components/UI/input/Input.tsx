import React, {
  DetailedHTMLProps,
  FunctionComponent,
  InputHTMLAttributes,
} from "react";

import cl from "./input.module.css";

const Input: FunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ name, value, onChange, placeholder, className, type, disabled }) => {
  return (
    <input
      type={type}
      name={name}
      className={`${cl.input} ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default Input;
