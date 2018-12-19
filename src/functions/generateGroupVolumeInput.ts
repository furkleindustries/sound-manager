import {
  ISound,
} from '../Sound/ISound';
import {
  IGroup,
} from '../Group/IGroup';
import {
  ISoundManager,
} from '../SoundManager/ISoundManager';

export const generateVolumeInput = (
  node: ISoundManager | IGroup | ISound,
  name?: string,
) =>
{
  let nodeType;
  if ('groups' in node ) {
    nodeType = 'manager';
  } else if ('sounds' in node) {
    nodeType = 'group';
  } else {
    nodeType = 'sound';
  }

  if (nodeType === 'group' || nodeType === 'sound' && !name) {
    throw new Error();
  }

  let realName = nodeType === 'manager' ? 'manager' : name;

  const container = document.createElement('div');
  container.className = 'sm-manager-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;

  const uniqueId = `sm-volumeInput-${nodeType}-${realName}`;
  const label = document.createElement('label');
  label.className = 'sm-volumeInput-label';
  if (nodeType === 'group' || nodeType === 'sound') {
    label.textContent = name![0].toUpperCase() + name!.slice(1);
  } else {
    label.textContent = 'Master volume';
  }

  label.setAttribute('for', uniqueId);
  container.appendChild(label);

  const input = document.createElement('input');
  input.className = 'sm-volumeInput-input';
  input.id = uniqueId;
  input.type = 'range';
  input.value = node.getVolume().toString();
  input.min = '0';
  input.max = '1';
  input.step = '0.01';
  let evtType = 'input';
  /* Support non-conformant browsers which lack the input event. */
  if (!('oninput' in input)) {
    evtType = 'change';
  }

  input.addEventListener(evtType, (e) => {
    const tgt = e.target as HTMLInputElement;
    node.setVolume(Number(tgt.value));
  });

  container.appendChild(input);


  return container;
};
