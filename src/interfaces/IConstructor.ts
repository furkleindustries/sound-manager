export interface IConstructor<T extends object = {}> {
  new (...args: any[]): T;
}
