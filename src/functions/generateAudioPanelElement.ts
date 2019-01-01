import {
  generateVolumeInput,
} from './generateVolumeInput';
import {
  IManager,
} from '../Manager/IManager';

export const generateAudioPanelElement = (manager: IManager) => {
  const audioPanelElement = document.createElement('div');
  audioPanelElement.className = 'sound-manager-panel';

  const title = document.createElement('h2');
  title.className = 'sound-manager-title';
  title.textContent = 'Sound Manager Options';
  audioPanelElement.appendChild(title);

  /* Add the master volume slider. */
  audioPanelElement.appendChild(generateVolumeInput(manager));

  Object.keys(manager.groups).forEach((groupName) => {
    const group = manager.getGroups(groupName);
    if (group.isPanelRegistered()) {
      /* Add registered group sliders. */
      audioPanelElement.appendChild(generateVolumeInput(
        group,
        groupName,
      ));
    }

    Object.keys(group.sounds).forEach((soundName) => {
      const sound = group.getSounds(soundName);
      if (sound.isPanelRegistered()) {
        /* Add registered sound sliders. */
        audioPanelElement.appendChild(generateVolumeInput(
          sound,
          soundName,
        ));
      }
    });
  });

  return audioPanelElement;
};
