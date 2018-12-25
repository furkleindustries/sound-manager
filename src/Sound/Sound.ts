import {
  EasingCurves,
} from '../Fade/EasingCurves';
import {
  Fade,
} from '../Fade/Fade';
import {
  getFadeValueAtTime,
} from '../functions/getFadeValueAtTime';
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

export class Sound implements ISound {
  get type() {
    return NodeTypes.Sound;
  }

  private __sourceNode: AudioBufferSourceNode | null = null;
  private __gainNode: GainNode | null = null;
  private __fadeGainNode: GainNode | null = null;
  private __fadeOverride?: IFade;
  private __audioElement: HTMLAudioElement | null = null;
  private __startedTime: number = 0;
  private __pausedTime: number = 0; 
  private __playing: boolean = false;
  private __panelRegistered: boolean = false;
  private __promise: Promise<Event> | null = null;
  private __fade: IFade | null = null;

  public readonly isWebAudio: () => boolean;
  public readonly getContextCurrentTime: () => number;
  public readonly getManagerVolume: () => number;
  public readonly updateAudioElementVolume: () => ISound;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => ISound;
  public getGroupVolume: () => number;
  private __stopRejection: (message?: string) => void = () => {};

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
        this.__sourceNode = context.createBufferSource();
        this.__sourceNode.buffer = buffer;

        this.__gainNode = context.createGain();
        this.__sourceNode.connect(this.__gainNode);
      } else {
        throw new Error();
      }

      this.getVolume = () => this.getGainNode()!.gain.value;

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
         * fade, and sound volumes. */
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
      if (typeof fade === 'boolean') {
        this.__fade = new Fade();
      } else {
        this.__fade = new Fade(fade);
      }
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

  getSourceNode() {
    if (!this.isWebAudio()) {
      throw new Error();
    }

    const source = this.__sourceNode;
    if (!source) {
      throw new Error();
    }

    return source;
  }

  getGainNode() {
    if (!this.isWebAudio()) {
      throw new Error();
    }

    const gain = this.__gainNode;
    if (!gain) {
      throw new Error();
    }

    return gain;
  }

  getFadeGainNode() {
    if (!this.isWebAudio()) {
      throw new Error();
    }

    const fadeGain = this.__fadeGainNode;
    if (!fadeGain) {
      throw new Error();
    }

    return fadeGain;
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

  setTrackPosition(seconds: number) {
    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.__startedTime = this.getContextCurrentTime() - seconds;
      } else {
        this.__pausedTime = seconds;
      }
    } else {
      this.__audioElement!.currentTime = seconds;
    }

    this.clearFadeState();

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

  play(fadeOverride?: IFade | null) {
    const trackPosition = this.getTrackPosition();

    this.__playing = true;
    let source: AudioBufferSourceNode | HTMLAudioElement;
    if (this.isWebAudio()) {
      source = this.getSourceNode();

      /* Play the source node, respecting possible pauses. */
      source.start(trackPosition);

      /* Reset the started time. */
      this.__startedTime = this.getContextCurrentTime() - trackPosition;

      /* Reset the paused time. */
      this.__pausedTime = 0;
    } else {
      source = this.__audioElement!;
      /* Set the actual audio element volume to the product of manager, group,
       * and sound volumes. */
      this.updateAudioElementVolume();
      /* Set the current time to the track position. */
      source.currentTime = trackPosition;
      source.play();
    }

    /* If play() is called when the sound is already playing (and thus has
     * already emitted a promise), the emitted promise (and events) will be
     * respected and the original promise returned. */
    if (!this.__promise) {
      if (fadeOverride) {
        this.__fadeOverride = fadeOverride;
      }

      const fade = fadeOverride || this.getFade();

      let timeUpdate: () => void;
      if (fade) {
        /* Update the audio element volume on every tick, including fade
         * volume. */
        timeUpdate = () => this.updateAudioElementVolume();

        const duration = this.getDuration();

        if (this.isWebAudio()) {
          const fadeGainNode = this.getFadeGainNode();
          if (fade.length.in >= this.getTrackPosition()) {
            for (let ii = 0; ii <= fade.length.in * 20; ii += 1) {
              const time = ii / 20;
              fadeGainNode.gain.setValueAtTime(
                this.getFadeVolume(),
                this.getContextCurrentTime() + time,
              );
            }
          }

          if (fade.length.out >= this.getDuration() - this.getTrackPosition()) {
            for (let ii = 0; ii < fade.length.out * 20; ii += 1) {
              const time = ii / 20;
              fadeGainNode.gain.setValueAtTime(
                this.getFadeVolume(),
                this.getContextCurrentTime() + duration - time,
              );
            }
          }
        } else {
          source.addEventListener('timeupdate', timeUpdate);
        }
      }

      this.__promise = new Promise((resolve, reject) => {  
        const ended = (e: Event) => {
          /* Remove the 'ended' event listener. */
          source.removeEventListener('ended', ended);

          if (timeUpdate) {
            /* Remove the 'timeupdate' event listener. */
            source.removeEventListener('timeupdate', timeUpdate);
          }

          /* Don't reject the emitted promise. */
          this.__stopRejection = () => {};

          /* Reset the track position of the sound after it ends. Also deletes
           * the old promise. */
          this.stop();

          /* Resolve the promise with the ended event. */
          return resolve(e);
        };

        /* Register the ended function to fire when the audio source emits the
         * 'ended' event. */
        source.addEventListener('ended', ended);

        /* Allow the promise to be rejected if the sound is stopped. */
        this.__stopRejection = (message?: string) => {
          return reject(
            message ||
            'The sound was stopped, probably by a user-created script.'
          );
        };
      });
    }

    return this.__promise;
  }

  pause() {
    this.__playing = false;

    if (this.isWebAudio()) {
      if (this.getPlaying()) {
        this.getSourceNode().stop();
        this.clearFadeState();
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
    this.pause();

    this.__stopRejection('The sound was stopped through the stop() method.');
    this.__stopRejection = () => {};
    delete this.__promise;

    this.__pausedTime = 0;
    if (!this.isWebAudio()) {
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

    this.clearFadeState();

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

    this.clearFadeState();

    return this;
  }

  isPanelRegistered() {
    return this.__panelRegistered;
  }

  getFadeVolume() {
    const fade = this.__fadeOverride || this.getFade();
    const trackPosition = this.getTrackPosition();
    const duration = this.getDuration();
    if (fade) {
      if (fade.easingCurve.in && fade.length.in >= trackPosition) {
        return this.getFadeValueAtTime({
          change: 1,
          curve: fade.easingCurve.in,
          duration: fade.length.in,
          initial: 0,
          time: trackPosition,
        });
      } else if (fade.easingCurve.out && fade.length.out >= duration - trackPosition) {
        return this.getFadeValueAtTime({
          change: -1,
          curve: fade.easingCurve.out,
          duration: fade.length.out,
          initial: 1,
          time: fade.length.out - (duration - trackPosition),
        });
      }
    }

    return 1;
  }

  getFadeValueAtTime(options: {
    change: number,
    curve: EasingCurves,
    initial: number,
    duration: number,
    time: number,
  })
  {
    const value = getFadeValueAtTime(options);
    console.log(`Fading ${options.change < 0 ? 'out' : 'in'}:`, value, options);

    return value;
  }

  clearFadeState() {
    delete this.__fadeOverride;

    if (this.isWebAudio()) {
      const fadeGain = this.getFadeGainNode();
      fadeGain.gain.cancelScheduledValues(this.getContextCurrentTime());
      fadeGain.gain.setValueAtTime(1, this.getContextCurrentTime());
    }

    return this;
  }
}
