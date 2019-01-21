import {
  generateAudioPanelElement,
} from './generateAudioPanelElement';
import {
  IManager,
} from './IManager';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export function updateAudioPanelElement(
  manager: IManager,
  oldElem: HTMLElement,
)
{
  assert(manager);
  assert(oldElem);

  const newElem = generateAudioPanelElement(manager);
  assertValid<HTMLElement>(
    oldElem.parentElement,
  ).replaceChild(newElem, oldElem);

  return newElem;
}
