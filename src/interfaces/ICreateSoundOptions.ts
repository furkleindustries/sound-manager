import {
  IManagerCreateSoundOptions,
} from './IManagerCreateSoundOptions';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export interface ICreateSoundOptions extends IManagerCreateSoundOptions {
  manager: IManagerNode;
  url: string;
}
