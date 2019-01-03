import {
  assert,
} from './assert';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export function assertNodeIsWebAudio(node: IManagerNode, methodName?: string) {
  assert(
    node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'}  requires the ` +
    `${node.type} calling it to be in Web Audio mode.`
  );
}
