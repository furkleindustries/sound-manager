import {
  generateAudioComponent,
} from './generateAudioComponent';
import {
  IManager,
} from '../Manager/IManager';
import {
  assert,
} from 'ts-assertions';

export const strings = {
  MANAGER_INVALID:
    'The manager argument was not provided to generateAudioPanelElement.',
};

export function generateAudioPanelElement(manager: IManager) {
  assert(
    manager,
    strings.MANAGER_INVALID,
  );

  const audioPanelElement = document.createElement('div');
  audioPanelElement.className = 'sound-manager-panel';

  const title = document.createElement('h2');
  title.className = 'sound-manager-title';
  title.textContent = 'Sound Manager Options';
  audioPanelElement.appendChild(title);

  /* Add the master volume slider. */
  audioPanelElement.appendChild(generateAudioComponent(manager));

  Object.keys(manager.groups).forEach((groupName) => {
    const group = manager.getGroup(groupName);
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

  return audioPanelElement;
};
