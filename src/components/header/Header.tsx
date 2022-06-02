import React, { FunctionComponent } from "react";
import cl from "./header.module.css";

interface HeaderProps {}

const LOGO = "Book Catalog"

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className={cl.header}>
      <h1 className={cl.logo}>
        {LOGO}
      </h1>
    </header>
  );
};

export default Header;
