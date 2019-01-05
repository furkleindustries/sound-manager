import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export interface ICreateSoundOptions {
  url: string;
  manager: IManagerNode;
  fade?: IFadeOptions | boolean;
  loop?: boolean;
  trackPosition?: number;
  volume?: number;
}
