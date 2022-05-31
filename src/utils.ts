import { IGroups } from "./types/Groups";

export const groupBy = <T>(data: any[], key: string) => {
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
