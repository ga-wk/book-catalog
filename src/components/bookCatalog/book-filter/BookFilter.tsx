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
import { groupBy } from "../../../utils";
import Select from "../../UI/select/Select";

interface BookFilterProps {}

const BookFilter: FunctionComponent<BookFilterProps> = () => {
  const book = useAppSelector((state) => state.book);
  const filter = useAppSelector((state) => state.filter);
  const author = useAppSelector((state) => state.author);
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
      author.authors.find((a) => a.id === +firstAuthorId)?.firstName || " ";
    const secondAuthor =
      author.authors.find((a) => a.id === +secondAuthorId)?.firstName || " ";

    return firstAuthor.localeCompare(secondAuthor);
  };

  const groupSorting = (direction: string, groupsBooks: IGroupsBooks) => {
    const isAuthorType = filter.groupBy === groupType.AUTHOR;

    switch (direction) {
      case sortDirectionType.ASCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(a, b))
          : [...groupsBooks.keys].sort((a, b) => b.localeCompare(a));

      case sortDirectionType.DESCENDING:
        return isAuthorType
          ? [...groupsBooks.keys].sort((a, b) => compareAuthors(b, a))
          : [...groupsBooks.keys].sort((a, b) => a.localeCompare(b));
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
    if (filter.groupBy === groupType.AUTHOR) {
      return groupByAuthor(book.books, author.authors);
    }
    return groupBy<IBook>(book.books, filter.groupBy);
  }, [book.books, filter.groupBy]);

  const sortedAndOrganizeBooks = useMemo(() => {
    const groups = sortingWithinGroups(organizeBooksIntoGroups);

    let keys = groupSorting(filter.sortDirection, organizeBooksIntoGroups);

    return { groups, keys };
  }, [organizeBooksIntoGroups, filter.sortDirection]);

  useEffect(() => {
    dispatch(setSortedBooks(sortedAndOrganizeBooks));
  }, [book.books, filter.groupBy, filter.sortDirection]);

  const chooseGroupByHandle = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setGroupBy(event.currentTarget.value));
  };

  const chooseSortDirectionHandle = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    dispatch(setSortDirection(event.currentTarget.value));
  };

  return (
    <div>
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
