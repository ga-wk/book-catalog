import React from "react";
import HomePage from "./pages/home-page/HomePage";
import { createRoot } from "react-dom/client";
import Header from "./components/header/Header";

const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Header/>
    <HomePage />
  </React.StrictMode>
);
