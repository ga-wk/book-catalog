import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import BookCatalog from "../../components/bookCatalog/BookCatalog";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAuthors } from "../../redux/actions/authorActions";
import { fetchBooks } from "../../redux/actions/bookActions";
import bookSlice from "../../redux/reducers/bookReducer";


const HomePage: FunctionComponent = () => {
  // const { addBook, removeBook, updateBook } = bookSlice.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchAuthors());
  }, []);

  return (
    <div className="wrapper">
      <BookCatalog />
    </div>
  );
};
export default HomePage;
