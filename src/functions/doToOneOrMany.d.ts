import { ICollection } from '../interfaces/ICollection';
export declare function doToOneOrMany<T>(collection: ICollection<T>, propOrProps: string | string[], functionName: keyof T, ...args: any[]): void;
