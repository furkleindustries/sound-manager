import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  generateVolumePanelElement,
} from './generateVolumePanelElement';
import {
  IManager,
} from '../Manager/IManager';

export function updateAudioPanelElement(
  manager: IManager,
  oldElem: HTMLElement,
)
{
  assert(manager);
  assert(oldElem);

  const newElem = generateVolumePanelElement(manager);
  assertValid<HTMLElement>(
    oldElem.parentElement,
  ).replaceChild(newElem, oldElem);

  return newElem;
}
