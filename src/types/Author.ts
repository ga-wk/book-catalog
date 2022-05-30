export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IAuthorObject {
  [key: string]: IAuthor;
}
