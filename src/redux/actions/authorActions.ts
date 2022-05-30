import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAuthorsObject } from "../../services/authorAPI";
import { IAuthor } from "../../types/Author";

const FETCH_ALL_AUTHORS = "author/fetchAll";

export const fetchAuthors = createAsyncThunk(
  FETCH_ALL_AUTHORS,
  async (_, thunkAPI) => {
    try {
      const authorsObj = await fetchAuthorsObject();

      const authors: IAuthor[] = [];

      for (let key in authorsObj) {
        const author: IAuthor = { ...authorsObj[key] };

        authors.push(author);
      }

      console.log(authors);
      
      return authors;
    } catch (error) {
      return thunkAPI.rejectWithValue("Не удалось получить авторов");
    }
  }
);
