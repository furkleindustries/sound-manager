import { ICollection } from '../interfaces/ICollection';
export declare function getOneOrMany<T extends {}>(name: string, nodes: ICollection<T>): T;
export declare function getOneOrMany<T>(names: string[], nodes: ICollection<T>): T[];
