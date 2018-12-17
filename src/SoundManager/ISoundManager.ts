import {
  IAudioInputOutputNode,
} from '../interfaces/IAudioInputOutputNode';
import {
  IGroup,
} from '../Group/IGroup';
import {
  ISound,
} from '../Sound/ISound';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';

export interface ISoundManager extends IAudioInputOutputNode {
  readonly groups: IGroupsMap;
  readonly audioContext: AudioContext;
  readonly analyserNode: AnalyserNode;
  readonly gainNode: GainNode;
  readonly masterVolume: number;
  getGroup(name: string): IGroup;
  addGroups(groups: IGroupsMap): ISoundManager;
  removeGroups(names: string | string[]): ISoundManager;
  clearAllGroups(): ISoundManager;
  getSound(name: string, groupName?: string): ISound | null;
  addSounds(sounds: ISoundsMap, groupName?: string): ISoundManager;
  removeSounds(names: string | string[], groupName?: string): ISoundManager;
  clearAllSounds(): ISoundManager;
  playSounds(names: string | string[], groupName?: string): ISoundManager;
  playAllSounds(groupName?: string): ISoundManager;
  pauseSounds(names: string | string[], groupName?: string): ISoundManager;
  pauseAllSounds(groupName?: string): ISoundManager;
  stopSounds(names: string | string[], groupName?: string): ISoundManager;
  stopAllSounds(groupName?: string): ISoundManager;
  setMasterVolume(value: number): ISoundManager;
  getGroupVolume(name?: string): number;
  setGroupVolume(value: number, groupName?: string): ISoundManager;
  getSoundVolume(name: string, groupName?: string): number;
  setSoundVolume(name: string, value: number, groupName?: string): ISoundManager;
}
