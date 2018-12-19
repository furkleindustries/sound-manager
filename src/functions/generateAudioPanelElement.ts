import {
  generateVolumeInput,
} from './generateGroupVolumeInput';
import {
  ISoundManager,
} from '../SoundManager/ISoundManager';

export const generateAudioPanelElement = (manager: ISoundManager) => {
  const audioPanelElement = document.createElement('div');
  audioPanelElement.className = 'sound-manager-panel';

  const title = document.createElement('h2');
  title.className = 'sound-manager-title';
  title.textContent = 'Sound Manager Options';
  audioPanelElement.appendChild(title);

  Object.keys(manager.groups).forEach((groupName) => {
    const group = manager.getGroup(groupName);
    if (group.isPanelRegistered()) {
      audioPanelElement.appendChild(generateVolumeInput(
        groupName,
        group,
      ));
    }

    Object.keys(group.sounds).forEach((soundName) => {
      const sound = group.getSound(soundName);
      if (sound.isPanelRegistered()) {
        audioPanelElement.appendChild(generateVolumeInput(
          soundName,
          sound,
        ));
      }
    });
  });

  return audioPanelElement;
};
