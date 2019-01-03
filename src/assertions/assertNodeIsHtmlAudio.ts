import {
  assert,
} from './assert';
import {
  IManagerNode,
} from '../Node/IManagerNode';

export function assertNodeIsHtmlAudio(node: IManagerNode, methodName?: string) {
  assert(
    !node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'}  requires the ` +
    `${node.type} calling it to be in HTML5 Audio mode.`
  );
}
