import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  Group,
} from './Group';
import {
  IGroupOptions,
} from './IGroupOptions';
import {
  IManagerStateCallback,
} from '../interfaces/IManagerStateCallback';

export const createGroup = (
  options: IGroupOptions,
  registerStateCallback: (cb: IManagerStateCallback) => void,
  unregisterStateCallback: (cb: IManagerStateCallback) => void,
  callStateCallbacks: () => void,
) => new Group(
  getFrozenObject({ ...options }),
  registerStateCallback,
  unregisterStateCallback,
  callStateCallbacks,
);
