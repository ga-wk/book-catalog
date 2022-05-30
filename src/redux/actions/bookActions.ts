import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchBooksObject } from "../../services/bookAPI";
import { IBook } from "../../types/Book";

const FETCH_ALL_BOOKS = "book/fetchAll";

export const fetchBooks = createAsyncThunk(
  FETCH_ALL_BOOKS,
  async (_, thunkAPI) => {
    try {
      const booksObj = await fetchBooksObject();

      const books: IBook[] = [];

      for (let key in booksObj) {
        const book: IBook = { ...booksObj[key], id: key };

        books.push(book);
      }
      return books;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось получить книги");
    }
  }
);
