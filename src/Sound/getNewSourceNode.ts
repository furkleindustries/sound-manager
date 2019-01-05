import {
  assert,
} from '../assertions/assert';

export function getNewSourceNode(context: AudioContext, buffer: AudioBuffer) {
  assert(context);
  assert(buffer);

  const node = context.createBufferSource();
  node.buffer = buffer;

  return node;
}
