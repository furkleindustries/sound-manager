import {
  assert,
} from './assert';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export function assertNodeIsWebAudio<T extends IManagerNode>(
  node: T,
  methodName?: keyof T,
)
{
  assert(
    node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'} requires the ` +
      `${node.type} calling it to be in Web Audio mode.`
  );
}
