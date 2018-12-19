import {
  IAnalysableNode,
} from '../interfaces/IAnalysableNode';
import {
  IGroup,
} from '../Group/IGroup';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundOptions,
} from '../Sound/ISoundOptions';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import {
  IWebAudioNode,
} from '../interfaces/IWebAudioNode';

export interface ISoundManager extends IWebAudioNode, IAnalysableNode {
  readonly groups: IGroupsMap;
  getAudioContext(): AudioContext;
  getGroup(name: string): IGroup;
  addGroup(name: string, group: IGroup): ISoundManager;
  addGroups(groups: IGroupsMap): ISoundManager;
  removeGroups(names: string | string[]): ISoundManager;
  removeAllGroups(): ISoundManager;
  createSound(url: string, options?: Partial<ISoundOptions>): Promise<ISound>;
  getSound(name: string, groupName?: string): ISound;
  addSound(name: string, sound: ISound, groupName?: string): ISoundManager;
  addSounds(sounds: ISoundsMap, groupName?: string): ISoundManager;
  removeSound(name: string, groupName?: string): ISoundManager;
  removeSounds(names: string | string[], groupName?: string): ISoundManager;
  removeAllSounds(groupName?: string): ISoundManager;
  playSound(name: string, groupName?: string): ISoundManager;
  playSounds(names: string | string[], groupName?: string): ISoundManager;
  playAllSounds(groupName?: string): ISoundManager;
  pauseSound(name: string, groupName?: string): ISoundManager;
  pauseSounds(names: string | string[], groupName?: string): ISoundManager;
  pauseAllSounds(groupName?: string): ISoundManager;
  stopSound(name: string, groupName?: string): ISoundManager;
  stopSounds(names: string | string[], groupName?: string): ISoundManager;
  stopAllSounds(groupName?: string): ISoundManager;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): ISoundManager;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): ISoundManager;
  updateAllAudioElementsVolume(): ISoundManager;
  generateAudioPanelElement(): HTMLElement;
  updateAudioPanelElement(): ISoundManager;
  panelRegister(soundOrGroup: ISound | IGroup): ISoundManager;
  panelDeregister(soundOrGroup: ISound | IGroup): ISoundManager;
}
