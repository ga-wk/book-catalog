import { IGroups } from "./types/Groups";

/**
 * Группировка массива по определенному полую
 * @param data некоторый массив данных
 * @param key ключ по которому будет группирироватся массив
 * @returns группы и их ключи
 */
export const arrayGroupBy = <T>(data: any[], key: string) => {
  const keys: string[] = [];
  return {
    groups: data.reduce((acc: IGroups<T>, cur) => {
      let currentKeyValue: string =
        typeof cur[key] === "string" ? cur[key] : String(cur[key]);

      if (currentKeyValue === "undefined") {
        currentKeyValue = "-1";
      }

      if (!keys.includes(currentKeyValue)) {
        keys.push(currentKeyValue);
      }

      acc[currentKeyValue] = acc[currentKeyValue] || [];

      acc[currentKeyValue].push(cur);

      return acc;
    }, {}),
    keys: keys,
  };
};

/**
 * Получение случайного значения
 * @param min нижняя граница 
 * @param max верхняя граница 
 * @returns случайное цисло
 */
export const getRandomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);
