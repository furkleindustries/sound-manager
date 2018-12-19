import {
  ISoundManager,
} from '../SoundManager/ISoundManager';
import {
  generateAudioPanelElement,
} from './generateAudioPanelElement';

export const updateAudioPanelElement = (manager: ISoundManager, oldElem: HTMLElement) => {
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
