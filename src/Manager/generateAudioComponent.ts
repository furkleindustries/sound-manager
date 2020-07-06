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
} from './generateVolumeLevelVisualizerComponent';
import {
  IAnalysableNode,
} from '../Node/IAnalysableNode';
import {
  IAnalysisSuite,
} from '../AnalysisSuite/IAnalysisSuite';
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
  ANALYSIS_SUITE_INVALID: 
    'The node argument was in Web Audio mode, but it had no analysis suite.',

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
  const input = generateVolumeInputComponent(node, uniqueId);
  container.appendChild(input);

  /* Analysis is not possible in HTML Audio mode, so there's no reasonable
   * method for visualizing volume level. */
  if (node.isWebAudio()) {
    const suite = assertValid<IAnalysisSuite>(
      node.analysisSuite,
      strings.ANALYSIS_SUITE_INVALID,
    );

    container.appendChild(generateVolumeLevelVisualizerComponent(suite));
  }

  return container;
}
