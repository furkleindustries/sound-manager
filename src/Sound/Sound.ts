import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';

export class Sound implements ISound {
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

  getVolume() {
    if (this.isWebAudio()) {
      return this.getGainNode().gain.value;
    } else {
      return this.__audioElement!.volume;
    }
  }

  setVolume(value: number): ISound {
    if (this.isWebAudio()) {
      this.getGainNode().gain.setValueAtTime(
        value,
        this.getContextCurrentTime(),
      );
    } else {        
      this.__audioElement!.volume = value;
    }

    return this;
  };

  getInputNode() {
    return this.getSourceNode();
  }

  getOutputNode() {
    return this.getGainNode();
  }

  setLoop(doLoop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = doLoop;
    } else {
      this.__audioElement!.loop = doLoop;
    }

    return this;
  }

  getTrackPosition() {
    if (this.isWebAudio()) {
      if (this.playing) {
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
      if (this.playing) {
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
    const trackPosition = this.trackPosition || 0;
    this.sourceNode.start(trackPosition);
    this.__startedTime = this.getContextCurrentTime() - trackPosition;
    this.__pausedTime = 0;
    this.__playing = true;
    return this;
  }

  pause() {
    if (this.playing) {
      this.sourceNode.stop();
    }

    this.__pausedTime = this.trackPosition;
    this.__startedTime = 0;
    this.__playing = false;

    return this;
  }

  stop() {
    if (this.playing) {
      this.sourceNode.stop();
    }

    this.__startedTime = 0;
    this.__pausedTime = 0;
    this.__playing = false;

    return this;
  }

  rewind(seconds: number) {
    if (this.playing) {
      this.sourceNode.stop();
      this.__startedTime += seconds;
      this.sourceNode.start(this.trackPosition);
    } else {
      this.__pausedTime -= seconds;
    }

    return this;
  }

  fastForward(seconds: number) {
    if (this.playing) {
      this.sourceNode.stop();
      this.__startedTime -= seconds;
      this.sourceNode.start(this.trackPosition);
    } else {
      this.__pausedTime += seconds;
    }

    return this;
  }
}
