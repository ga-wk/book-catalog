import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchPostAuthor } from "../../services/authorAPI";
import { IAuthor } from "../../types/Author";
import { fetchAuthors } from "../actions/authorActions";

const sliceAuthorName = "author";

const testData: IAuthor = {
  id: 1,
  firstName: "Роберт",
  lastName: "Мартин",
};

const initialState: { authors: IAuthor[]; isLoading: boolean; error: string } =
  {
    authors: [testData],
    isLoading: false,
    error: "",
  };

const authorSlice = createSlice({
  name: sliceAuthorName,
  initialState,
  reducers: {
    /**
     * Добавить автора в глобальный state
     */
    addAuthor: (state, action: PayloadAction<IAuthor>) => {
      fetchPostAuthor(action.payload);
      state.authors.push(action.payload);
    },
    /**
     * Удалить автора из глобального state
     */
    removeAuthor: (state, action: PayloadAction<IAuthor>) => {
      state.authors = state.authors.filter((s) => s.id !== action.payload.id);
    },
    /**
     * Обновить автора в глобальном state
     */
    updateAuthor: (state, action: PayloadAction<IAuthor>) => {
      const authorIndex = state.authors.findIndex(
        (s) => s.id === action.payload.id
      );

      state.authors[authorIndex] = action.payload;
    },
  },
  extraReducers: {
    [fetchAuthors.fulfilled.type]: (
      state,
      action: PayloadAction<IAuthor[]>
    ) => {
      state.authors = action.payload;
      state.isLoading = true;
      state.error = "";
    },
    [fetchAuthors.pending.type]: (state) => {
      state.isLoading = false;
    },
    [fetchAuthors.rejected.type]: (state, action: PayloadAction<string>) => {
      state.authors = [];
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export default authorSlice;
