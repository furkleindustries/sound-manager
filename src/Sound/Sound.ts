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
  initializeSoundForPlay,
} from './initializeSoundForPlay';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  playAudioSource,
} from './playAudioSource';
import {
  updateSoundTimes,
} from './updateSoundTimes';

const DEBUG = false;

export class Sound implements ISound {
  get type() {
    return NodeTypes.Sound;
  }

  private __sourceNode: AudioBufferSourceNode | null = null;
  private __gainNode: GainNode | null = null;
  private __fadeGainNode: GainNode | null = null;
  private __fadeOverride?: IFade;
  private __loopOverride?: boolean;
  private __pausedTime: number = 0; 
  private __playing: boolean = false;
  private __fade: IFade | null = null;
  
  public __promise: Promise<Event> | null = null;
  public __startedTime: number = 0;
  public __panelRegistered: boolean = false;
  public __audioElement: HTMLAudioElement | null = null;
  public __rejectOnStop: (message?: string) => void = () => {};
  
  /* istanbul ignore next */

  /* istanbul ignore next */
  private __getNewSourceNode: () => AudioBufferSourceNode = () => {
    throw new Error('Source node factory not initialized.');
  };

  public readonly isWebAudio: () => boolean;
  public readonly getContextCurrentTime: () => number;
  public readonly getManagerVolume: () => number;
  public readonly getVolume: () => number;
  public readonly setVolume: (value: number) => ISound;
  public getGroupVolume: () => number;

