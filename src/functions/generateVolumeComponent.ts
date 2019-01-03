import {
  assertValid,
} from '../assertions/assertValid';
import {
  IManagerNode,
} from '../Node/IManagerNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export function generateVolumeComponent(
  node: IManagerNode,
  name?: string,
)
{
  const nodeType = node.type;

  const container = document.createElement('div');
  container.className = 'sm-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;

  let uniqueName;
  if (nodeType === NodeTypes.Manager && !name) {
    uniqueName = Math.floor(Math.random() * 100000).toString(16);
  } else {
    uniqueName = assertValid<string>(name);
  }

  const uniqueId = `sm-volumeInput-${nodeType}-${uniqueName}`;
  container.appendChild(generateVolumeLabelComponent(node, uniqueId, name));
  container.appendChild(generateVolumeInputComponent(node, uniqueId));

  return container;
}

export function generateVolumeLabelComponent(node: IManagerNode, uniqueId: string, name?: string) {
  const label = document.createElement('label');
  label.className = 'sm-volumeInput-label';

  const nodeType = node.type;
  if (nodeType === NodeTypes.Group || nodeType === NodeTypes.Sound) {
    const checkedName = assertValid<string>(name);
    label.textContent = checkedName[0].toUpperCase() + checkedName.slice(1);
  } else if (name) {
    label.textContent = name[0].toUpperCase() + name.slice(1);
  } else {
    label.textContent = 'Master volume';
  }

  label.setAttribute('for', uniqueId);

  return label;
}

export function generateVolumeInputComponent(node: IManagerNode, uniqueName: string) {
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
  input.addEventListener(evtType, (e) => {
    const tgt = e.target as HTMLInputElement;
    node.setVolume(Number(tgt.value));
  });

  return input;
}
