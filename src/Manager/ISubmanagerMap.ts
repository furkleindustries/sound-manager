import {
  ISubmanager,
} from '../Submanager/ISubmanager';

export interface ISubmanagerMap {
  readonly [key: string]: ISubmanager;
}
