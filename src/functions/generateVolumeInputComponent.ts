import {
  IBaseNode,
} from '../Node/IBaseNode';

export function generateVolumeInputComponent(node: IBaseNode, uniqueName: string) {
  const input = document.createElement('input');
  input.className = 'sm-volumeInput-input';

  input.id = uniqueName;
  input.type = 'range';
  input.value = String(node.getVolume());
  input.min = '0';
  input.max = '1';
  input.step = '0.01';

  let evtType = 'input';
  /* Support non-conformant browsers which lack the input event. */
  /* istanbul ignore next */
  if (!('oninput' in input)) {
    evtType = 'change';
  }

  /* istanbul ignore next */
  input.addEventListener(evtType, (e) => (
    node.setVolume(Number((e.target as HTMLInputElement).value))
  ));

  return input;
}
