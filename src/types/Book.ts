export interface IBook extends IBaseBook {
  id: string;
}

export interface IBaseBook {
  title: string;
  authors: number[];
  publicationYear?: number;
  rating?: number;
  ISBN?: string;
}

export interface IBookGetResponseObject {
  [key: string]: IBaseBook;
}

export interface IBookPostResponseObject {
  id:string
}
