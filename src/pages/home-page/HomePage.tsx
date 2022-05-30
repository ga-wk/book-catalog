import React, { FunctionComponent } from "react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchAuthors } from "../../redux/actions/authorActions";
import { fetchBooks } from "../../redux/actions/bookActions";
import bookSlice from "../../redux/reducers/bookReducer";

const HomePage: FunctionComponent = () => {
  const book = useAppSelector((state) => state.book);
  const author = useAppSelector((state) => state.author);
  const { addBook, removeBook, updateBook } = bookSlice.actions;
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(fetchBooks());
  //   dispatch(fetchAuthors());
  // }, []);

  return (
    <div className="wrapper">
      <p>{book.isLoading && author.isLoading}</p>
      <p>{book.error && author.error}</p>
      <ul>
        {book.books.map((book) => (
          <li key={book.id}>
            <p>Название: {book.title}</p>
            <p>
              Авторы:
              {book.authors
                .map((a) => {
                  const currentAuthor = author.authors.find(
                    (aa) => aa.id === a
                  );
                  const firstName = currentAuthor?.firstName;
                  const lastName = currentAuthor?.lastName;
                  return `${firstName} ${lastName}`;
                })
                .join(", ")}
            </p>
            {book?.publicationYear && (
              <p>Год публикации: {book?.publicationYear}</p>
            )}
            {book?.rating && <p>Рейтинг: {book?.rating}</p>}
            {book?.ISBN && <p>ISBN: {book?.ISBN}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default HomePage;
