import {
  ISound,
} from '../Sound/ISound';
import {
  IGroup,
} from '../Group/IGroup';

export const generateVolumeInput = (name: string, node: IGroup | ISound) => {
  if (!name) {
    throw new Error();
  }

  const nodeType = 'sounds' in node ? 'group' : 'sound';

  const container = document.createElement('div');
  container.className = 'sm-manager-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;

  const uniqueId = `sm-volumeInput-${nodeType}-${name}`;
  const label = document.createElement('label');
  label.className = 'sm-volumeInput-label';
  label.textContent = name[0].toUpperCase() + name.slice(1);
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
  input.addEventListener('change', (e) => {
    const tgt = e.target as HTMLInputElement;
    node.setVolume(Number(tgt.value));
  });

  container.appendChild(input);


  return container;
};
