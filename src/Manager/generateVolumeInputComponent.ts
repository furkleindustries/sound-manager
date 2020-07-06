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
  try {
    input.value = node.getVolume().toFixed(4);
  } catch (err) {
    console.log(err);
    
  }

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

  
  let timerId: any = null;

  setInterval(() => {
    try {
      input.value = String(node.getVolume().toFixed(4));
    } catch (err) {
      console.log(err);
      
      clearTimeout(timerId);
      timerId = null;
    }
  }, 55);

  return input;
}
