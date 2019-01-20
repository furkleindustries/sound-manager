import {
  generateVolumeInputComponent,
} from './generateVolumeInputComponent';
import {
  generateVolumeLabelComponent,
} from './generateVolumeLabelComponent';
import {
  generateVolumeLevelsVisualizerComponent,
} from './generateVolumeLevelsVisualizer';
import {
  IBaseNode,
} from '../Node/IBaseNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  assertValid,
} from 'ts-assertions';

export const strings = {
  NAME_INVALID:
    'The name argument was not provided to generateAudioComponent, but this ' +
    'argument is necessary for NodeTypes other than Manager.',

  NODE_INVALID:
    'The node argument was not provided to generateAudioComponent.',
};

export function generateAudioComponent(
  node: IBaseNode,
  name?: string,
)
{
  const nodeType = assertValid<IBaseNode>(
    node,
    strings.NODE_INVALID,
  ).type;

  const container = document.createElement('div');
  container.className = 'sm-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;

  let uniqueName;
  if (nodeType === NodeTypes.Manager && !name) {
    uniqueName = Math.floor(Math.random() * 100000).toString(16);
  } else {
    uniqueName = assertValid<string>(
      name,
      strings.NAME_INVALID,
    );
  }

  const uniqueId = `sm-volumeInput-${nodeType}-${uniqueName}`;
  container.appendChild(generateVolumeLabelComponent(node, uniqueId, name));
  container.appendChild(generateVolumeInputComponent(node, uniqueId));
  if (node.isWebAudio()) {
    container.appendChild(generateVolumeLevelsVisualizerComponent(
      node as any,
    ));
  }

  return container;
}