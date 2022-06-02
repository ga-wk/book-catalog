import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { groupType, sortDirectionType } from "../../constants/filter";
import { IGroupsBooks } from "../../types/Groups";

const initialState: {
  groupBy: string;
  sortDirection: string;
  sortedBooks: IGroupsBooks;
} = {
  groupBy: groupType.YEAR,
  sortDirection: sortDirectionType.DESCENDING,
  sortedBooks: {
    groups: {},
    keys: [],
  },
};

const slicefilterName = "filter";

const filterSlice = createSlice({
  name: slicefilterName,
  initialState,
  reducers: {
    /**
     * Задать вариант группировки
     */
    setGroupBy: (state, actions: PayloadAction<string>) => {
      state.groupBy = actions.payload;
    },
    /**
     *  Задать вариант направление сортировки
     */
    setSortDirection: (state, actions: PayloadAction<string>) => {
      state.sortDirection = actions.payload;
    },
    /**
     *  Задать вариант отсортированные группы
     */
    setSortedBooks: (state, actions: PayloadAction<IGroupsBooks>) => {
      state.sortedBooks = actions.payload;
    },
  },
});

export default filterSlice;
