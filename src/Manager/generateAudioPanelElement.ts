import {
  generateAudioComponent,
} from './generateAudioComponent';
import {
  IManager,
} from './IManager';
import {
  assert,
} from 'ts-assertions';
import { updateAudioPanelElement } from './updateAudioPanelElement';

export const strings = {
  MANAGER_INVALID:
    'The manager argument was not provided to generateAudioPanelElement.',
};

export function generateAudioPanelElement(manager: IManager) {
  assert(manager, strings.MANAGER_INVALID);

  const audioPanelElement = document.createElement('div');
  audioPanelElement.className = 'sound-manager-panel';

  /* Add the master volume slider. */
  audioPanelElement.appendChild(generateAudioComponent(manager));

  Object.keys(manager.collection.groups).forEach((groupName) => {
    const group = manager.collection.getGroup(groupName);
    if (group.isPanelRegistered()) {
      /* Add registered group sliders. */
      audioPanelElement.appendChild(generateAudioComponent(group, groupName));
    }

    Object.keys(group.sounds).forEach((soundName) => {
      const sound = group.getSound(soundName);
      if (sound.isPanelRegistered()) {
        /* Add registered sound sliders. */
        audioPanelElement.appendChild(generateAudioComponent(
          sound,
          soundName,
        ));
      }
    });
  });

  let timerId: any = null;
  
  setInterval(() => {
    try {
      updateAudioPanelElement(manager, audioPanelElement);
    } catch (err) {
      clearTimeout(timerId);
      timerId = null;
    }
  }, 55);

  return audioPanelElement;
};
