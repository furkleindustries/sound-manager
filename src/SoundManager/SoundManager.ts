import {
  createSound,
} from '../functions/createSound';
import {
  generateAudioPanelElement,
} from '../functions/generateAudioPanelElement';
import {
  Group,
} from '../Group/Group';
import {
  IGroup,
} from '../Group/IGroup';
import {
  ICreateSoundOptions,
} from '../interfaces/ICreateSoundOptions';
import {
  IGroupsMap,
} from './IGroupsMap';
import {
  IGroupOptions,
} from '../Group/IGroupOptions';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundManager,
} from './ISoundManager';
import {
  ISoundManagerOptions,
} from './ISoundManagerOptions';
import {
  ISoundsMap,
} from '../Group/ISoundsMap';
import { updateAudioPanelElement } from '../functions/updateAudioPanelElement';

export class SoundManager implements ISoundManager {
  private __groups: IGroupsMap = Object.freeze({});
  get groups() {
    return this.__groups;
  }

  private __audioPanelElement: HTMLElement | null = null;
 
  public readonly isWebAudio: () => boolean;
  public readonly getAudioContext: () => AudioContext;
  public readonly getInputNode: () => AudioNode;
  public readonly getOutputNode: () => AudioNode;
  public readonly getGainNode: () => GainNode;
  public readonly getAnalyserNode: () => AnalyserNode;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => this;

