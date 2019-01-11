import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  assertValid,
} from '../assertions/assertValid';
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
  warn,
} from '../logging/warn';
import {
  trySetSoundFade,
} from './trySetSoundFade';
import {
  trySetSoundLoop,
} from './trySetSoundLoop';
import {
  trySetSoundTrackPosition,
} from './trySetSoundTrackPosition';
import {
  trySetSoundVolume,
} from './trySetSoundVolume';
import { scheduleHtmlAudioFades } from '../Fade/scheduleHtmlAudioFades';
import { scheduleWebAudioFades } from '../Fade/scheduleWebAudioFades';
import { getFrozenObject } from '../functions/getFrozenObject';

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
  
  private __promise: Promise<Event> | null = null;
  private __sourceNode: AudioBufferSourceNode | null = null;
  private __startedTime: number = 0;
  private __rejectOnStop: (message?: string) => void = () => {};
  private __fadeGainNode: GainNode | null = null;
  private __fadeOverride?: IFade;
  private __loopOverride?: boolean;
  
  /* istanbul ignore next */
  public getGroupVolume: () => number = () => 1;

  constructor(options: ISoundOptions) {
    super(options);

    const {
      audioElement,
      buffer,
      fade,
      getManagerVolume,
      loop,
      trackPosition,
      volume,
    } = options;

    if (this.isWebAudio()) {
      this.__initializeSoundForWebAudio(assertValid<AudioBuffer>(buffer));
    } else {
      this.__audioElement = assertValid<HTMLAudioElement>(audioElement);
      /* Needed to calculate volume for HTML5 audio. */
      this.getManagerVolume = assertValid<() => number>(
        getManagerVolume,
        '',
        (aa) => typeof aa === 'function',
      );
    }

    trySetSoundFade(this, fade);
    trySetSoundLoop(this, loop);
    trySetSoundTrackPosition(this, trackPosition);
    trySetSoundVolume(this, volume);
  }

  private __initializeSoundForWebAudio(buffer: AudioBuffer) {  
    const context = this.getAudioContext();
  
    /* Generate the first source node. */
    this.__sourceNode = getNewSourceNode(
      context,
      assertValid<AudioBuffer>(buffer),
    );
  
    /* Generate the gain node used for fading volume. */
    this.__fadeGainNode = context.createGain();
  
    /* Connect the source node to the fade gain node. */
    this.__sourceNode.connect(this.__fadeGainNode);
  
    /* Connect the fade gain node to the sound's gain node. */
    this.__fadeGainNode.connect(this.getGainNode());
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
        this.__clearScheduledFades();
      }
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
        warn('Audio buffer not found for Sound.');
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

  public setLoop(loop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = loop;
    } else {
      assertValid<HTMLAudioElement>(this.__audioElement).loop = loop;
    }

    return this;
  }

  public play(fadeOverride?: IFade, loopOverride?: boolean) {
    if (this.isPlaying()) {
      return assertValid<Promise<Event>>(this.__promise);
    }

    this.__updateSoundTimes();

    /* If play() is called when the sound is already playing (and thus has
     * already emitted a promise), the emitted promise (and events) will be
     * respected and the original promise returned. */
    if (!this.__promise) {
      /* Generates the promise and registers events. */
      this.__initializeForPlay(fadeOverride, loopOverride);
    }

    playAudioSource(this, this.__audioElement);

    /* Reset the paused time. */
    this.__pausedTime = 0;

    /* Ensure the sound knows it's playing. */
    this.__playing = true;

    /* Emit the promise that was either just generated or emitted on previous
     * unfinished plays. */
    return assertValid<Promise<Event>>(this.__promise);
  }

  private __initializeForPlay(fadeOverride?: IFade, loopOverride?: boolean) {
    this.__regenerateSourceNode();

    /* Sets the override properties e.g. if this sound is part of a
     * playlist. */
    if (fadeOverride) {
      this.__fadeOverride = getFrozenObject({ ...fadeOverride, });
    }

    if (typeof loopOverride === 'boolean') {
      this.__loopOverride = loopOverride;
    }

    const fade = this.getFade();
    const audioElement = this.__audioElement;
    let timeUpdate: (() => void) | undefined = undefined;
    if (fade) {
      /* Update the audio element volume on every tick, including fade
       * volume. */
      /* istanbul ignore next */
      timeUpdate = () => this.updateAudioElementVolume();
      this.__initializeFadeForPlay(
        this.__audioElement,
        timeUpdate,
      );
    }
  
    this.__initializePromiseForPlay(audioElement, timeUpdate);
  }

  private __regenerateSourceNode() {
    this.__sourceNode = getNewSourceNode(
      this.getAudioContext(),
      assertValid<AudioBuffer>(this.getSourceNode().buffer),
    );
  }

  private __updateSoundTimes() {
    const trackPosition = this.getTrackPosition();
    if (this.isWebAudio()) {
      /* Reset the started time. */
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
    } else {
      /* Set the current time to the track position. */
      assertValid<HTMLAudioElement>(
        this.__audioElement
      ).currentTime = trackPosition;
    }
  }
  
  private __initializeFadeForPlay(
    audioElement?: HTMLAudioElement | null,
    htmlTimeUpdater?: () => void,
  )
  {
    if (this.isWebAudio()) {
      scheduleWebAudioFades(this);
    } else {
      scheduleHtmlAudioFades(
        assertValid<HTMLAudioElement>(audioElement),
        assertValid<() => void>(htmlTimeUpdater),
      );
    }
  }
  
  private __initializeStopRejector(reject: Function) {
    this.__rejectOnStop = (message?: string) => reject(
      message ||
      'The sound was stopped, probably by a user-created script.'
    );
  }

  private __initializePromiseForPlay(
    audioElement?: HTMLAudioElement | null,
    timeUpdate?: () => void,
  )
  {
    this.__promise = new Promise((resolve, reject) => {
      this.__initializeEventsForPlay(resolve, audioElement, timeUpdate);
  
      /* Allow the promise to be rejected if the sound is stopped. */
      this.__initializeStopRejector(reject);
    });
  }
  
  private __initializeEventsForPlay(
    resolver: (arg: Event) => void,
    audioElement?: HTMLAudioElement | null,
    timeUpdate?: () => void,
  )
  {
    const isWebAudio = this.isWebAudio();
    const source = assertValid<AudioBufferSourceNode | HTMLAudioElement>(
      isWebAudio ? this.getSourceNode() : audioElement,
    );
  
    const ended = (e: Event) => {
      /* Remove the 'ended' event listener. */
      source.removeEventListener('ended', ended);
  
      /* istanbul ignore next */
      if (!isWebAudio && typeof timeUpdate === 'function') {
        /* Remove the 'timeupdate' event listener. */
        source.removeEventListener('timeupdate', timeUpdate);
      }
  
      /* Don't reject the emitted promise. */
      this.__rejectOnStop = () => {};
  
      /* Reset the track position of the sound after it ends. Also deletes
       * the old promise. */
      this.stop();
  
      /* Resolve the promise with the ended event. */
      return resolver(e);
    };
  
    /* Register the ended export function to fire when the audio source emits the
     * 'ended' event. */
    source.addEventListener('ended', ended);
  }  

  public pause() {
    /* Must be executed before __playing = false. */
    this.__pausedTime = this.getTrackPosition();
    this.__startedTime = 0;

    if (!this.isWebAudio()) {
      /* Must be executed after __pausedTime = ... */
      assertValid<HTMLAudioElement>(this.__audioElement).pause();
    } else if (this.isPlaying()) {
      this.getSourceNode().stop();
    }

    /* Must be executed after __pausedTime = ... and this.getPlaying(). */
    this.__playing = false;
    this.__clearScheduledFades();

    return this;
  }

  private __clearScheduledFades() {
    delete this.__fadeOverride;
    if (this.isWebAudio()) {
      const fadeGain = this.getFadeGainNode();
      fadeGain.gain.cancelScheduledValues(this.getContextCurrentTime());
      fadeGain.gain.setValueAtTime(1, this.getContextCurrentTime());
    }
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
