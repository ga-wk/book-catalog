import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGetAuthors } from "../../services/authorAPI";
import { IAuthor } from "../../types/Author";

const FETCH_ALL_AUTHORS = "author/fetchAll";
const ERROE_FETCH = "Не удалось получить авторов";

/**
 * Получение всех авторов
 */
export const fetchAuthors = createAsyncThunk(
  FETCH_ALL_AUTHORS,
  async (_, thunkAPI) => {
    try {
      const authorsObj = await fetchGetAuthors();

      const authors: IAuthor[] = [];

      for (let key in authorsObj) {
        const author: IAuthor = { ...authorsObj[key] };

        authors.push(author);
      }

      return authors;
    } catch (error) {
      return thunkAPI.rejectWithValue(ERROE_FETCH);
    }
  }
);