  constructor(options?: ISoundManagerOptions) {
    const opts = options || {};
    const {
      groups,
      context,
      masterVolume,
    } = opts;

    this.isWebAudio = () => true;
    if (context) {
      this.getAudioContext = () => context;
    } else if (
      AudioContext ||
      // @ts-ignore
      webkitAudioContext)
    {
      const context = new (
        AudioContext ||
        // @ts-ignore
        webkitAudioContext
      )();

      this.getAudioContext = () => context;
    } else {
      this.isWebAudio = () => false;
      this.getAudioContext = () => {
        throw new Error();
      };
    }

    if (this.isWebAudio()) {
      const analyserNode = this.getAudioContext().createAnalyser();
      this.getAnalyserNode = () => analyserNode;
      const gainNode = this.getAudioContext().createGain();
      this.getGainNode = () => gainNode;
  
      this.getInputNode = () => this.getAnalyserNode();
      this.getOutputNode = () => this.getGainNode();

      this.getInputNode().connect(this.getOutputNode());
      this.getOutputNode().connect(this.getAudioContext().destination);

      this.getVolume = () => this.getGainNode().gain.value;
      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getAudioContext().currentTime,
        );

        return this.updateAllAudioElementsVolume();
      }
    } else {
      this.getAnalyserNode = () => {
        throw new Error();
      };

      this.getGainNode = () => {
        throw new Error();
      };

      this.getInputNode = () => {
        throw new Error();
      };

      this.getOutputNode = () => {
        throw new Error();
      };

      let volume = 1;
      this.getVolume = () => volume;
      this.setVolume = (value: number) => {
        volume = value;
        return this.updateAllAudioElementsVolume();
      };
    }

    this.__groups = Object.freeze({
      default: this.createGroup(),
    });

    if (groups) {
      this.__groups = Object.freeze({ ...groups, });
      Object.keys(this.groups).forEach((groupName) => {
        const group = this.groups[groupName];
        if (this.isWebAudio()) {
          group.getOutputNode().connect(this.getInputNode());
        }
      });
    }

    if (typeof masterVolume !== 'undefined') {
      this.setVolume(masterVolume);
    }
  }

  createGroup(options?: Partial<IGroupOptions>) {
    if (this.isWebAudio()) {
      return new Group(Object.assign({}, options, {
        context: this.getAudioContext(),
      }));
    } else {
      return new Group(Object.assign({}, options));
    }
  }

  getGroup(name: string) {
    const group = this.groups[name];
    if (!group) {
      throw new Error();
    }

    return group;
  }

  addGroup(name: string, group: IGroup) {
    return this.addGroups({
      [name]: group,
    });
  }

  addGroups(groups: IGroupsMap) {
    const names = Object.keys(groups);
    names.forEach((groupName) => {
      if (groupName in this.groups) {
        throw new Error();
      }
    });

    if (this.isWebAudio()) {
      names.forEach((groupName) => {
        const group = groups[groupName];
        if (group.isWebAudio()) {
          group.getOutputNode().connect(this.getInputNode());
        }
      });
    }

    this.__groups = Object.freeze({
      ...this.groups,
      ...groups,
    });

    return this;
  }

  removeGroup(name: string) {
    return this.removeGroups(name);
  }

  removeGroups(names: string | string[]) {
    const remove = (groupName: string) => {
      const groups = Object.assign(this.groups);
      const group = groups[groupName];
      if (group.isWebAudio()) {
        group.getOutputNode().disconnect();
      }

      delete groups[groupName];
      this.__groups = Object.freeze(groups);
    };

    if (typeof names === 'string') {
      remove(names);
    } else {
      names.forEach(remove);
    }

    if (!('default' in this.groups)) {
      /* Re-add a (now-empty) default group. */
      if (this.isWebAudio()) {
        this.addGroups({
          default: this.createGroup({ context: this.getAudioContext(), }),
        });
      } else {
        this.addGroups({
          default: this.createGroup(),
        });
      }
    }

    return this;
  }

  removeAllGroups() {
    return this.removeGroups(Object.keys(this.groups));
  }

  createSound(url: string, options?: ICreateSoundOptions): Promise<ISound> {
    if (this.isWebAudio()) {
      return createSound(url, {
        ...options,
        context: this.getAudioContext(),
        manager: this,
      });
    } else {
      return createSound(url, {
        ...options,
        manager: this,
      });
    }
  }

  getSound(name: string, groupName: string = 'default') {
    const group = this.getGroup(groupName);
    return group.getSound(name);
  }

  addSound(name: string, sound: ISound, groupName: string = 'default') {
    return this.addSounds({
      [name]: sound,
    }, groupName);
  }

  addSounds(sounds: ISoundsMap, groupName: string = 'default') {
    if (!(groupName in this.groups)) {
      throw new Error();
    }

    this.groups[groupName].addSounds(sounds);

    return this;
  }

  removeSound(name: string, groupName: string = 'default') {
    return this.removeSounds(name, groupName);
  }

  removeSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).removeSounds(names);
    return this;
  }

  removeAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).removeAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).removeAllSounds();
      });
    }

    return this;
  }

  playSound(name: string, groupName: string = 'default') {
    return this.playSounds(name, groupName);
  }

  playSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).playSounds(names);
    return this;
  }

  playAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).playAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).playAllSounds();
      });
    }

    return this;
  }

  pauseSound(name: string, groupName: string = 'default') {
    return this.pauseSounds(name, groupName);
  }

  pauseSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).pauseSounds(names);
    return this;
  }

  pauseAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).pauseAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).pauseAllSounds();
      });
    }

    return this;
  }

  stopSound(name: string, groupName: string = 'default') {
    return this.stopSounds(name, groupName);
  }

  stopSounds(names: string | string[], groupName: string = 'default') {
    this.getGroup(groupName).stopSounds(names);
    return this;
  }

  stopAllSounds(groupName?: string) {
    if (groupName) {
      this.getGroup(groupName).stopAllSounds();
    } else {
      Object.keys(this.groups).forEach((groupName) => {
        this.getGroup(groupName).stopAllSounds();
      });
    }

    return this;
  }

  getGroupVolume(name: string = 'default') {
    return this.getGroup(name).getVolume();
  }

  setGroupVolume(value: number, groupName: string = 'default') {
    this.getGroup(groupName).setVolume(value);
    return this;
  }

  getSoundVolume(name: string, groupName: string = 'default') {
    return this.getGroup(groupName).getSound(name).getVolume();
  }

  setSoundVolume(name: string, value: number, groupName: string = 'default') {
    this.getGroup(groupName).getSound(name).setVolume(value);
    return this;
  }

  updateAllAudioElementsVolume() {
    Object.keys(this.groups).forEach((groupName) => {
      this.getGroup(groupName).updateAllAudioElementsVolume();
    });

    return this;
  }

  generateAudioPanelElement(): HTMLElement {
    this.__audioPanelElement = generateAudioPanelElement(this);
    return this.__audioPanelElement;
  }

  updateAudioPanelElement() {
    if (!this.__audioPanelElement) {
      throw new Error();
    }

    const newElem = updateAudioPanelElement(this, this.__audioPanelElement);
    this.__audioPanelElement = newElem;
    return this;
  }

  panelRegister(soundOrGroup: ISound | IGroup) {
    // @ts-ignore
    soundOrGroup.__panelRegistered = true;
    if (this.__audioPanelElement) {
      this.updateAudioPanelElement();
    }

    return this;
  }

  panelDeregister(soundOrGroup: ISound | IGroup) {
    // @ts-ignore
    soundOrGroup.__panelRegistered = false;
    if (this.__audioPanelElement) {
      this.updateAudioPanelElement();
    }
    return this;
  }
}
