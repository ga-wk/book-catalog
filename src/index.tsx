import React, { FunctionComponent } from "react";
import HomePage from "./pages/home-page/HomePage";
import { createRoot } from "react-dom/client";
import Header from "./components/header/Header";
import setupStore from "./redux/store/store";
import { Provider } from "react-redux";

import "./normalize.css";
const rootElement = document.getElementById("root");

if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

interface AppProps {}

const App: FunctionComponent<AppProps> = () => {
  const store = setupStore();

  return (
    <React.StrictMode>
      <Provider store={store}>
        <Header />
        <HomePage />
      </Provider>
    </React.StrictMode>
  );
};

root.render(<App />);
