import React, { FunctionComponent } from "react";
import cl from "./header.module.css";

interface HeaderProps {}

const Header: FunctionComponent<HeaderProps> = () => {
  return (
    <header className={cl.header}>
      <p>LOGO</p>
      <nav>Панель навигации</nav>
    </header>
  );
};

export default Header;
