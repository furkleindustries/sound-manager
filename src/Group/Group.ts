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

export class Group implements IGroup {
  get type() {
    return NodeTypes.Group;
  }

  private __sounds: ISoundsMap = Object.freeze({});
  get sounds() {
    return this.__sounds;
  }

  private __panelRegistered: boolean = false;

  isWebAudio: () => boolean;
  getContextCurrentTime: () => number;
  getAnalyserNode: () => AnalyserNode;
  getGainNode: () => GainNode;
  getVolume: () => number;
  setVolume: (value: number) => this;

  constructor(options: IGroupOptions) {
    const opts = options || {};

    const {
      context,
      sounds,
      volume,
    } = opts;

    if (context) {
      this.isWebAudio = () => true;

      this.getContextCurrentTime = () => context.currentTime;

      let analyserNode = context.createAnalyser();
      this.getAnalyserNode = () => analyserNode;

      let gainNode = context.createGain();
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

  getInputNode(): AudioNode {
    return this.getGainNode();
  }

  getOutputNode(): AudioNode {
    return this.getAnalyserNode();
  }

  getSound(name: string) {
    const sound = this.sounds[name];
    if (!sound) {
      throw new Error();
    }

    return sound;
  }

  addSound(sound: ISound, name: string) {
    if (!name) {
      throw new Error();
    } else if (name in this.sounds) {
      throw new Error();
    }

    return this.addSounds({
      [name]: sound,
    });
  }

  addSounds(sounds: ISoundsMap) {
    const names = Object.keys(sounds);
    names.forEach((soundName) => {
      if (soundName in this.sounds) {
        throw new Error();
      }
    });

    if (this.isWebAudio()) {
      names.forEach((soundName) => {
        const sound = sounds[soundName];
        sound.getGroupVolume = () => this.getVolume();
        if (sound.isWebAudio()) {
          sound.getOutputNode().connect(this.getOutputNode());
        }
      });
    }

    this.__sounds = Object.freeze({
      ...this.sounds,
      ...sounds,
    });

    return this;
  }

  removeSounds(names: string | string[]) {
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

  removeAllSounds() {
    return this.removeSounds(Object.keys(this.sounds));
  }

  playSound(name: string): Promise<Event> {
    return new Promise((resolve) => (
      this.playSounds(name).then((val) => resolve(val[0])))
    );
  }

  playSounds(names: string | string[]) {
    let arr: string[];
    if (typeof names === 'string') {
      arr = [ names, ];
    } else {
      arr = names;
    }

    return Promise.all(arr.map((name) => this.getSound(name).play()));
  }

  playAllSounds() {
    return this.playSounds(Object.keys(this.sounds));
  }

  pauseSounds(names: string | string[]) {
    const pause = (name: string) => {
      if (!(name in this.sounds)) {
        throw new Error();
      }

      this.sounds[name].pause();
    };

    if (typeof names === 'string') {
      pause(names);
    } else {
      names.forEach(pause);
    }

    return this;
  }

  pauseAllSounds() {
    return this.pauseSounds(Object.keys(this.sounds));
  }

  stopSounds(names: string | string[]) {
    const stop = (name: string) => {
      this.getSound(name).stop();
    };
    
    if (typeof names === 'string') {
      stop(names);
    } else {
      names.forEach(stop);
    }

    return this;
  }

  stopAllSounds() {
    return this.stopSounds(Object.keys(this.sounds));
  }

  updateAllAudioElementsVolume() {
    Object.keys(this.sounds).forEach((soundName) => {
      const sound = this.getSound(soundName);
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
