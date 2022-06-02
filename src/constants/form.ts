export const defaultOptionRatingSelect = "Выберите рейтинг";

export const optionsRatingSelect = [...new Array(11)].map((v, index) => {
  return {
    title: String(index),
    value: String(index),
  };
});

export const initBookState = {
  id:"-1",
  title: "",
  authors: [-1],
  publicationYear: -1,
  rating: 0,
  ISBN: "",
};

export const HTMLText = {
  BTN_ADD_BOOK: "Добавить книгу",
  BTN_EDIT_BOOK: "Редактировать",
  BTN_UPDATE_BOOK: "Изменить",
  BTN_REMOVE_BOOK: "Удалить",
  BTN_ADD_AUTHOR: "Добавить автора",
  BTN_REMOVE_SELECT_AUTHOR: "Удалить выбранного автора",
  PH_ISBN: "ISBN",
  PH_PUBLICATION_YEAR: "Год публикации",
  PH_TITLE: "Название книги",
  PH_ENTER_FIRST_NAME_AND_LAST_NAME_AUTHOR: "Введите имя и фамилию автора",
  LIST_AUTHORS: "Список авторов:",
};

export const initError = "";
export const initAuthorName = "";
