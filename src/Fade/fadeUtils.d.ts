import { IFadeProperty } from './IFadeProperty';
import { TFadeArg } from './TFadeArg';
export declare function fadeArgumentToFadeProperty<T>(arg: TFadeArg<T>, defaultValue: T | null, validator: (arg: T) => boolean): IFadeProperty<T>;
export declare function argToPropHelper<T>(arg: TFadeArg<T>, validator: (arg: T) => boolean): {
    valids: [boolean, boolean];
    value: IFadeProperty<T>;
};
export declare function validatorWrapper<T>(arg: any, validator: (arg: any) => boolean): arg is T;
export declare function structureFadePropFromValue<T>(arg: T): {
    in: T;
    out: T;
};
export declare function structureFadePropFromArray<T>(arg: [T, T]): {
    in: T;
    out: T;
};
export declare function structureFadePropFromObject<T>(arg: IFadeProperty<T>): {
    in: T | null;
    out: T | null;
};
export declare function normalizeFadeProp<T>(arg: IFadeProperty<any>, valids: [boolean, boolean], defaultValue: T | null): IFadeProperty<T>;
