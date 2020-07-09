import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export const strings = {
  NAME_INVALID:
    'The name argument was not provided to generateAudioComponent, but this ' +
    'argument is necessary for NodeTypes other than Manager.',

  NODE_INVALID:
    'The node argument was not provided to generateUniqueAudioPanelIdentifier.',

  NODE_TYPE_INVALID:
    'The node argument did not have a type property.',
};

export const generateUniqueAudioPanelIdentifier = (
  node: IBaseNode,
  name?: string,
) => {
  assert(
    node,
    strings.NODE_INVALID,
  );

  const nodeType = assertValid<NodeTypes>(
    node.type,
    strings.NODE_TYPE_INVALID,
  );

  let uniqueName: string;
  if (nodeType === NodeTypes.Manager && !name) {
    uniqueName = Math.floor(Math.random() * 100000).toString(16);
  } else {
    uniqueName = assertValid<string>(
      name,
      strings.NAME_INVALID,
    );
  }

  return `sm-volumeInput-${nodeType}-${uniqueName}`;
};
