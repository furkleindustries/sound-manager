import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  NODE_INVALID:
    'The node argument was not provided to generateVolumeInputComponent.',

  UNIQUE_ID_INVALID:
    'The uniqueId argument was not provided to generateVolumeInputComponent',
};

export function generateVolumeInputComponent(node: IBaseNode, uniqueId: string) {
  assert(
    node,
    strings.NODE_INVALID,
  );

  const input = document.createElement('input');
  input.className = 'sm-volumeInput-input';

  input.id = assertValid(
    uniqueId,
    strings.UNIQUE_ID_INVALID,
  );

  input.type = 'range';
  input.value = String(node.getVolume());
  input.min = '0';
  input.max = '1';
  input.step = '0.01';

  let evtType = 'input';
  /* Support non-conformant browsers which lack the input event. */
  if (!('oninput' in input)) {
    /* istanbul ignore next */
    evtType = 'change';
  }

  input.addEventListener(evtType, (e) => (
    /* istanbul ignore next */
    node.setVolume(Number((e.target as HTMLInputElement).value))
  ));

  return input;
}
