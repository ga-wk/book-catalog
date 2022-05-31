import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authorSlice from "../reducers/authorReducer";
import bookSlice from "../reducers/bookReducer";
import filterSlice from "../reducers/filterReducer";

const reducers = {
  book: bookSlice.reducer,
  author: authorSlice.reducer,
  filter: filterSlice.reducer,
};

const rootReducer = combineReducers({
  ...reducers,
});

const setupStore = () =>
  configureStore({
    reducer: rootReducer,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export default setupStore;
