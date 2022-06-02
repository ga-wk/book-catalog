import { IAuthor } from "../../types/Author";

/**
 * Поиск автора в хранилище авторов
 * @param newAuthor имя и фамилия автора
 * @returns если нашел, то объект автора иначе null
 */
export const findAuthor = (newAuthor: string, authors: IAuthor[]) => {
  return authors.find((author) => {
    return `${author.firstName} ${author.lastName}` === newAuthor;
  });
};

