import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import BookCatalog from "../../components/bookCatalog/BookCatalog";
import { useAppDispatch} from "../../hooks/redux";
import { fetchAuthors } from "../../redux/actions/authorActions";
import { fetchBooks } from "../../redux/actions/bookActions";


const HomePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // запросы книг и авторов
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
