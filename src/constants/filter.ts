export const selectTitles = {
  BY_PUBLICATION_YEAR: "По году публикации",
  BY_RATING: "По рейтингу",
  BY_AUTHOR: "По автору",
  BY_ASCENDING: "По возрастанию",
  BY_DESCENDING: "По убыванию",
  GROUP_BY: "Выберите вариант группировки",
  SORT_DIRECTION: "Выберите направление",
};

export const groupType = {
  YEAR: "publicationYear",
  RATING: "rating",
  AUTHOR: "author",
};

export const sortDirectionType = {
  ASCENDING: "ascending",
  DESCENDING: "descending",
};

export const selectOptionGroupBy = [
  {
    title: selectTitles.BY_PUBLICATION_YEAR,
    value: groupType.YEAR,
  },
  {
    title: selectTitles.BY_RATING,
    value: groupType.RATING,
  },
  {
    title: selectTitles.BY_AUTHOR,
    value: groupType.AUTHOR,
  },
];

export const selectOptionSortDirection = [
  {
    title: selectTitles.BY_ASCENDING,
    value: sortDirectionType.ASCENDING,
  },
  {
    title: selectTitles.BY_DESCENDING,
    value: sortDirectionType.DESCENDING,
  },
];
