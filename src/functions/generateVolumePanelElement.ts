import {
  generateVolumeComponent,
} from './generateVolumeComponent';
import {
  IManagerNode,
} from '../Node/IManagerNode';
import {
  INodeCollectionSubmanager,
} from '../Manager/Submanagers/INodeCollectionSubmanager';

export function generateVolumePanelElement(manager: IManagerNode & INodeCollectionSubmanager) {
  const volumePanelElement = document.createElement('div');
  volumePanelElement.className = 'sound-manager-panel';

  const title = document.createElement('h2');
  title.className = 'sound-manager-title';
  title.textContent = 'Sound Manager Options';
  volumePanelElement.appendChild(title);

  /* Add the master volume slider. */
  volumePanelElement.appendChild(generateVolumeComponent(manager));

  Object.keys(manager.groups).forEach((groupName) => {
    const group = manager.getGroups(groupName);
    if (group.isPanelRegistered()) {
      /* Add registered group sliders. */
      volumePanelElement.appendChild(generateVolumeComponent(group, groupName));
    }

    Object.keys(group.sounds).forEach((soundName) => {
      const sound = group.getSounds(soundName);
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
