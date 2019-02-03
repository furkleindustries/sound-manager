import { ICollection } from '../interfaces/ICollection';
export declare function doToMany<T>(collection: ICollection<T>, propNames: string[], functionName: keyof T, ...args: any[]): void;
