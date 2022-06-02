import React, { FunctionComponent, useEffect, useMemo } from "react";
import {
  groupType,
  selectOptionGroupBy,
  selectOptionSortDirection,
  selectTitles,
  sortDirectionType,
} from "../../../constants/filter";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import filterSlice from "../../../redux/reducers/filterReducer";
import { IAuthor } from "../../../types/Author";
import { IBook } from "../../../types/Book";
import { IGroups, IGroupsBooks } from "../../../types/Groups";
import { arrayGroupBy } from "../../../utils";
import Select from "../../UI/select/Select";

import cl from "./bookFilter.module.css";

interface BookFilterProps {}

const BookFilter: FunctionComponent<BookFilterProps> = () => {
  const { books } = useAppSelector((state) => state.book);
  const { groupBy, sortDirection } = useAppSelector((state) => state.filter);
  const { authors } = useAppSelector((state) => state.author);
  const { setGroupBy, setSortDirection, setSortedBooks } = filterSlice.actions;
  const dispatch = useAppDispatch();

  /**
   * Сортировка внутри группы по названию книги
   * @param groupsBooks группа книг
   * @returns отсортированная группа
   */
  const sortingWithinGroups = (groupsBooks: IGroupsBooks) => {
    const groups: IGroups<IBook> = {};
    for (const key in groupsBooks.groups) {
      if (Object.prototype.hasOwnProperty.call(groupsBooks.groups, key)) {
        const group = groupsBooks.groups[key];

        groups[key] = [...group].sort((a, b) => a.title.localeCompare(b.title));
      }
    }
    return groups;
  };

  /**
   * Сравнение авторов
   * @param firstAuthorId id первого автора
   * @param secondAuthorId id второго автора
   * @returns сравнение двух авторов с помощью localeCompare
   */
  const compareAuthors = (firstAuthorId: string, secondAuthorId: string) => {
    const firstAuthor =
      authors.find((author) => author.id === +firstAuthorId)?.firstName || " ";
    const secondAuthor =
      authors.find((author) => author.id === +secondAuthorId)?.firstName || " ";

    return firstAuthor.localeCompare(secondAuthor);
  };

  /**
   * Сортировка групп
   * @param direction направление сортировки 
   * @param groupsBooks группы книг
   * @returns отсортированные группы книг
   */
  const groupSorting = (direction: string, groupsBooks: IGroupsBooks) => {
    const isAuthorType = groupBy === groupType.AUTHOR;

    switch (direction) {
      case sortDirectionType.ASCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(b, a))
          : [...groupsBooks.keys].sort((a, b) => +a - +b);

      case sortDirectionType.DESCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(a, b))
          : [...groupsBooks.keys].sort((a, b) => +b - +a);

      default:
        return groupsBooks.keys;
    }
  };

  /**
   * Группировка книг по авторам
   * @param books книги
   * @param authors авторы
   * @returns группы книг
   */
  const groupByAuthor = (books: IBook[], authors: IAuthor[]) => {
    const keys = authors.map((author) => String(author.id));

    const groups: IGroups<IBook> = {};

    keys.forEach((key) => {
      groups[key] = books.filter((book) => book.authors.includes(+key));
    });

    return { groups, keys };
  };

  // Сгруппированные книги
  const organizeBooksIntoGroups = useMemo(() => {
    if (groupBy === groupType.AUTHOR) {
      return groupByAuthor(books, authors);
    }
    return arrayGroupBy<IBook>(books, groupBy);
  }, [books, groupBy]);

  // Отсортированные книги
  const sortedAndOrganizeBooks = useMemo(() => {
    const groups = sortingWithinGroups(organizeBooksIntoGroups);

    let keys = groupSorting(sortDirection, organizeBooksIntoGroups);

    return { groups, keys };
  }, [organizeBooksIntoGroups, sortDirection]);

  useEffect(() => {
    dispatch(setSortedBooks(sortedAndOrganizeBooks));
  }, [books, groupBy, sortDirection]);

  /**
   * Выбор варианта группировки
   */
  const chooseGroupByHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGroupBy(event.currentTarget.value));
  };

  /**
   * Выбор варианта сортировки
   */
  const chooseSortDirectionHandle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSortDirection(event.currentTarget.value));
  };

  return (
    <div className={cl.filters}>
      <Select
        options={selectOptionGroupBy}
        defaultOption={selectTitles.GROUP_BY}
        onChange={chooseGroupByHandle}
      />

      <Select
        options={selectOptionSortDirection}
        defaultOption={selectTitles.SORT_DIRECTION}
        onChange={chooseSortDirectionHandle}
      />
    </div>
  );
};

export default BookFilter;
