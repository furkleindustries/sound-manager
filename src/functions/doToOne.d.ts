import { ICollection } from '../interfaces/ICollection';
export declare const strings: {
    COLLECTION_INVALID: string;
    COLLECTION_PROP_NAME_INVALID: string;
    FUNCTION_INVALID: string;
    FUNCTION_NAME_INVALID: string;
    PROP_NAME_INVALID: string;
};
export declare function doToOne<T, U extends keyof T>(collection: ICollection<T>, propName: string, functionName: U, ...args: any[]): void;
