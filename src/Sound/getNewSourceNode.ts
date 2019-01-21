import {
  assertValid,
} from 'ts-assertions';

export const strings = {
  BUFFER_INVALID:
    'The buffer argument was not provided to getNewSourceNode.',
    
  CONTEXT_INVALID:
    'The buffer argument was not provided to getNewSourceNode.',
};

export function getNewSourceNode(context: AudioContext, buffer: AudioBuffer) {
  const sourceNode = assertValid<AudioContext>(
    context,
    strings.CONTEXT_INVALID,
  ).createBufferSource();

  sourceNode.buffer = assertValid<AudioBuffer>(
    buffer,
    strings.BUFFER_INVALID,
  );

  return sourceNode;
}
