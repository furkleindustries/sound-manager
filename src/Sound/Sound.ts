import {
  AnalysableNodeMixin,
} from '../Node/AnalysableNodeMixin';
import {
  assertNodeIsWebAudio,
} from '../assertions/assertNodeIsWebAudio';
import {
  BaseNode,
} from '../Node/BaseNode';
import {
  createFade,
} from '../Fade/createFade';
import {
  getFadeVolume,
} from '../Fade/getFadeVolume';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  getNewSourceNode,
} from './getNewSourceNode';
import {
  IFade,
} from '../Fade/IFade';
import {
  IFadeOptions,
} from '../Fade/IFadeOptions';
import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';
import {
  isValidVolume,
} from '../functions/isValidVolume';
import {
  loopIsValid,
} from '../Playlist/loopIsValid';
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
  scheduleHtmlAudioFades,
} from '../Fade/scheduleHtmlAudioFades';
import {
  scheduleWebAudioFades,
} from '../Fade/scheduleWebAudioFades';
import {
  strings,
} from './Sound.strings';
import {
  TaggableNodeMixin,
} from '../Node/TaggableNodeMixin';
import {
  assert,
  assertValid,
} from 'ts-assertions';

export class Sound
extends
    AnalysableNodeMixin(
    PanelRegisterableNodeMixin(
    TaggableNodeMixin(
      BaseNode
    )))
  implements ISound
{
  get type(): NodeTypes.Sound {
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
  private __resolveOnEnd: (e: Event) => void = () => {};
  private __rejectOnStop: (message?: string) => void = () => {};
  private __fadeGainNode: GainNode | null = null;
  private __fadeOverride?: IFade;
  private __loopOverride?: boolean;

  /* istanbul ignore next */
  public getGroupVolume: () => number = () => 1;

  constructor(options: ISoundOptions) {
    super({ ...options });

    assert(options, strings.CTOR_OPTIONS_INVALID);

    const {
      audioElement,
      buffer,
      fade,
      getManagerVolume,
      loop,
      trackPosition,
      volume,
    } = options;

    const isWebAudio = this.isWebAudio();
    if (isWebAudio) {
      this.__initializeSoundForWebAudio(
        assertValid<AudioBuffer>(
          buffer,
          strings.CTOR_BUFFER_INVALID,
        ),
      );
    } else {
      this.__audioElement = assertValid<HTMLAudioElement>(
        audioElement,
        strings.CTOR_AUDIO_ELEMENT_INVALID,
      );

      /* Needed to calculate volume for HTML5 audio. */
      this.getManagerVolume = assertValid<() => number>(
        getManagerVolume,
        strings.CTOR_GET_MANAGER_VOLUME_INVALID,
        (aa) => typeof aa === 'function',
      );
    }

    this.__initializeArgumentProperties(fade, loop, trackPosition);
    if (!isWebAudio) {
      this.updateAudioElementVolume();
    }

    if (isValidVolume(volume)) {;
      this.setVolume(volume);
    }
  }

  private __initializeSoundForWebAudio(buffer: AudioBuffer) {  
    const context = this.getAudioContext();

    /* Generate the first source node. */
    this.__sourceNode = getNewSourceNode(
      context,
      assertValid<AudioBuffer>(
        buffer,
        strings.INITIALIZE_SOUND_FOR_WEB_AUDIO_BUFFER_INVALID,
      ),
    );

    /* Generate the gain node used for fading volume. */
    this.__fadeGainNode = context.createGain();

    /* Connect the fade gain node to the sound's gain node. */
    this.__fadeGainNode.connect(this.getGainNode());
  }

  private __initializeArgumentProperties(
    fade: boolean | IFadeOptions | undefined,
    loop: boolean | number | undefined,
    trackPosition: number | undefined,
  )
  {
    if (fade) {
      const fadeObj = typeof fade === 'boolean' ?
        createFade() :
        createFade(fade);

      this.setFade(fadeObj);
    }

    if (loopIsValid(loop)) {
      this.setLoop(loop as boolean);
    }

    if (trackPosition && trackPosition > 0) {
      this.setTrackPosition(trackPosition);
    }
  }

  public getInputNode() {
    return this.getSourceNode();
  }

  public getSourceNode() {
    assertNodeIsWebAudio(this, 'getSourceNode');
    return assertValid<AudioBufferSourceNode>(
      this.__sourceNode,
      strings.GET_SOURCE_NODE_NODE_INVALID,
    );
  }

  public getFadeGainNode() {
    assertNodeIsWebAudio(this, 'getFadeGainNode');
    return assertValid<GainNode>(
      this.__fadeGainNode,
      strings.GET_FADE_GAIN_NODE_NODE_INVALID,
    );
  }

  public setVolume(value: number) {
    super.setVolume(value);

    if (!this.isWebAudio()) {
      this.updateAudioElementVolume();
    }

    return this;
  }

  public getTrackPosition() {
    if (this.isPlaying()) {
      if (this.isWebAudio()) {
        return this.getContextCurrentTime() - this.__startedTime;
      }

      return assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.GET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
      ).currentTime;
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
        assertValid<HTMLAudioElement>(
          this.__audioElement,
          strings.SET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
        ).currentTime = seconds;

        this.__clearScheduledFades();
      }
    } else {
      this.__pausedTime = seconds;
    }

    return this;
  }

  public getDuration() {
    if (this.isWebAudio()) {
      const {
        buffer,
      } = this.getSourceNode();

      return assertValid<AudioBuffer>(
        buffer,
        strings.GET_DURATION_BUFFER_INVALID,
      ).duration;
    }

    return assertValid<HTMLAudioElement>(
      this.__audioElement,
      strings.GET_DURATION_AUDIO_ELEMENT_INVALID,
    ).duration;
  }

  public isPlaying() {
    return this.__playing;
  }

  public getLoop() {
    if (this.__loopOverride) {
      return this.__loopOverride;
    } else if (this.isWebAudio()) {
      return this.getSourceNode().loop;
    } else {
      return assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.GET_LOOP_AUDIO_ELEMENT_INVALID,
      ).loop;
    }
  }

  public setLoop(loop: boolean) {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = loop;
    } else {
      assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.SET_LOOP_AUDIO_ELEMENT_INVALID,
      ).loop = loop;
    }

    return this;
  }

  public getFade() {
    return this.__fadeOverride || this.__fade;
  }

  public setFade(fade: IFade | null) {
    this.__fade = fade;
    return this;
  }

  public play(fadeOverride?: IFade, loopOverride?: boolean) {
    if (this.isPlaying()) {
      return assertValid<Promise<Event>>(this.__promise);
    }

    this.__updateSoundTimes();

    let contextTime = 0;

    /* Regenerate the source node. This *must* be called otherwise paused
     * Sounds in Web Audio mode will throw. */
    if (this.isWebAudio()) {
      contextTime = this.getContextCurrentTime();
    }
    
    this.__initializeForPlay(fadeOverride, loopOverride);

    playAudioSource(this, this.__audioElement, contextTime);

    /* Reset the paused time. */
    this.__pausedTime = 0;

    /* Ensure the sound knows it's playing. */
    this.__playing = true;

    /* Emit the promise that was either just generated or emitted on previous
     * unfinished plays. */
    return assertValid<Promise<Event>>(this.__promise);
  }

  /* Regenerates the source node, generates the promise if it does not already
   * exist, registers events, etc. */
  private __initializeForPlay(fadeOverride?: IFade, loopOverride?: boolean) {
    if (this.isWebAudio()) {
      this.__regenerateSourceNode();
    }

    /* Sets the override properties e.g. if this sound is part of a
     * playlist. */
    if (fadeOverride) {
      this.__fadeOverride = getFrozenObject(fadeOverride);
    }

    if (typeof loopOverride === 'boolean') {
      this.__loopOverride = loopOverride;
    }

    const fade = this.getFade();
    let timeUpdate: (() => void) | undefined = undefined;
    const audioElement = this.__audioElement;
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
    
    /* If a promise is already on the Sound, it must be respected, and
     * a new one should not be constructed. */
   if (!this.__promise) {
     this.__initializePromiseForPlay();
    }

    this.__initializeEventsForPlay(audioElement, timeUpdate);
  }

  /* When an AudioBufferSourceNode is stopped, it can never be used again.
   * Therefore, a new node must be generated to support the pause
   * functionality. */
  private __regenerateSourceNode() {
    this.__sourceNode = getNewSourceNode(
      this.getAudioContext(),
      assertValid<AudioBuffer>(this.getSourceNode().buffer),
    );

    /* Connect the input node to the fade gain node. */
    this.getInputNode().connect(this.getFadeGainNode());

    /* Connect the fade gain node to the output node. */
    this.getFadeGainNode().connect(this.getOutputNode());
  }

  private __updateSoundTimes() {
    const trackPosition = this.getTrackPosition();
    if (this.isWebAudio()) {
      /* Reset the started time. */
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
    } else {
      /* Set the current time to the track position. */
      assertValid<HTMLAudioElement>(
        this.__audioElement,
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

  private __initializeStartResolver(resolve: Function) {
    this.__resolveOnEnd = (...args: any[]) => resolve(...args);
  }

  private __initializeStopRejector(reject: Function) {
    this.__rejectOnStop = (message?: string) => reject(
      message ||
      'The sound was stopped, probably by a user-created script.'
    );
  }

  private __initializePromiseForPlay() {
    this.__promise = new Promise((resolve, reject) => {
      /* Allows the same promise to be used across pauses. */
      this.__initializeStartResolver(resolve);

      /* Allow the promise to be rejected if the sound is stopped. */
      this.__initializeStopRejector(reject);
    });
  }

  private __initializeEventsForPlay(
    audioElement?: HTMLAudioElement | null,
    timeUpdate?: () => void,
  ) {
    const isWebAudio = this.isWebAudio();
    const source = assertValid<AudioBufferSourceNode | HTMLAudioElement>(
      isWebAudio ? this.getSourceNode() : audioElement,
    );

    /* Register the ended export function to fire when the audio source emits the
     * 'ended' event. */
    source.addEventListener(
      'ended',
      this.__getEndEventHandler(source, timeUpdate),
    );
  }

  private __getEndEventHandler(
    source: AudioBufferSourceNode | HTMLAudioElement,
    timeUpdate?: () => void,
  ) {
    const ended = (e: Event) => {
      /* Remove the 'ended' event listener. */
      source.removeEventListener('ended', ended);
  
      /* istanbul ignore next */
      if (typeof timeUpdate === 'function' && !this.isWebAudio()) {
        /* Remove the 'timeupdate' event listener. */
        source.removeEventListener('timeupdate', timeUpdate);
      }

      /* Don't do anything if the track was paused. */
      if (this.getTrackPosition() < this.getDuration()) {
        return;
      }

      /* Don't reject the emitted promise. */
      this.__rejectOnStop = () => {};

      /* Reset the track position of the sound after it ends. Also rejects
       * the old promise. */
      this.stop();

      /* Resolve the promise with the ended event. */
      this.__resolveOnEnd(e);
    };

    return ended;
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
