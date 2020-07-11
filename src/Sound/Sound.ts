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
  IPlaySoundOptions,
} from './IPlaySoundOptions';
import {
  ISound,
} from './ISound';
import {
  ISoundOptions,
} from './ISoundOptions';
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
import { IGetFadeVolumeArgs } from '../Fade/IGetFadeVolumeArgs';

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
  private __fadeGainNode: GainNode | null = null;
  private __fadeOnLoops = true;
  private __fadeOverride?: IFade;

  // Tracks how many times the song has looped this play session.
  private __loopIterationCount = 0;
  //

  // Do not initialize. `false` is still a valid override value.
  private __loopOverride?: boolean;
  //

  private __pausedTime = 0; 
  private __playing = false;
  private __promise: Promise<void> | null = null;
  private __sourceNode: AudioBufferSourceNode | null = null;
  private __startedTime = 0;

  private __resolveOnEnd: (() => Promise<void>) | undefined = undefined;
  private __rejectOnError?: (err: string | Error) => Error;

  /* istanbul ignore next */
  /* @ts-ignore */
  public getManagerVolume: () => number = () => 1;

  /* istanbul ignore next */
  public getGroupVolume: () => number = () => 1;

  constructor(options: ISoundOptions) {
    super({ ...options });

    assert(options, strings.CTOR_OPTIONS_INVALID);

    const {
      audioElement,
      buffer,
      fade,
      fadeOnLoops,
      getManagerVolume,
      loop,
      trackPosition,
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

    this.__initializeArgumentProperties({
      fade,
      fadeOnLoops,
      loop,
      trackPosition,
    });

    if (!this.isWebAudio()) {
      this.updateAudioElementVolume();
    }
  }

  private readonly __initializeSoundForWebAudio = (buffer: AudioBuffer) => {  
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
  };

  private readonly __initializeArgumentProperties = ({
    fade,
    fadeOnLoops,
    loop,
    trackPosition,
  }: {
    fade: IFadeOptions | undefined,
    fadeOnLoops: boolean | undefined,
    loop: boolean | undefined,
    trackPosition: number | undefined,
  }) => {
    if (fade) {
      const fadeObj = typeof fade === 'boolean' ?
        createFade() :
        createFade(fade);

      this.setFade(fadeObj);
    }

    if (typeof fadeOnLoops === 'boolean') {
      this.__fadeOnLoops = fadeOnLoops;
    }

    if (typeof loop === 'boolean') {
      this.setLoop(loop);
    }

    if (trackPosition && trackPosition > 0) {
      this.setTrackPosition(trackPosition);
    }
  }

  public readonly getInputNode = () => this.getSourceNode();

  public readonly getSourceNode = () => {
    assertNodeIsWebAudio(this, 'getSourceNode');
    return assertValid<AudioBufferSourceNode>(
      this.__sourceNode,
      strings.GET_SOURCE_NODE_NODE_INVALID,
    );
  };

  public readonly getFadeGainNode = () => {
    assertNodeIsWebAudio(this, 'getFadeGainNode');
    return assertValid<GainNode>(
      this.__fadeGainNode,
      strings.GET_FADE_GAIN_NODE_NODE_INVALID,
    );
  };

  public readonly setVolume = (value: number) => {
    super.setVolume(value);

    if (!this.isWebAudio()) {
      this.updateAudioElementVolume();
    }

    return this;
  };

  public readonly getTrackPosition = () => {
    if (this.isPlaying()) {
      if (this.isWebAudio()) {
        return this.getContextCurrentTime() - this.__startedTime;
      }

      return assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.GET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
      ).currentTime * 1000;
    }

    return this.__pausedTime;
  };

  // Must be milliseconds.
  public readonly setTrackPosition = (milliseconds: number) => {
    if (this.isPlaying()) {
      if (this.isWebAudio()) {
        this.__startedTime = this.getContextCurrentTime() - milliseconds;
        this.pause();
        this.play();
      } else {
        assertValid<HTMLAudioElement>(
          this.__audioElement,
          strings.SET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
        ).currentTime = milliseconds / 1000;

        this.__clearScheduledFades();
      }
    } else {
      this.__pausedTime = milliseconds;
    }

    return this;
  };

  // Returned in milliseconds.
  public readonly getDuration = () => {
    if (this.isWebAudio()) {
      const { buffer } = this.getSourceNode();

      return assertValid<AudioBuffer>(
        buffer,
        strings.GET_DURATION_BUFFER_INVALID,
      ).duration * 1000;
    }

    return assertValid<HTMLAudioElement>(
      this.__audioElement,
      strings.GET_DURATION_AUDIO_ELEMENT_INVALID,
    ).duration * 1000;
  };

  public readonly isPlaying = () => this.__playing;

  private __loop = false;
  public readonly getLoop = () => typeof this.__loopOverride === 'boolean' ?
    this.__loopOverride :
    this.__loop;

  public readonly setLoop = (loop: boolean) => {
    if (this.isWebAudio()) {
      this.getSourceNode().loop = loop;
    } else {
      assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.SET_LOOP_AUDIO_ELEMENT_INVALID,
      ).loop = loop;
    }

    this.__loop = loop;

    return this;
  };

  public readonly getFade = () => this.__fadeOverride || this.__fade;

  public readonly setFade = (fade: IFade | null) => {
    this.__fade = fade;
    return this;
  };

  public readonly play = ({
    doneCallback,
    fadeOnLoops,
    fadeOverride,
    loopOverride,
  }: Partial<IPlaySoundOptions> = {
    fadeOnLoops: false,
    fadeOverride: null,
    loopOverride: undefined,
  }) => {
    try {
      if (this.isPlaying()) {
        return assertValid<Promise<void>>(this.__promise);
      }

      this.__updateSoundTimes();

      let contextTime = 0;

      /* Regenerate the source node. This *must* be called otherwise paused
      * Sounds in Web Audio mode will throw. */
      if (this.isWebAudio()) {
        contextTime = this.getContextCurrentTime();
      }

      this.__initializeForPlay({
        doneCallback: () => {
          this.pause();
          this.setTrackPosition(0);

          if (typeof this.__resolveOnEnd === 'function') {
            this.__resolveOnEnd();
          }

          if (typeof doneCallback === 'function') {
            doneCallback();
          }

          return this;
        },

        fadeOnLoops,
        fadeOverride,
        loopOverride,
      });

      playAudioSource(this, this.__audioElement, contextTime);

      /* Reset the paused time. */
      this.__pausedTime = 0;

      /* Ensure the sound knows it's playing. */
      this.__playing = true;

      /* Emit the promise that was either just generated or emitted on previous
      * unfinished plays. */
      return assertValid<Promise<void>>(this.__promise);
    } catch (err) {
      if (typeof this.__rejectOnError === 'function') {
        this.__rejectOnError(err);
      }
    }

    return this.__promise as any;
  };

  /* Regenerates the source node, generates the promise if it does not already
   * exist, registers events, etc. */
  private readonly __initializeForPlay = ({
    doneCallback,
    fadeOnLoops,
    fadeOverride,
    loopOverride,
  }: Partial<IPlaySoundOptions> = {}) => {
    if (this.isWebAudio()) {
      this.__regenerateSourceNode();
    }

    /* Sets the override properties e.g. if this sound is part of a
     * playlist, or the changes occurred through play options. */
    if (typeof fadeOnLoops === 'boolean') {
      this.__fadeOnLoops = fadeOnLoops;
    }

    if (fadeOverride) {
      this.__fadeOverride = getFrozenObject(fadeOverride);
    }

    if (typeof loopOverride === 'boolean') {
      this.__loopOverride = loopOverride;
    }

    const fade = this.getFade();
    const audioElement = this.__audioElement;
    if (fade) {
      /* Update the audio element volume on every tick, including fade
       * volume. */
      /* istanbul ignore next */
      this.__initializeFadeForPlay(this.__audioElement);
    }
    
    /* If a promise is already on the Sound, it must be respected, and
     * a new one should not be constructed. */
   if (!this.__promise) {
     this.__initializePromiseForPlay();
    }

    this.__initializeEventsForPlay(audioElement, doneCallback);
  };

  /* When an AudioBufferSourceNode is stopped, it can never be used again.
   * Therefore, a new node must be generated to support the pause
   * functionality. */
  private readonly __regenerateSourceNode = () => {
    this.__sourceNode = getNewSourceNode(
      this.getAudioContext(),
      assertValid<AudioBuffer>(this.getSourceNode().buffer),
    );

    /* Connect the input node to the fade gain node. */
    this.getInputNode().connect(this.getFadeGainNode());

    /* Connect the fade gain node to the output node. */
    this.getFadeGainNode().connect(this.getOutputNode());
  };

  private readonly __updateSoundTimes = () => {
    const trackPosition = this.getTrackPosition();

    this.__fadeStartTime = trackPosition;

    if (this.isWebAudio()) {
      /* Reset the started time. */
      this.__startedTime = this.getContextCurrentTime() - trackPosition;
    } else {
      /* Set the current time to the track position. */
      assertValid<HTMLAudioElement>(
        this.__audioElement,
      ).currentTime = trackPosition / 1000;
    }
  };

  private timeUpdater = () => this.updateAudioElementVolume();
  private readonly __initializeFadeForPlay = (
    audioElement?: HTMLAudioElement | null,
  ) => {
    if (this.isWebAudio()) {
      scheduleWebAudioFades(this);
    } else {
      scheduleHtmlAudioFades(
        assertValid<HTMLAudioElement>(audioElement),
        assertValid<() => void>(this.timeUpdater),
      );
    }
  };

  private readonly __initializeStartStopResolver = (resolve: Function) => (
    this.__resolveOnEnd = (...args: any[]) => resolve(...args)
  );

  private readonly __initializeRejector = (reject: Function) => (
    this.__rejectOnError = (message?: string | Error) => reject(
      message ||
      'The sound was stopped, probably by a user-created script.'
    )
  );

  private readonly __initializePromiseForPlay = () => (
    this.__promise = new Promise((resolve, reject) => {
      /* Allows the same promise to be used across pauses. */
      this.__initializeStartStopResolver(resolve);

      /* Allow the promise to be rejected if the sound fails. */
      this.__initializeRejector(reject);
    })
  );

  private readonly __initializeEventsForPlay = (
    audioElement?: HTMLAudioElement | null,
    doneCallback?: () => void,
  ) => {
    const isWebAudio = this.isWebAudio();
    const source = assertValid<AudioBufferSourceNode | HTMLAudioElement>(
      isWebAudio ? this.getSourceNode() : audioElement,
    );

    /* Register the ended export function to fire when the audio source emits the
     * 'ended' event. */
    const endHandler = this.__getEndEventHandler(
      source,
      doneCallback,
    );

    source.addEventListener('ended', endHandler);

    // Pass the handler back up.
    return endHandler;
  };

  private readonly __getEndEventHandler = (
    source: AudioBufferSourceNode | HTMLAudioElement,
    doneCallback?: () => void,
  ) => {
    const ended = () => {
      if (this.getLoop()) {
        this.__loopIterationCount += 1;
        this.pause();
        this.setTrackPosition(0);
        this.play();
        return;
      }

      /* Remove the 'ended' event listener. */
      source.removeEventListener('ended', ended);

      /* Don't do anything if the track was paused. */
      if (!this.__isStopping && this.__playing && this.getTrackPosition() < this.getDuration()) {
        return;
      }

      /* Delete the rejector. */
      delete this.__rejectOnError;

      /* Reset the track position of the sound after it ends. Also resolves
       * the old promise. */
      this.stop();

      if (typeof doneCallback === 'function') {
        doneCallback();
      }

      // Delete the resolver.
      delete this.__resolveOnEnd;
    };

    return ended;
  };

  public readonly pause = () => {
    /* Must be executed before __playing = false. */
    this.__fadeStartTime = 0;
    this.__loopIterationCount = 0;
    this.__pausedTime = this.getTrackPosition();
    this.__startedTime = 0;

    try {
      if (!this.isWebAudio()) {
        /* Must be executed after __pausedTime = ... */
        assertValid<HTMLAudioElement>(this.__audioElement).pause();
      } else if (this.isPlaying()) {
        this.getSourceNode().stop();
      }

      /* Must be executed after __pausedTime = ... and this.getPlaying(). */
      this.__playing = false;
      this.__clearScheduledFades();
    } catch (err) {
      if (typeof this.__rejectOnError === 'function') {
        this.__rejectOnError(err);
      } else {
        throw err;
      }
    }

    return this;
  };

  private readonly __clearScheduledFades = () => {
    delete this.__fadeOverride;
    if (this.isWebAudio()) {
      const fadeGain = this.getFadeGainNode();
      const time = this.getContextCurrentTime() / 1000;
      fadeGain.gain.cancelScheduledValues(time);
      fadeGain.gain.setValueAtTime(1, time);
    }
  };

  private __isStopping = false;
  public readonly stop = () => {
    this.__fadeStartTime = this.getTrackPosition();
    this.__isStopping = true;

    this.__initializeFadeForPlay(this.__audioElement);

    const delay = this.getFade()?.length.out || 1;
    setTimeout(() => {
      this.pause();
      this.setTrackPosition(0);
      if (typeof this.__resolveOnEnd === 'function') {
        this.__resolveOnEnd();
      } else {
        Promise.resolve(this.__promise);
      }

      this.__isStopping = false;
    }, delay);
  

    return this.__promise!;
  };

  public readonly rewind = (milliseconds: number) => {
    this.setTrackPosition(this.getTrackPosition() - milliseconds);
    return this;
  };

  public readonly fastForward = (milliseconds: number) => {
    this.setTrackPosition(this.getTrackPosition() + milliseconds);
    return this;
  };

  private __fadeStartTime = 0;
  public readonly updateAudioElementVolume = () => {
    /* Set the audio element volume to the product of manager, group, and
     * fade, and sound volumes. */
  
    const managerVolume = this.getManagerVolume();
    const groupVolume = this.getGroupVolume();
    const soundVolume = this.getVolume();
    const fadeVolume = this.getFadeVolume({
      duration: this.getDuration(),
      fadeOnLoops: this.__fadeOnLoops,
      fade: this.getFade(),
      loop: Boolean(this.__loopOverride),
      isStopping: this.__isStopping,
      loopIterationCount: this.__loopIterationCount,
      startingTime: this.__fadeStartTime,
      time: this.getTrackPosition(),
    });

    const volProduct = managerVolume * groupVolume * soundVolume * fadeVolume;
    const boundedVol = Math.max(1, Math.min(0, volProduct));
    assertValid<HTMLAudioElement>(this.__audioElement).volume = boundedVol;

    return this;
  };

  // This is a ratio, so it doesn't need to know anything about the sound's
  // underlying volume(s). This ratio is computed solely from arguments.
  public readonly getFadeVolume = ({
    duration,
    fadeOnLoops,
    fade,
    isStopping,
    loop,
    loopIterationCount,
    startingTime,
    time,
  }: IGetFadeVolumeArgs) => {
    if (fade) {
      return getFadeVolume({
        duration,
        fade,
        fadeOnLoops,
        isStopping,
        loop,
        loopIterationCount,
        startingTime,
        time,
      });
    }

    return 1;
  };
}
