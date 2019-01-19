import {
  generateVolumeComponent,
} from './generateVolumeComponent';
import {
  IManager,
} from '../Manager/IManager';

export function generateVolumePanelElement(manager: IManager) {
  const volumePanelElement = document.createElement('div');
  volumePanelElement.className = 'sound-manager-panel';

  const title = document.createElement('h2');
  title.className = 'sound-manager-title';
  title.textContent = 'Sound Manager Options';
  volumePanelElement.appendChild(title);

  /* Add the master volume slider. */
  volumePanelElement.appendChild(generateVolumeComponent(manager));

  Object.keys(manager.groups).forEach((groupName) => {
    const group = manager.getGroup(groupName);
    if (group.isPanelRegistered()) {
      /* Add registered group sliders. */
      volumePanelElement.appendChild(generateVolumeComponent(group, groupName));
    }

    Object.keys(group.sounds).forEach((soundName) => {
      const sound = group.getSound(soundName);
      if (sound.isPanelRegistered()) {
        /* Add registered sound sliders. */
        volumePanelElement.appendChild(generateVolumeComponent(
          sound,
          soundName,
        ));
      }
    });
  });

  return volumePanelElement;
};
