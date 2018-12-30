import {
  IManager,
} from '../Manager/IManager';
import {
  IManagerCreateSoundOptions,
} from './IManagerCreateSoundOptions';

export interface ICreateSoundOptions extends IManagerCreateSoundOptions {
  manager: IManager;
  url: string;
}
