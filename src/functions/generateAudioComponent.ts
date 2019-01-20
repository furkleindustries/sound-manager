import {
  generateUniqueAudioPanelIdentifier,
} from './generateUniqueAudioPanelIdentifier';
import {
  generateVolumeInputComponent,
} from './generateVolumeInputComponent';
import {
  generateVolumeLabelComponent,
} from './generateVolumeLabelComponent';
import {
  generateVolumeLevelVisualizerComponent,
} from './generateVolumeLevelVisualizer';
import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
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
  NODE_INVALID:
    'The node argument was not provided to generateAudioComponent.',

  NODE_TYPE_INVALID:
    'The node argument did not have a type property.',
};

export function generateAudioComponent(
  node: IBaseNode & IAnalysableNode,
  name?: string,
)
{
  assert(
    node,
    strings.NODE_INVALID,
  );

  const nodeType = assertValid<NodeTypes>(
    node.type,
    strings.NODE_TYPE_INVALID,
  );

  const container = document.createElement('div');
  container.className = 'sm-volumeInput-container ' +
                        `sm-volumeInput-container-${nodeType}`;

  const uniqueId = generateUniqueAudioPanelIdentifier(node, name);
  container.appendChild(generateVolumeLabelComponent(node, uniqueId, name));
  container.appendChild(generateVolumeInputComponent(node, uniqueId));

  /* Analysis is not possible in HTML Audio mode, so there's no reasonable
   * method for visualizing volume level. */
  if (node.isWebAudio()) {
    container.appendChild(generateVolumeLevelVisualizerComponent(node));
  }

  return container;
}
