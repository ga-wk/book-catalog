import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetBooksObject } from "../../services/bookAPI";
import { IBook } from "../../types/Book";

const FETCH_ALL_BOOKS = "book/fetchAll";
const ERROE_FETCH = "Не удалось получить книги";

/**
 * Получение всех книг
 */
export const fetchBooks = createAsyncThunk(
  FETCH_ALL_BOOKS,
  async (_, thunkAPI) => {
    try {
      const booksObj = await fetchGetBooksObject();

      const books: IBook[] = [];

      for (let key in booksObj) {
        const book: IBook = { ...booksObj[key], id: key };

        books.push(book);
      }
      return books;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERROE_FETCH);
    }
  }
);
