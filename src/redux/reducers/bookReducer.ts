import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../../types/Book";
import { fetchBooks } from "../actions/bookActions";

const sliceBookName = "book";

const testData: IBook = {
  id: "0",
  title: "Идеальный программист. Как стать профессионалом разработки ПО",
  authors: [1],
  publicationYear: 2011,
  rating: 5,
  ISBN: "978-5-459-01044-2",
};

const initialState: { books: IBook[]; isLoading: boolean; error: string } = {
  books: [testData],
  isLoading: false,
  error: "",
};

const bookSlice = createSlice({
  name: sliceBookName,
  initialState,
  reducers: {
    addBook: (state, action: PayloadAction<IBook>) => {
      state.books.push(action.payload);
    },
    removeBook: (state, action: PayloadAction<IBook>) => {
      state.books = state.books.filter((s) => s.id !== action.payload.id);
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      const bookIndex = state.books.findIndex(
        (s) => s.id === action.payload.id
      );

      state.books[bookIndex] = action.payload;
    },
  },
  extraReducers: {
    [fetchBooks.fulfilled.type]: (state, action: PayloadAction<IBook[]>) => {
      state.books = action.payload;
      state.isLoading = true;
      state.error = "";
    },
    [fetchBooks.pending.type]: (state) => {
      state.isLoading = false;
    },
    [fetchBooks.rejected.type]: (state, action: PayloadAction<string>) => {
      state.books = [];
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default bookSlice;
