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

  const compareAuthors = (firstAuthorId: string, secondAuthorId: string) => {
    const firstAuthor =
      authors.find((author) => author.id === +firstAuthorId)?.firstName || " ";
    const secondAuthor =
      authors.find((author) => author.id === +secondAuthorId)?.firstName || " ";

    return firstAuthor.localeCompare(secondAuthor);
  };

  const groupSorting = (direction: string, groupsBooks: IGroupsBooks) => {
    const isAuthorType = groupBy === groupType.AUTHOR;
    const isRatingType = groupBy === groupType.RATING;
    switch (direction) {
      case sortDirectionType.ASCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(a, b))
          : isRatingType
          ? [...groupsBooks.keys].sort((a, b) => +b - +a)
          : [...groupsBooks.keys].sort((a, b) => b.localeCompare(a));

      case sortDirectionType.DESCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(b, a))
          : isRatingType
          ? [...groupsBooks.keys].sort((a, b) => +a - +b)
          : [...groupsBooks.keys].sort((a, b) => b.localeCompare(a));

      default:
        return groupsBooks.keys;
    }
  };

  const groupByAuthor = (books: IBook[], authors: IAuthor[]) => {
    const keys = authors.map((author) => String(author.id));

    const groups: IGroups<IBook> = {};

    keys.forEach((key) => {
      groups[key] = books.filter((book) => book.authors.includes(+key));
    });

    return { groups, keys };
  };

  const organizeBooksIntoGroups = useMemo(() => {
    if (groupBy === groupType.AUTHOR) {
      return groupByAuthor(books, authors);
    }
    return arrayGroupBy<IBook>(books, groupBy);
  }, [books, groupBy]);

  const sortedAndOrganizeBooks = useMemo(() => {
    const groups = sortingWithinGroups(organizeBooksIntoGroups);

    let keys = groupSorting(sortDirection, organizeBooksIntoGroups);

    return { groups, keys };
  }, [organizeBooksIntoGroups, sortDirection]);

  useEffect(() => {
    dispatch(setSortedBooks(sortedAndOrganizeBooks));
  }, [books, groupBy, sortDirection]);

  const chooseGroupByHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGroupBy(event.currentTarget.value));
  };

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
