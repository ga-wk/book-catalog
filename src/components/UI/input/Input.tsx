import React, { DetailedHTMLProps, FunctionComponent, InputHTMLAttributes } from "react";

import cl from "./input.module.css";

const Input: FunctionComponent<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
> = ({ name, value, onChange, placeholder, className}) => {
  return (
    <input
      type="text"
      name={name}
      className={`${cl.input} ${className}`}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

export default Input;
