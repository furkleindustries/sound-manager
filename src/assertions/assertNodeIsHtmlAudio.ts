import {
  assert,
} from './assert';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export function assertNodeIsHtmlAudio<T extends IManagerNode>(node: T, methodName?: keyof T) {
  assert(
    !node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'} requires the ` +
    `${node.type} calling it to be in HTML5 Audio mode.`
  );
}
