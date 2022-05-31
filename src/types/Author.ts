export interface IAuthor {
  id: number;
  firstName: string;
  lastName: string;
}

export interface IAuthorResponseObject {
  [key: string]: IAuthor;
}
