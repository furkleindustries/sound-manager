export interface ICollection<T extends {}> {
  [key: string]: T;
}
