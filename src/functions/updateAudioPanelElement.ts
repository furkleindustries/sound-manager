import {
  assert,
} from '../assertions/assert';
import {
  generateVolumePanelElement,
} from './generateVolumePanelElement';
import {
  IManagerNode,
} from '../Node/IManagerNode';
import {
  INodeCollectionSubmanager,
} from '../Manager/Submanagers/INodeCollectionSubmanager';

export function updateAudioPanelElement(
  manager: IManagerNode & INodeCollectionSubmanager,
  oldElem: HTMLElement
)
{
  assert(manager);
  assert(oldElem);
  assert(oldElem.parentElement);

  const newElem = generateVolumePanelElement(manager);
  oldElem.parentElement!.replaceChild(newElem, oldElem);

  return newElem;
}
