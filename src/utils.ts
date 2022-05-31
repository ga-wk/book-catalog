interface Groups<T> {
  [key: string]: T[];
}

export const groupBy = <T>(data: any[], key: string) => {
  const keys: string[] = [];
  return {
    groups: data.reduce((acc: Groups<T>, cur) => {
      const currentKeyValue: string =
        typeof cur[key] === "string" ? cur[key] : String(cur[key]);

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
