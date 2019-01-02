import {
  assert,
} from '../assertions/assert';
import {
  generateAudioPanelElement,
} from './generateAudioPanelElement';
import {
  IManager,
} from '../Manager/IManager';

export const updateAudioPanelElement = (manager: IManager, oldElem: HTMLElement) => {
  assert(manager);
  assert(oldElem);
  assert(oldElem.parentElement);

  const newElem = generateAudioPanelElement(manager);
  oldElem.parentElement!.replaceChild(newElem, oldElem);

  return newElem;
};
