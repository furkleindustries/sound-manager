import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export const generateVolumeInput = (
  node: IWebAudioNode,
  name?: string,
) =>
{
  const nodeType = node.type;
  
  const container = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');

  container.appendChild(label);
  container.appendChild(input);
  
  let realName = name;
  if (nodeType === NodeTypes.Group || nodeType === NodeTypes.Sound) {
    if (!name) {
      throw new Error();
    }

    label.textContent = name[0].toUpperCase() + name.slice(1);
  } else {
    /* Node is a manager. */
    if (name) {
      label.textContent = name[0].toUpperCase() + name.slice(1);
    } else {
      label.textContent = 'Master volume';
    }

    realName = Math.floor(Math.random() * 100000).toString(16);
  }

  container.className = 'sm-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;
  label.className = 'sm-volumeInput-label';

  const uniqueId = `sm-volumeInput-${nodeType}-${realName}`;

  label.setAttribute('for', uniqueId);

  input.className = 'sm-volumeInput-input';
  input.id = uniqueId;
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

  return container;
};
