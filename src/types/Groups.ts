import { IBook } from "./Book";

export interface IGroups<T> {
  [key: string]: T[];
}

export interface IGroupsBooks {
  groups: IGroups<IBook>;
  keys: string[];
}
