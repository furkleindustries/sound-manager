import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';

export class Sound implements ISound {
  private __sourceNode: AudioBufferSourceNode
  get sourceNode() {
    return this.__sourceNode;
  }

  private __gainNode: GainNode;
  get gainNode() {
    return this.__gainNode;
  }

  get volume() {
    return this.__gainNode.gain.value;
  }

  get loop() {
    return this.__sourceNode.loop;
  }
  
  private __startedTime: number = 0;
  private __pausedTime: number = 0;
  
  get trackPosition() {
    if (this.playing) {
      return this.getContextCurrentTime() - this.__startedTime;
    }

    return this.__pausedTime;
  }

  private __playing: boolean = false;
  get playing() {
    return this.__playing;
  }

  getContextCurrentTime: () => number;

  constructor(options: ISoundOptions) {
    const {
      autoplay,
      buffer,
      context,
      loop,
      trackPosition,
      volume,
    } = options;

    this.getContextCurrentTime = () => context.currentTime;

    if (!context) {
      throw new Error();
    }

    this.__startedTime = this.getContextCurrentTime();

    if (buffer) {
      const sourceNode = context.createBufferSource();
      sourceNode.buffer = buffer;
      this.__sourceNode = sourceNode;
      const gainNode = context.createGain();
      sourceNode.connect(gainNode);
      this.__gainNode = gainNode;
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

  setVolume(value: number) {
    if (value >= 0 && value <= 1) {
      this.gainNode.gain.value = value;
    } else {
      throw new Error();
    }

    return this;
  }

  setLoop(doLoop: boolean) {
    this.sourceNode.loop = doLoop;
    return this;
  }

  setTrackPosition(trackPosition: number) {
    if (this.playing) {
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
    } else {
      this.__pausedTime = trackPosition;
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
    this.sourceNode.stop();
    this.__pausedTime = this.trackPosition;
    this.__startedTime = 0;
    this.__playing = false;
    return this;
  }

  stop() {
    this.sourceNode.stop();
    this.__startedTime = 0;
    this.__pausedTime = 0;
    this.__playing = false;
    return this;
  }

  rewind(seconds: number) {
    this.sourceNode.stop();
    if (this.playing) {
      this.__startedTime += seconds;
      this.sourceNode.start(this.trackPosition);
    } else {
      this.__pausedTime -= seconds;
    }

    return this;
  }

  fastForward(seconds: number) {
    this.sourceNode.stop();
    if (this.playing) {
      this.__startedTime -= seconds;
      this.sourceNode.start(this.trackPosition);
    } else {
      this.__pausedTime += seconds;
    }

    return this;
  }
}
