import {
  assert,
} from 'ts-assertions';
import {
  INode,
} from '../Node/INode';

export function assertNodeIsHtmlAudio<T extends INode>(node: T, methodName?: keyof T) {
  assert(
    !node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'} requires the ` +
    `${node.type} calling it to be in HTML5 Audio mode.`
  );
}
