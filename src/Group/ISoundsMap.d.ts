import { ISound } from '../Sound/ISound';
export interface ISoundsMap {
    readonly [key: string]: ISound;
}
