import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assert,
} from '../assertions/assert';
import {
  ManagerNode,
} from '../Node/ManagerNode';
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

export class Group extends AnalysableNodeMixin(ManagerNode) implements IGroup {
  get type() {
    return NodeTypes.Group;
  }

  private __sounds: ISoundsMap = Object.freeze({});
  get sounds() {
    return this.__sounds;
  }

  public __panelRegistered: boolean = false;

  constructor(options: IGroupOptions) {
    super(options);

    const {
      context,
      sounds,
      volume,
    } = options;

    if (context) {
      this.getInputNode().connect(this.getOutputNode());
    }

    if (sounds && typeof sounds === 'object') {
      this.addSounds(sounds);
    }

    if (typeof volume !== 'undefined') {
      this.setVolume(volume);
    }
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
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
      const sounds = { ...this.sounds, };
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
