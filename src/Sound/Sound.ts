import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';

export class Sound implements ISound {
  private __startedTime: number = 0;
  private __pausedTime: number = 0; 
  private __playing: boolean = false;

  private __audioElement: HTMLAudioElement | null = null;

  isWebAudio: () => boolean;
  getContextCurrentTime: () => number;
  getSourceNode: () => AudioBufferSourceNode;
  getGainNode: () => GainNode;

  constructor(options: ISoundOptions) {
    const {
      audioElement,
      autoplay,
      buffer,
      context,
      loop,
      trackPosition,
      volume,
    } = options;

    if (context) {
      this.isWebAudio = () => true;
      this.getContextCurrentTime = () => context.currentTime;

      if (buffer) {
        const sourceNode = context.createBufferSource();
        sourceNode.buffer = buffer;
        this.getSourceNode = () => sourceNode;

        const gainNode = context.createGain();
        this.getSourceNode().connect(gainNode);
        this.getGainNode = () => gainNode;
      } else {
        throw new Error();
      }
    } else if (audioElement) {
      this.__audioElement = audioElement;

      this.isWebAudio = () => false;
      this.getContextCurrentTime = () => {
        throw new Error();
      };

      this.getSourceNode = () => {
        throw new Error();
      };

      this.getGainNode = () => {
        throw new Error();
      };
    } else {
      throw new Error();
    }

    if (typeof volume !== 'undefined' && volume >= 0 && volume <= 1) {
      this.setVolume(volume);
    }

    if (typeof loop === 'boolean') {
      this.setLoop(loop);
    }

    if (typeof trackPosition !== 'undefined' && trackPosition > 0) {
      this.setTrackPosition(trackPosition);
    }

    if (autoplay === true) {
      this.play();
    }
  }

  getInputNode() {
    return this.getSourceNode();
  }

  getOutputNode() {
    return this.getGainNode();
  }

  getPlaying() {
    if (this.isWebAudio()) {
      return this.__playing;
    } else {
      return !this.__audioElement!.paused;
    }
  }

  getLoop() {
    if (this.isWebAudio()) {
      return this.getSourceNode().loop;
    } else {
      return this.__audioElement!.loop;
    }
  }

  setLoop(doLoop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = doLoop;
    } else {
      this.__audioElement!.loop = doLoop;
    }

    return this;
  }

  getVolume() {
    if (this.isWebAudio()) {
      return this.getGainNode().gain.value;
    } else {
      return this.__audioElement!.volume;
    }
  }

  setVolume(value: number): this {
    if (this.isWebAudio()) {
      this.getGainNode().gain.setValueAtTime(
        value,
        this.getContextCurrentTime(),
      );
    } else {        
      this.__audioElement!.volume = value;
    }

    return this;
  }

  getTrackPosition() {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        return this.getContextCurrentTime() - this.__startedTime;
      } else {
        return this.__pausedTime;
      }
    } else {
      return this.__audioElement!.currentTime;
    }
  }

  setTrackPosition(trackPosition: number) {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.__startedTime = this.getContextCurrentTime() - trackPosition;
      } else {
        this.__pausedTime = trackPosition;
      }
    } else {
      this.__audioElement!.currentTime = trackPosition;
    }

    return this;
  }

  play() {
    const trackPosition = this.getTrackPosition();
    if (this.isWebAudio()) {
      this.getSourceNode().start(trackPosition);
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
      this.__pausedTime = 0;
      this.__playing = true;
    } else {
      this.__audioElement!.currentTime = 0;
      this.__audioElement!.play();
    }

    return this;
  }

  pause() {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
      }

      this.__pausedTime = this.getTrackPosition();
      this.__startedTime = 0;
      this.__playing = false;
    } else {
      this.__audioElement!.pause();
    }

    return this;
  }

  stop() {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
      }

      this.__startedTime = 0;
      this.__pausedTime = 0;
      this.__playing = false;
    } else {
      this.__audioElement!.pause();
      this.__audioElement!.currentTime = 0;
    }

    return this;
  }

  rewind(seconds: number) {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
        this.__startedTime += seconds;
        this.getSourceNode().start(this.getTrackPosition());
      } else {
        this.__pausedTime -= seconds;
      }
    } else {
      this.__audioElement!.currentTime -= seconds;
    }

    return this;
  }

  fastForward(seconds: number) {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
        this.__startedTime -= seconds;
        this.getSourceNode().start(this.getTrackPosition());
      } else {
        this.__pausedTime += seconds;
      }
    } else {
      this.__audioElement!.currentTime += seconds;
    }

    return this;
  }
}
