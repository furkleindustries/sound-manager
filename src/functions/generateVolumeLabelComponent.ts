import {
  assertValid,
} from '../assertions/assertValid';
import {
  INode,
} from '../Node/INode';
import {
  NodeTypes,
} from '../enums/NodeTypes';

export function generateVolumeLabelComponent(node: INode, uniqueId: string, name?: string) {
  const label = document.createElement('label');
  label.className = 'sm-volumeInput-label';

  const nodeType = node.type;
  if (nodeType === NodeTypes.Group || nodeType === NodeTypes.Sound) {
    const checkedName = assertValid<string>(name);
    const upperFirstChar = checkedName[0].toUpperCase();
    label.textContent = `${upperFirstChar}${checkedName.slice(1)}`;
  } else if (name) {
    label.textContent = `${name[0].toUpperCase()}${name.slice(1)}`;
  } else {
    label.textContent = 'Master volume';
  }

  label.setAttribute('for', uniqueId);

  return label;
}