  constructor({
    audioElement,
    autoplay,
    buffer,
    context,
    fade,
    getManagerVolume,
    loop,
    trackPosition,
    volume,
  }: ISoundOptions)
  {
    /* Needed to calculate volume for HTML5 audio. */
    if (typeof getManagerVolume !== 'function') {
      throw new Error();
    }

    this.getManagerVolume = getManagerVolume;
    this.getGroupVolume = () => 1;

    if (context) {
      if (!buffer) {
        throw new Error();
      }

      this.isWebAudio = () => true;
      this.getContextCurrentTime = () => context.currentTime;
  
      this.getVolume = () => this.getGainNode().gain.value;
  
      this.setVolume = (value: number) => {
        this.getGainNode().gain.setValueAtTime(
          value,
          this.getContextCurrentTime(),
        );
  
        return this;
      };

      this.__initializeForWebAudio(context, buffer);
    } else if (audioElement) {
      this.__audioElement = audioElement;

      this.isWebAudio = () => false;
      this.getContextCurrentTime = () => {
        throw new Error();
      };

      let volume = 1;
      this.getVolume = () => volume;
      this.setVolume = (value: number) => {
        volume = value;
        this.updateAudioElementVolume();

        return this;
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

  private __initializeForWebAudio(context: AudioContext, buffer: AudioBuffer) {
    /* Keep reference to the necessary context factory method and the buffer
     * in a private closure available elsewhere in the class. */
    this.__getNewSourceNode = () => {
      const node = context.createBufferSource();
      node.buffer = buffer;
      return node;
    };

    /* Generate the first source node. */
    this.__sourceNode = this.__getNewSourceNode();

    /* Generate the output gain node. */
    this.__gainNode = context.createGain();
    /* Generate the gain node used for fading volume. */
    this.__fadeGainNode = context.createGain();
    this.__sourceNode.connect(this.__fadeGainNode);
    this.__fadeGainNode.connect(this.__gainNode);
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
    if (this.getPlaying()) {
      if (this.isWebAudio()) {
        return this.getContextCurrentTime() - this.__startedTime;
      } else {
        return this.__audioElement!.currentTime;
      }
    }

    return this.__pausedTime;
  }

  setTrackPosition(seconds: number) {
    if (this.getPlaying()) {
      if (this.isWebAudio()) {
        this.__startedTime = this.getContextCurrentTime() - seconds;
        this.pause();
        this.play();
      } else {
        this.__audioElement!.currentTime = seconds;
      }

      this.clearFadeState();
    } else {
      this.__pausedTime = seconds;
    }

    return this;
  }

  getDuration() {
    if (this.isWebAudio()) {
      const source = this.getSourceNode()!;
      if (source.buffer) {
        return source.buffer.duration;
      } else {
        /* istanbul ignore next */
        if (DEBUG) {
          console.warn('No buffer found for sound.');
        }
      }
    } else {
      return this.__audioElement!.duration;
    }

    return 0;
  }

  getPlaying() {
    return this.__playing;
  }

  getLoop() {
    if (this.__loopOverride) {
      return this.__loopOverride;
    } else if (this.isWebAudio()) {
      return this.getSourceNode().loop;
    } else {
      return this.__audioElement!.loop;
    }
  }

  getFade() {
    return this.__fadeOverride || this.__fade;
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

  play(fadeOverride?: IFade | null, loopOverride?: boolean) {
    const isWebAudio = this.isWebAudio();
    updateSoundTimes(this, this.__audioElement!);
    
    /* If play() is called when the sound is already playing (and thus has
      * already emitted a promise), the emitted promise (and events) will be
     * respected and the original promise returned. */
    if (!this.__promise) {
      /* Sets the private override properties e.g. if this sound is part of a
      * playlist. */
     this.__setOverrides(fadeOverride, loopOverride);
     /* Generates the promise and registers events. */
      if (isWebAudio) {
        initializeSoundForPlay(this);
      } else {
        initializeSoundForPlay(this, this.__audioElement!);
      }
    }

    playAudioSource(this);

    /* Reset the paused time. */
    this.__pausedTime = 0;

    /* Ensure the sound knows it's playing. */
    this.__playing = true;

    /* Emit the promise that was either just generated or emitted on previous
     * unfinished plays. */
    return this.__promise!;
  }

  private __setOverrides(fadeOverride?: IFade | null, loopOverride?: boolean) {
    if (fadeOverride) {
      this.__fadeOverride = { ...fadeOverride, };
    }
  
    if (typeof loopOverride === 'boolean') {
      this.__loopOverride = loopOverride;
    }
  }

  pause() {
    /* Must be executed before __playing = false. */
    this.__pausedTime = this.getTrackPosition();

    if (this.isWebAudio()) {
      /* Must be executed after __pausedTime = ... */
      if (this.getPlaying()) {
        const sourceNode = this.getSourceNode();
        sourceNode.stop();
        this.__sourceNode = this.__getNewSourceNode();
      }

      this.__startedTime = 0;
    } else {
      this.__audioElement!.pause();
    }

    /* Must be executed after __pausedTime = ... and this.getPlaying(). */
    this.__playing = false;
    this.clearFadeState();

    return this;
  }

  stop() {
    this.pause();

    this.__rejectOnStop('The sound was stopped through the stop() method.');
    /* istanbul ignore next */
    this.__rejectOnStop = () => {};
    delete this.__promise;
    delete this.__loopOverride;

    this.__pausedTime = 0;
    if (!this.isWebAudio()) {
      this.__audioElement!.currentTime = 0;
    }

    return this;
  }

  rewind(seconds: number) {
    return this.setTrackPosition(this.getTrackPosition() - seconds);
  }

  fastForward(seconds: number) {
    return this.setTrackPosition(this.getTrackPosition() + seconds);    
  }

  isPanelRegistered() {
    return this.__panelRegistered;
  }

  updateAudioElementVolume() {
    if (this.isWebAudio()) {
      throw new Error();
    }

    /* Set the audio element volume to the product of manager, group, and
     * fade, and sound volumes. */
    this.__audioElement!.volume =
      this.getManagerVolume() *
      this.getGroupVolume() *
      this.getFadeVolume() *
      this.getVolume();

    return this;
  }

  getFadeVolume() {
    const fade = this.getFade();
    const trackPosition = this.getTrackPosition();
    const duration = this.getDuration();
    if (fade) {
      const inLen = Number(fade.length.in);
      const outLen = Number(fade.length.out);
      if (fade.easingCurve.in && inLen >= trackPosition) {
        return getFadeValueAtTime({
          change: 1,
          curve: fade.easingCurve.in,
          duration: inLen,
          initial: 0,
          time: trackPosition,
        });
      } else if (fade.easingCurve.out && outLen >= duration - trackPosition) {
        return getFadeValueAtTime({
          change: -1,
          curve: fade.easingCurve.out,
          duration: outLen,
          initial: 1,
          time: outLen - (duration - trackPosition),
        });
      }
    }

    return 1;
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
