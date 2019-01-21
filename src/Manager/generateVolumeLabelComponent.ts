import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  assertValid, assert,
} from 'ts-assertions';

export const strings = {
  NAME_INVALID:
    'The name argument was not provided to generateVolumeLabelComponent, ' +
    'but is necessary to generate components for Group or Sound nodes.',

  NODE_INVALID:
    'The node argument was not provided to generateVolumeLabelComponent.',

  NODE_TYPE_INVALID:
    'The node argument provided to generateVolumeLabelComponent did not ' +
    'have a node type property.',

  UNIQUE_ID_INVALID:
    'The uniqueId argument was not provided to generateVolumeLabelComponent.',
};

export function generateVolumeLabelComponent(node: IBaseNode, uniqueId: string, name?: string): HTMLLabelElement {
  const nodeType = assertValid<IBaseNode>(
    node,
    strings.NODE_INVALID,
  ).type;

  assert(
    nodeType,
    strings.NODE_TYPE_INVALID,
  );

  const label = document.createElement('label');
  label.className = 'sm-volumeInput-label';

  if (nodeType === NodeTypes.Group || nodeType === NodeTypes.Sound || name) {
    const checkedName = assertValid<string>(
      name,
      strings.NAME_INVALID,
    );

    const upperFirstChar = checkedName[0].toUpperCase();
    label.textContent = `${upperFirstChar}${checkedName.slice(1)}`;
  } else {
    label.textContent = 'Master volume';
  }

  assert(
    uniqueId,
    strings.UNIQUE_ID_INVALID,
  );

  label.setAttribute('for', uniqueId);

  return label;
}