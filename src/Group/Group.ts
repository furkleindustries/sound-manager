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
  isValidVolume,
} from '../functions/isValidVolume';
import {
  BaseNode,
} from '../Node/BaseNode';
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
      BaseNode
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
      tags,
      volume,
    } = options;

    if (context) {
      this.getInputNode().connect(this.getOutputNode());
    }

    if (sounds && typeof sounds === 'object') {
      this.addSounds(sounds);
    }

    if (tags) {
      tags.forEach(this.addTag);
    }

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }

    this.panelRegister();
  }

  public readonly setVolume = (value: number) => {
    super.setVolume(value);
    this.updateAllAudioElementsVolume();

    return this;
  };

  public readonly hasSound = (name: string) => (
    name in this.sounds
  );

  public readonly hasSounds = (names: string[]) => (
    !names.find((name) => !this.hasSound(name))
  );

  public readonly getSound = (name: string) => assertValid<ISound>(
    this.sounds[name],
  );

  public readonly getSounds = (names: string[]) => (
    assert(Array.isArray(names)) && names.map((name) => this.getSound(name))
  );

  public readonly getAllSounds = () => (
    this.getSounds(Object.keys(this.sounds))
  );

  public readonly getSoundsByTag = (tag: string) => (
    this.getAllSounds().filter((sound) => sound.hasTag(tag))
  );

  public readonly getSoundsByTags = (
    tags: string[],
    matchOneOrAll: 'one' | 'all' = 'one',
  ) => this.getAllSounds().filter((sound) => (
    matchOneOrAll === 'all' ?
      tags.filter(sound.hasTag).length === tags.length :
      tags.filter(sound.hasTag).length >= 1
  ));

  private readonly __registeredAdditionIntents: Record<string, boolean> = {};
  public readonly registerIntentToAddSound = (name: string) => {
    assert(!(name in this.__registeredAdditionIntents));
    this.__registeredAdditionIntents[name] = true;

    return this;
  };

  public readonly deregisterIntentToAddSound = (name: string) => (
    void delete this.__registeredAdditionIntents[name]
  );

  public readonly hasIntentToAddSound = (name: string) => (
    name in this.__registeredAdditionIntents
  );

  public readonly addSound = (name: string, sound: ISound) => (
    this.addSounds({ [name]: sound })
  );

  public readonly addSounds = (sounds: ISoundsMap) => {
    const names = Object.keys(sounds);
    const isWebAudio = this.isWebAudio();
    const volumeGetter = () => this.getVolume();
    names.forEach((soundName) => {
      assert(soundName)
      assert(!(soundName in this.sounds));
      assert(sounds[soundName]);
      const sound = sounds[soundName];
      sound.getGroupVolume = volumeGetter;

      if (isWebAudio && sound.isWebAudio()) {
        sound.getOutputNode().connect(this.getOutputNode());
      }
    });

    this.__sounds = getFrozenObject(this.sounds, sounds);

    return this;
  };

  public readonly removeSound = (name: string) => {
    this.removeSounds([ name ]);
    return this;
  };

  public readonly removeSounds = (names: string[]) => {
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
  };

  public readonly removeAllSounds = () => (
    this.removeSounds(Object.keys(this.sounds))
  );

  public readonly playSound = (name: string) => this.getSound(name).play();

  public readonly playSounds = (names: string[]) => {
    assert(Array.isArray(names));
    return Promise.all(names.map((name) => this.playSound(name)));
  };

  public readonly playAllSounds = () => (
    this.playSounds(Object.keys(this.sounds))
  );

  public readonly pauseSound = (name: string) => {
    this.getSound(name).pause();
    return this;
  };

  public readonly pauseSounds = (names: string[]) => {
    assert(Array.isArray(names));
    names.map((name) => this.pauseSound(name));

    return this;
  };

  public readonly pauseAllSounds = () => (
    this.pauseSounds(Object.keys(this.sounds))
  );

  public readonly stopSound = (name: string) => {
    this.getSound(name).stop();
    return this;
  };

  public readonly stopSounds = (names: string[]) => {
    assert(Array.isArray(names));
    names.map((name) => this.stopSound(name));

    return this;
  };

  public readonly stopAllSounds = () => (
    this.stopSounds(Object.keys(this.sounds))
  );

  public readonly updateAllAudioElementsVolume = () => {
    this.getAllSounds().forEach((sound) => {
      if (!sound.isWebAudio()) {
        sound.updateAudioElementVolume();
      }
    });

    return this;
  };
}
