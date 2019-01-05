import {
  assert,
} from '../assertions/assert';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  clearScheduledFadesOnSound,
} from './clearScheduledFadesOnSound';
import {
  Fade,
} from '../Fade/Fade';
import {
  getFadeVolume,
} from '../Fade/getFadeVolume';
import {
  getNewSourceNode,
} from './getNewSourceNode';
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
  initializeSoundForWebAudio,
} from './initializeSoundForWebAudio';
import {
  ManagerNode,
} from '../Node/ManagerNode';
import {
  NodeTypes,
} from '../enums/NodeTypes';
import {
  PanelRegisterableNodeMixin,
} from '../Node/PanelRegisterableNodeMixin';
import {
  playAudioSource,
} from './playAudioSource';
import {
  setPerPlaySoundOverrides,
} from './setPerPlaySoundOverrides';
import {
  updateSoundTimes,
} from './updateSoundTimes';
import {
  warn,
} from '../logging/warn';
import { isValidVolume } from '../functions/isValidVolume';

export class Sound
  extends PanelRegisterableNodeMixin(ManagerNode)
  implements ISound
{
  get type() {
    return NodeTypes.Sound;
  }

  private __audioElement: HTMLAudioElement | null = null;
  private __fade: IFade | null = null;
  private __pausedTime: number = 0; 
  private __playing: boolean = false;
  /* istanbul ignore next */
  private readonly getManagerVolume: () => number = () => {
    throw new Error('getManagerVolume not initialized.');
  };
  
  public __fadeGainNode: GainNode | null = null;
  public __fadeOverride?: IFade;
  public __loopOverride?: boolean;
  public __promise: Promise<Event> | null = null;
  public __sourceNode: AudioBufferSourceNode | null = null;
  public __startedTime: number = 0;
  /* istanbul ignore next */
  public __rejectOnStop: (message?: string) => void = () => {};

  public getGroupVolume: () => number;

  constructor(options: ISoundOptions) {
    super(options);

    const {
      audioElement,
      buffer,
      context,
      fade,
      getManagerVolume,
      loop,
      trackPosition,
      volume,
    } = options;

    if (!this.isWebAudio()) {
      /* Needed to calculate volume for HTML5 audio. */
      assert(typeof getManagerVolume === 'function');
      this.getManagerVolume = getManagerVolume;
    }

    this.getGroupVolume = () => 1;

    if (context) {
      initializeSoundForWebAudio(this, assertValid<AudioBuffer>(buffer));
    } else if (audioElement) {
      this.__audioElement = audioElement;
    } else {
      throw new Error();
    }

    if (isValidVolume(volume)) {
      this.setVolume(volume);
    }

    if (typeof loop === 'boolean') {
      this.setLoop(loop);
    }

    if (fade) {
      this.__fade = typeof fade === 'boolean' ? new Fade() : new Fade(fade);
    }

    if (typeof trackPosition !== 'undefined' && trackPosition > 0) {
      this.setTrackPosition(trackPosition);
    }
  }

  public getInputNode() {
    return this.getSourceNode();
  }

  public setVolume(value: number) {
    super.setVolume(value);

    if (!this.isWebAudio()) {
      this.updateAudioElementVolume();
    }

    return this;
  }

  public getOutputNode() {
    return this.getGainNode();
  }

  public getSourceNode() {
    assertNodeIsWebAudio(this, 'getSourceNode');
    return assertValid<AudioBufferSourceNode>(this.__sourceNode);
  }

  public getFadeGainNode() {
    assertNodeIsWebAudio(this, 'getFadeGainNode');
    return assertValid<GainNode>(this.__fadeGainNode);
  }

  public getTrackPosition() {
    if (this.isPlaying()) {
      if (this.isWebAudio()) {
        return this.getContextCurrentTime() - this.__startedTime;
      }

      return assertValid<HTMLAudioElement>(this.__audioElement).currentTime;
    }

    return this.__pausedTime;
  }

  public setTrackPosition(seconds: number) {
    if (this.isPlaying()) {
      if (this.isWebAudio()) {
        this.__startedTime = this.getContextCurrentTime() - seconds;
        this.pause();
        this.play();
      } else {
        const secs = seconds;
        assertValid<HTMLAudioElement>(this.__audioElement).currentTime = secs;
      }

      clearScheduledFadesOnSound(this);
    } else {
      this.__pausedTime = seconds;
    }

    return this;
  }

  public getDuration() {
    let duration: number = 0;
    if (this.isWebAudio()) {
      const sourceNode = this.getSourceNode();
      if (!sourceNode.buffer) {
        warn('Audio buffer empty or not found for Sound.');
        return 0;
      }

      duration = sourceNode.buffer!.duration;
    } else if (this.__audioElement) {
      duration = this.__audioElement.duration;
    }

    return duration || 0;
  }

  public isPlaying() {
    return this.__playing;
  }

  public getLoop() {
    if (this.__loopOverride) {
      return this.__loopOverride;
    } else if (this.isWebAudio()) {
      return this.getSourceNode().loop;
    }

    return assertValid<HTMLAudioElement>(this.__audioElement).loop;
  }

  public getFade() {
    return this.__fadeOverride || this.__fade;
  }

  public setFade(fade: IFade | null) {
    this.__fade = fade;
    return this;
  }

  public setLoop(doLoop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = doLoop;
    } else {
      assertValid<HTMLAudioElement>(this.__audioElement).loop = doLoop;
    }

    return this;
  }

  public play(fadeOverride?: IFade | null, loopOverride?: boolean) {
    const isWebAudio = this.isWebAudio();
    const audioElem = this.__audioElement;
    updateSoundTimes(this, audioElem);

    /* If play() is called when the sound is already playing (and thus has
     * already emitted a promise), the emitted promise (and events) will be
     * respected and the original promise returned. */
    if (!this.__promise) {
      /* Sets the override properties e.g. if this sound is part of a
       * playlist. */
      setPerPlaySoundOverrides(this, fadeOverride, loopOverride);
      /* Generates the promise and registers events. */
      if (isWebAudio) {
        initializeSoundForPlay(this);
      } else {
        initializeSoundForPlay(this, this.__audioElement!);
      }
    }

    playAudioSource(this, this.__audioElement);

    /* Reset the paused time. */
    this.__pausedTime = 0;

    /* Ensure the sound knows it's playing. */
    this.__playing = true;

    /* Emit the promise that was either just generated or emitted on previous
     * unfinished plays. */
    return this.__promise!;
  }

  public pause() {
    /* Must be executed before __playing = false. */
    this.__pausedTime = this.getTrackPosition();

    if (this.isWebAudio()) {
      /* Must be executed after __pausedTime = ... */
      if (this.isPlaying()) {
        const sourceNode = this.getSourceNode();
        sourceNode.stop();
        this.__sourceNode = getNewSourceNode(
          this.getAudioContext(),
          assertValid<AudioBuffer>(this.getSourceNode().buffer),
        );
      }

      this.__startedTime = 0;
    } else {
      assertValid<HTMLAudioElement>(this.__audioElement).pause();
    }

    /* Must be executed after __pausedTime = ... and this.getPlaying(). */
    this.__playing = false;
    clearScheduledFadesOnSound(this);

    return this;
  }

  public stop() {
    this.pause();

    this.__rejectOnStop('The sound was stopped through the stop() method.');
    /* istanbul ignore next */
    this.__rejectOnStop = () => {};
    delete this.__promise;
    delete this.__loopOverride;

    this.__pausedTime = 0;
    if (!this.isWebAudio()) {
      assertValid<HTMLAudioElement>(this.__audioElement).currentTime = 0;
    }

    return this;
  }

  public rewind(seconds: number) {
    return this.setTrackPosition(this.getTrackPosition() - seconds);
  }

  public fastForward(seconds: number) {
    return this.setTrackPosition(this.getTrackPosition() + seconds);    
  }

  public updateAudioElementVolume() {
    /* Set the audio element volume to the product of manager, group, and
     * fade, and sound volumes. */
    assertValid<HTMLAudioElement>(this.__audioElement).volume =
      this.getManagerVolume() *
      this.getGroupVolume() *
      this.getFadeVolume() *
      this.getVolume();

    return this;
  }

  public getFadeVolume() {
    const fade = this.getFade();
    const trackPosition = this.getTrackPosition();
    const duration = this.getDuration();

    return fade ? getFadeVolume(fade, trackPosition, duration) : 1;
  }
}
