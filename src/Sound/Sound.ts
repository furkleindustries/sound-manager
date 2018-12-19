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

  private __panelRegistered: boolean = false;

  public readonly isWebAudio: () => boolean;
  public readonly getContextCurrentTime: () => number;
  public readonly getSourceNode: () => AudioBufferSourceNode;
  public readonly getGainNode: () => GainNode;
  public readonly getManagerVolume: () => number;
  public getGroupVolume: () => number;
  public readonly updateAudioElementVolume: () => ISound;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => ISound;

  constructor(options: ISoundOptions) {
    const {
      audioElement,
      autoplay,
      buffer,
      context,
      getManagerVolume,
      loop,
      trackPosition,
      volume,
    } = options;

    if (typeof getManagerVolume !== 'function') {
      throw new Error();
    }

    this.getManagerVolume = getManagerVolume;
    this.getGroupVolume = () => 1;

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

      this.getVolume = () => this.getGainNode().gain.value;

      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getContextCurrentTime(),
        );

        return this;
      };

      this.updateAudioElementVolume = () => this;
    } else if (audioElement) {
      this.__audioElement = audioElement;
      
      this.__audioElement.addEventListener('timeupdate', (/*e*/) => {
        //const tgt = e.target as HTMLAudioElement
        //console.log(tgt.currentTime, tgt.currentTime === tgt.duration ? 'Completed.' : 'Not completed.');
      });

      this.updateAudioElementVolume = () => {
        /* Set the audio element volume to the product of manager, group, and
         * sound volumes. */
        this.__audioElement!.volume =
          this.getManagerVolume() *
          this.getGroupVolume() *
          this.getVolume();

        return this;
      };

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

      let volume = 1;
      this.getVolume = () => volume;
      this.setVolume = (value: number) => {
        volume = value;
        return this.updateAudioElementVolume();
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
      /* Set the actual audio element volume to the product of manager, group,
       * and sound volumes. */
      this.updateAudioElementVolume();
      this.__audioElement!.currentTime = this.__pausedTime;
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
      this.__pausedTime = this.getTrackPosition();
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
      this.__pausedTime = 0;
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

  isPanelRegistered() {
    return this.__panelRegistered;
  }
}
