import React, { FunctionComponent } from "react";
import cl from "./header.module.css";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className={cl.header}>
      <h1>
        <a href="/">LOGO</a>
      </h1>
    </header>
  );
};

export default Header;
