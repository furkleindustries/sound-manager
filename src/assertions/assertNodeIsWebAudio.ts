import {
  assert,
} from './assert';
import {
  IAudioNode,
} from '../interfaces/IAudioNode';

export function assertNodeIsWebAudio(node: IAudioNode, methodName?: string) {
  assert(
    node.isWebAudio(),
    `The method ${methodName ? methodName : '(not provided)'}  requires the ` +
    `${node.type} calling it to be in Web Audio mode.`
  );
}
