import { RootState } from "../store/store";

//test

export const getBook = (state: RootState, id: string) => {
  return state.book.books.find((s) => s.id === id);
};

export const getBooks = (state: RootState) => {
  return state.book.books;
};
