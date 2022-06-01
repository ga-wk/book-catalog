export const defaultOptionRatingSelect = "Выберите рейтинг";

export const optionsRatingSelect = [...new Array(11)].map((v, index) => {
  return {
    title: String(index),
    value: String(index),
  };
});

export const initBookState = {
  title: "",
  authors: [-1],
  publicationYear: -1,
  rating: 0,
  ISBN: "",
};

export const HTMLText = {
  BTN_ADD_BOOK: "Добавить",
  PH_ISBN: "ISBN",
  PH_PUBLICATION_YEAR: "Год публикации",
  PH_TITLE: "Название книги",
};

export const initError = "";
