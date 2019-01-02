import {
  getOneOrMany,
} from '../functions/getOneOrMany';
import {
  IGroup,
} from './IGroup';
import {
  IGroupOptions,
} from './IGroupOptions';
import {
  ISound,
} from '../Sound/ISound';
import {
  ISoundsMap,
} from './ISoundsMap';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import { assert } from '../assertions/assert';

export class Group implements IGroup {
  get type() {
    return NodeTypes.Group;
  }

  private __sounds: ISoundsMap = Object.freeze({});
  get sounds() {
    return this.__sounds;
  }

  public __panelRegistered: boolean = false;

  public readonly isWebAudio: () => boolean;
  public readonly getContextCurrentTime: () => number;
  public readonly getAnalyserNode: () => AnalyserNode;
  public readonly getGainNode: () => GainNode;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => this;

  constructor({
    context,
    sounds,
    volume,
  }: IGroupOptions)
  {
    if (context) {
      this.isWebAudio = () => true;

      this.getContextCurrentTime = () => context.currentTime;

      const analyserNode = context.createAnalyser();
      this.getAnalyserNode = () => analyserNode;

      const gainNode = context.createGain();
      this.getGainNode = () => gainNode;

      this.getInputNode().connect(this.getOutputNode());

      this.getVolume = () => this.getGainNode().gain.value;
      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getContextCurrentTime(),
        );

        this.updateAllAudioElementsVolume();

        return this;
      };
    } else {
      this.isWebAudio = () => false;

      this.getContextCurrentTime = () => {
        throw new Error();
      };

      this.getAnalyserNode = () => {
        throw new Error();
      };

      this.getGainNode = () => {
        throw new Error();
      };

      let volume = 1;
      this.getVolume = () => volume;
      this.setVolume = (value: number) => {
        volume = value;
        this.updateAllAudioElementsVolume();

        return this;
      };
    }

    if (sounds && typeof sounds === 'object') {
      this.addSounds(sounds);
    }

    if (typeof volume !== 'undefined') {
      this.setVolume(volume);
    }
  }

  public getInputNode(): AudioNode {
    return this.getGainNode();
  }

  public getOutputNode(): AudioNode {
    return this.getAnalyserNode();
  }

  public getSounds(name: string): ISound;
  public getSounds(names: string[]): ISound[];
  public getSounds(names: string | string[]): ISound | ISound[] {
    return getOneOrMany(names as string, this.sounds);
  }

  public addSound(name: string, sound: ISound) {
    return this.addSounds({ [name]: sound, });
  }

  public addSounds(sounds: ISoundsMap) {
    const names = Object.keys(sounds);
    const isWebAudio = this.isWebAudio();
    names.forEach((soundName) => {
      assert(soundName)
      assert(!(soundName in this.sounds));
      assert(sounds[soundName]);
      if (isWebAudio) {
        const sound = sounds[soundName];
        /* istanbul ignore next */
        sound.getGroupVolume = () => this.getVolume();
        if (sound.isWebAudio()) {
          sound.getOutputNode().connect(this.getOutputNode());
        }
      }
    });

    this.__sounds = Object.freeze({
      ...this.sounds,
      ...sounds,
    });

    return this;
  }

  public removeSounds(name: string): IGroup;
  public removeSounds(names: string[]): IGroup;
  public removeSounds(names: string | string[]) {
    const remove = (soundName: string) => {
      const sounds = Object.assign({}, this.sounds) as any;
      const sound = sounds[soundName];
      if (sound.isWebAudio()) {
        sound.getOutputNode().disconnect();
      }

      delete sounds[soundName];
      this.__sounds = Object.freeze(sounds);
    };

    if (typeof names === 'string') {
      remove(names);
    } else {
      names.forEach(remove);
    }

    return this;
  }

  public removeAllSounds() {
    return this.removeSounds(Object.keys(this.sounds));
  }

  public playSounds(name: string): Promise<Event>;
  public playSounds(names: string[]): Promise<Event[]>;
  public playSounds(names: string | string[]) {
    if (typeof names === 'string') {
      return this.getSounds(name).play();
    } else if (Array.isArray(names)) {
      return Promise.all(names.map((name) => this.getSounds(name).play()));
    }
    
    throw new Error();
  }

  public playAllSounds() {
    return this.playSounds(Object.keys(this.sounds));
  }

  public pauseSounds(name: string): IGroup;
  public pauseSounds(names: string[]): IGroup;
  public pauseSounds(names: string | string[]) {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else if (Array.isArray(names)) {
      arr = names;
    } else {
      throw new Error();
    }

    arr.forEach((name) => this.getSounds(name).pause());

    return this;
  }

  public pauseAllSounds() {
    return this.pauseSounds(Object.keys(this.sounds));
  }

  public stopSound(name: string) {
    return this.stopSounds(name);
  }

  public stopSounds(name: string): IGroup;
  public stopSounds(names: string[]): IGroup;
  public stopSounds(names: string | string[]) {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    arr.forEach((name) => this.getSounds(name).stop());

    return this;
  }

  public stopAllSounds() {
    return this.stopSounds(Object.keys(this.sounds));
  }

  public updateAllAudioElementsVolume() {
    Object.keys(this.sounds).forEach((soundName) => {
      const sound = this.getSounds(soundName);
      if (!sound.isWebAudio()) {
        sound.updateAudioElementVolume();
      }
    });

    return this;
  }

  isPanelRegistered() {
    return this.__panelRegistered;
  }
}
