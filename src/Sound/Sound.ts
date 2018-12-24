import {
  IFade,
} from '../Fade/IFade';
import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import { EasingCurves } from '../Fade/EasingCurves';
import { getFadeValueAtTime } from '../functions/getFadeValueAtTime';
import { IFadeArgumentObject } from '../Fade/IFadeArgumentObject';

export class Sound implements ISound {
  get type() {
    return NodeTypes.Sound;
  }

  private __audioElement: HTMLAudioElement | null = null;
  private __startedTime: number = 0;
  private __pausedTime: number = 0; 
  private __playing: boolean = false;
  private __panelRegistered: boolean = false;
  private __promise: Promise<Event> | null = null;
  private __fade: IFade | null = null;

  public readonly isWebAudio: () => boolean;
  public readonly getContextCurrentTime: () => number;
  public readonly getSourceNode: () => AudioBufferSourceNode;
  public readonly getGainNode: () => GainNode;
  public readonly getManagerVolume: () => number;
  public readonly updateAudioElementVolume: () => ISound;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => ISound;
  public getGroupVolume: () => number;

  constructor(options: ISoundOptions) {
    const {
      audioElement,
      autoplay,
      buffer,
      context,
      fade,
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

      this.updateAudioElementVolume = () => {
        /* Set the audio element volume to the product of manager, group, and
         * sound volumes. */
        this.__audioElement!.volume =
          this.getManagerVolume() *
          this.getGroupVolume() *
          this.getFadeVolume() *
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

    if (fade) {
      this.__fade = fade;
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

  getDuration() {
    if (this.isWebAudio()) {
      const source = this.getSourceNode()!;
      if (source.buffer) {
        return source.buffer.duration;
      } else {
        console.log('No buffer found for sound.');
      }
    } else {
      return this.__audioElement!.duration;
    }

    return 0;
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

  getFade() {
    return this.__fade;
  }

  setFade(fade: IFade | null) {
    this.__fade = fade;
    return this;
  }

  setLoop(doLoop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = doLoop;
    } else {
      this.__audioElement!.loop = doLoop;
    }

    return this;
  }

  play(fadeOverride?: IFade) {
    const trackPosition = this.getTrackPosition();

    this.__playing = true;
    let source: AudioBufferSourceNode | HTMLAudioElement;
    if (this.isWebAudio()) {
      source = this.getSourceNode();
      source.start(trackPosition);
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
      this.__pausedTime = 0;
    } else {
      source = this.__audioElement!;
      /* Set the actual audio element volume to the product of manager, group,
       * and sound volumes. */
      this.updateAudioElementVolume();
      source.currentTime = this.__pausedTime;
      source.play();
    }

    if (!this.__promise) {
      const fade = fadeOverride || this.getFade();

      let timeUpdate: () => void;
      if (fade) {
        timeUpdate = () => {
          const trackPosition = this.getTrackPosition();
          if (fade.length.in > trackPosition) {
            this.updateAudioElementVolume();
          } else if (fade.length.out > duration - trackPosition) {
            this.updateAudioElementVolume();
          }
        };

        const duration = this.getDuration();
        
        if (this.isWebAudio()) {
          const src = source as AudioBufferSourceNode;
          const gainNode = this.getGainNode();
          for (let ii = 0; ii < duration * 20; ii += 1) {
            const time = ii / 20;
            gainNode.gain.setValueAtTime(this.getFadeValueAtTime(
              time,
              duration,
              fade.easingCurve,
            ));
          }
        } else {
          source.addEventListener('timeupdate', timeUpdate);
        }
      }

      this.__promise = new Promise((resolve) => {  
        const ended = (e: Event) => {
          /* Remove the now-fulfilled promise. */
          this.__promise = null;

          /* Remove the 'ended' event listener. */
          source.removeEventListener('ended', ended);

          if (timeUpdate) {
            source.removeEventListener('timeupdate', timeUpdate);
          }

          /* Reset the track position of the sound after it ends. */
          this.stop();

          /* Resolve the promise with the ended event. */
          return resolve(e);
        };

        source.addEventListener('ended', ended);
      });
    }

    return this.__promise;
  }

  pause() {
    this.__playing = false;

    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
      }

      this.__pausedTime = this.getTrackPosition();
      this.__startedTime = 0;
    } else {
      this.__audioElement!.pause();
      this.__pausedTime = this.getTrackPosition();
    }

    return this;
  }

  stop() {
    this.__playing = false;

    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
      }

      this.__startedTime = 0;
      this.__pausedTime = 0;
    } else {
      const elem = this.__audioElement!;
      elem.pause();
      elem.currentTime = 0;
      this.__pausedTime = 0;
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

  getFadeVolume() {
    const fade = this.getFade();
    const trackPosition = this.getTrackPosition();
    const duration = this.getDuration();
    if (fade) {
      if (fade.length.in > trackPosition) {
        return this.getFadeValueAtTime(
          trackPosition,
          0,
          fade.length.in,
          fade.easingCurve,
        );
      } else if (fade.length.out > duration - trackPosition) {
        return this.getFadeValueAtTime(
          trackPosition,
          duration - fade.length.out,
          fade.length.out,
          fade.easingCurve,
        );
      }
    }

    return 1;
  }

  getFadeValueAtTime(time: number, initial: number, length: number, curves: IFadeArgumentObject<EasingCurves>) {
    return getFadeValueAtTime(time, initial, length, curves);
  }
}
