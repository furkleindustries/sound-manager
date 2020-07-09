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
  IManagerStateCallback,
} from '../interfaces/IManagerStateCallback';
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
  fadeOutToStop,
} from '../functions/fadeOutToStop';
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
  /* @ts-ignore */
  public getManagerVolume: () => number = () => 1;

  private __promise: Promise<void> | null = null;
  private __sourceNode: AudioBufferSourceNode | null = null;
  private __startedTime: number = 0;
  private __resolveOnEnd: () => void = () => {};
  /* @ts-ignore */
  private __rejectOnError = () => {};
  private __fadeGainNode: GainNode | null = null;
  private __fadeOverride?: IFade;
  private __loopOverride?: boolean;

  /* istanbul ignore next */
  public getGroupVolume: () => number = () => 1;

  constructor(
    options: ISoundOptions,
    public readonly registerStateCallback: (
      callback: IManagerStateCallback,
    ) => void,

    public readonly unregisterStateCallback: (
      callback: IManagerStateCallback,
    ) => void,

    public readonly callStateCallbacks: () => void,
  ) {
    super({ ...options });

    assert(options, strings.CTOR_OPTIONS_INVALID);

    const {
      audioElement,
      buffer,
      fade,
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

    this.__initializeArgumentProperties(
      fade,
      loop,
      trackPosition,
    );

    if (!this.isWebAudio()) {
      this.updateAudioElementVolume();
    }

    this.callStateCallbacks();
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

  private readonly __initializeArgumentProperties = (
    fade: boolean | IFadeOptions | undefined,
    loop: boolean | number | undefined,
    trackPosition: number | undefined,
  ) => {
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

    this.callStateCallbacks();

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
  public readonly setTrackPosition = (seconds: number) => {
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

    this.callStateCallbacks();

    return this;
  };

  // Returned in milliseconds.
  public readonly getDuration = () => {
    if (this.isWebAudio()) {
      const {
        buffer,
      } = this.getSourceNode();

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
  public readonly getLoop = () => this.__loopOverride || this.__loop;

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

    this.callStateCallbacks();

    return this;
  };

  public readonly getFade = () => this.__fadeOverride || this.__fade;

  public readonly setFade = (fade: IFade | null) => {
    this.__fade = fade;

    this.callStateCallbacks();

    return this;
  };

  public readonly play = (fadeOverride?: IFade, loopOverride?: boolean) => {
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

    this.__initializeForPlay(fadeOverride, loopOverride);

    playAudioSource(this, this.__audioElement, contextTime);

    /* Reset the paused time. */
    this.__pausedTime = 0;

    /* Ensure the sound knows it's playing. */
    this.__playing = true;

    this.callStateCallbacks();

    /* Emit the promise that was either just generated or emitted on previous
     * unfinished plays. */
    return assertValid<Promise<void>>(this.__promise);
  };

  /* Regenerates the source node, generates the promise if it does not already
   * exist, registers events, etc. */
  private readonly __initializeForPlay = (
    fadeOverride?: IFade,
    loopOverride?: boolean,
  ) => {
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

  private readonly __initializeFadeForPlay = (
    audioElement?: HTMLAudioElement | null,
    htmlTimeUpdater?: () => void,
  ) => {
    if (this.isWebAudio()) {
      scheduleWebAudioFades(this);
    } else {
      scheduleHtmlAudioFades(
        assertValid<HTMLAudioElement>(audioElement),
        assertValid<() => void>(htmlTimeUpdater),
      );
    }
  };

  private readonly __initializeStartStopResolver = (resolve: Function) => (
    this.__resolveOnEnd = (...args: any[]) => resolve(...args)
  );

  private readonly __initializeRejector = (reject: Function) => (
    this.__rejectOnError = (message?: string) => reject(
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
    timeUpdate?: () => void,
  ) => {
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
  };

  private readonly __getEndEventHandler = (
    source: AudioBufferSourceNode | HTMLAudioElement,
    timeUpdate?: () => void,
  ) => {
    const ended = () => {
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

      /* Resolve the emitted promise. */
      this.__rejectOnError = () => this.__promise;

      /* Reset the track position of the sound after it ends. Also rejects
       * the old promise. */
      this.stop();

      /* Resolve the promise with the ended event. */
      this.__resolveOnEnd();
    };

    return ended;
  };

  public readonly pause = () => {
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
    this.callStateCallbacks();

    return this;
  };

  private readonly __clearScheduledFades = () => {
    delete this.__fadeOverride;
    if (this.isWebAudio()) {
      const fadeGain = this.getFadeGainNode();
      fadeGain.gain.cancelScheduledValues(this.getContextCurrentTime());
      fadeGain.gain.setValueAtTime(1, this.getContextCurrentTime());
    }
  };

  public readonly stop = () => {
    fadeOutToStop(this).then(() => {
      this.__resolveOnEnd();
      this.callStateCallbacks();
    });

    return this.__promise as Promise<void>;
  };

  public readonly rewind = (milliseconds: number) => {
    this.setTrackPosition(this.getTrackPosition() - milliseconds);
    this.callStateCallbacks();

    return this;
  };

  public readonly fastForward = (milliseconds: number) => {
    this.setTrackPosition(this.getTrackPosition() + milliseconds);
    this.callStateCallbacks();

    return this;
  };

  public readonly updateAudioElementVolume = () => {
    /* Set the audio element volume to the product of manager, group, and
     * fade, and sound volumes. */
    const sources = [
      'Manager',
      'Group',
      'Fade',
      '',
    ];

    const volumes = sources.map(() => 1);

    for (let ii = 0; ii < sources.length; ii += 1) {
      const key = sources[ii];
      // @ts-ignore
      const computedVol = this[`get${key}Volume`]();
      if (isValidVolume(computedVol)) {
        volumes[ii] = computedVol;
      } else {
        console.warn(`Expected a volume between the inclusive range of 0 and 1 in Sound.get${key}Volume. Instead, ${computedVol} was received.`)
      }
    }

    const boundedVolume = volumes.reduce((aa, bb) => aa * bb, 1);

    assertValid<HTMLAudioElement>(this.__audioElement).volume = boundedVolume;

    return this;
  };

  public readonly getFadeVolume = (
    iterationCount = 0,
    fadeOnLoops = false,
  ) => {
    const fade = this.getFade();
    const time = this.getTrackPosition();
    const duration = this.getDuration();
    const targetVolume = this.getVolume();

    if (fade) {
      return getFadeVolume({
        duration,
        fade,
        fadeOnLoops,
        iterationCount,
        targetVolume,
        time,
      });
    }

    return 1;
  };
}
