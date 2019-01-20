import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assert,
  assertValid,
} from 'ts-assertions';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
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
  ManagerNode,
} from '../Node/Node';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  PanelRegisterableNodeMixin,
} from '../Node/PanelRegisterableNodeMixin';
import {
  TaggableNodeMixin,
} from '../Node/TaggableNodeMixin';

export class Group
  extends
    AnalysableNodeMixin(
    PanelRegisterableNodeMixin(
    TaggableNodeMixin(
      ManagerNode
    )))
  implements IGroup
{
  get type(): NodeTypes.Group {
    return NodeTypes.Group;
  }

  private __sounds: ISoundsMap = getFrozenObject();
  get sounds() {
    return this.__sounds;
  }

  constructor(options: IGroupOptions) {
    super({ ...options });

    const {
      context,
      sounds,
    } = options;

    if (context) {
      this.getInputNode().connect(this.getOutputNode());
    }

    if (sounds && typeof sounds === 'object') {
      this.addSounds(sounds);
    }
  }

  public setVolume(value: number) {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
  }

  public getSound(name: string) {
    return assertValid<ISound>(this.sounds[name]);
  }

  public getSounds(names: string[]) {
    assert(Array.isArray(names));
    return names.map(this.getSound);
  }

  public getAllSounds() {
    return this.getSounds(Object.keys(this.sounds));
  }

  public getSoundsByTag(tag: string) {
    return this.getAllSounds().filter((sound) => sound.hasTag(tag));
  }

  public getSoundsByTags(tags: string[], matchOneOrAll: 'one' | 'all' = 'one') {
    if (matchOneOrAll === 'all') {
      return this.getAllSounds().filter((sound) => (
        tags.filter(sound.hasTag).length === tags.length
      ));
    }

    return this.getAllSounds().filter((sound) => (
      tags.filter(sound.hasTag).length >= 1
    ));
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

    this.__sounds = getFrozenObject(this.sounds, sounds);

    return this;
  }

  public removeSound(name: string) {
    this.removeSounds([ name ]);
    return this;
  }

  public removeSounds(names: string[]) {
    assert(Array.isArray(names));
    const sounds = { ...this.sounds, };
    names.forEach((soundName: string) => {
      const sound = sounds[soundName];
      if (sound.isWebAudio()) {
        sound.getOutputNode().disconnect();
      }

      delete sounds[soundName];
    });
    
    this.__sounds = getFrozenObject(sounds);

    return this;
  }

  public removeAllSounds() {
    return this.removeSounds(Object.keys(this.sounds));
  }

  public playSound(name: string) {
    return this.getSound(name).play();
  }

  public playSounds(names: string[]) {
    assert(Array.isArray(names));
    return Promise.all(names.map(this.playSound));
  }

  public playAllSounds() {
    return this.playSounds(Object.keys(this.sounds));
  }

  public pauseSound(name: string) {
    this.getSound(name).pause();
    return this;
  }

  public pauseSounds(names: string[]) {
    assert(Array.isArray(names));
    names.map(this.pauseSound);

    return this;
  }

  public pauseAllSounds() {
    return this.pauseSounds(Object.keys(this.sounds));
  }

  public stopSound(name: string) {
    this.getSound(name).stop();
    return this;
  }

  public stopSounds(names: string[]) {
    assert(Array.isArray(names));
    names.map(this.stopSound);

    return this;
  }

  public stopAllSounds() {
    return this.stopSounds(Object.keys(this.sounds));
  }

  public updateAllAudioElementsVolume() {
    this.getAllSounds().forEach((sound) => {
      if (!sound.isWebAudio()) {
        sound.updateAudioElementVolume();
      }
    });

    return this;
  }
}
