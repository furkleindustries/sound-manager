import {
  assert,
} from './assert';
import {
  IAudioNode,
} from '../interfaces/IAudioNode';

export function assertNodeIsHtmlAudio(node: IAudioNode, methodName?: string) {
  assert(
    node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'}  requires the ` +
    `${node.type} calling it to be in HTML5 Audio mode.`
  );
}
