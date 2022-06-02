import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupType, sortDirectionType } from "../../constants/filter";
import { IBaseBook, IBook } from "../../types/Book";
import { IGroupsBooks } from "../../types/Groups";

const initialState: {
  isShowModal: boolean;
  isEdit: boolean;
  title: string;
  initCardForm: IBook;
} = {
  isShowModal: false,
  isEdit: true,
  title: "",
  initCardForm: {
    id: "-1",
    title: "",
    authors: [-1],
    publicationYear: undefined,
    rating: 0,
    ISBN: "",
  },
};

const sliceModalName = "modal";

const modalSlice = createSlice({
  name: sliceModalName,
  initialState,
  reducers: {
    /**
     * Открыть модальное окно
     */
    openModal: (
      state,
      actions: PayloadAction<{
        initCardForm: IBook;
        title: string;
        isEdit: boolean;
      }>
    ) => {
      state.isShowModal = true;
      state.initCardForm = actions.payload.initCardForm;
      state.title = actions.payload.title;
      state.isEdit = actions.payload.isEdit;
    },
    /**
     * Закрыть модальное окно
     */
    closeModal: (state) => {
      state.isShowModal = false;
    },
    /**
     * Задать вариант модального окна
     */
    setEdit: (state, actions: PayloadAction<boolean>) => {
      state.isEdit = actions.payload;
    },
  },
});

export default modalSlice;
