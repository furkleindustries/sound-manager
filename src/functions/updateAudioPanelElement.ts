import {
  generateAudioPanelElement,
} from './generateAudioPanelElement';
import {
  IManager,
} from '../Manager/IManager';

export const updateAudioPanelElement = (manager: IManager, oldElem: HTMLElement) => {
  if (!manager) {
    throw new Error();
  } else if (!oldElem) {
    throw new Error();
  } else if (!oldElem.parentElement) {
    throw new Error();
  }

  const newElem = generateAudioPanelElement(manager);
  oldElem.parentElement.replaceChild(newElem, oldElem);

  return newElem;
};
