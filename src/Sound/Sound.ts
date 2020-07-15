import {
  BaseNode,
} from '../Node/BaseNode';
import {
  getFadeVolume,
} from '../Fade/getFadeVolume';
import {
  getFrozenObject,
} from '../functions/getFrozenObject';
import {
  IFade,
} from '../Fade/IFade';
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
    PanelRegisterableNodeMixin(
    TaggableNodeMixin(
      BaseNode
    ))
  implements ISound
{
  get type(): NodeTypes.Sound {
    return NodeTypes.Sound;
  }

  private __playing = false;
  private __isStopping = false;

  private __startedTime = 0;
  private __pausedTime = 0; 
  private __fadeStartTime = 0;
  private __fadeStopTime = 0;

  private __promise: Promise<void> | null = null;

  private __loop = false;

  // Tracks how many times the song has looped this play session.
  private __loopIterationCount = 0;
  //

  // Do not initialize. `false` is still a valid override value.
  private __loopOverride?: boolean;
  //

  private __fade: IFade | null = null;
  private __fadeOnLoops = true;
  private __fadeOverride?: IFade;

  private __audioElement: HTMLAudioElement | null = null;


  private __resolveOnEnd: ((value?: void | PromiseLike<void> | undefined) => void) | undefined = undefined;
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
      fade,
      fadeOnLoops,
      getManagerVolume,
      loop,
      trackPosition,
    } = options;

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

    this.__initializeArgumentProperties({
      fade,
      fadeOnLoops,
      loop,
      trackPosition,
    });
  };

  private readonly __initializeArgumentProperties = ({
    fade,
    fadeOnLoops,
    loop,
    trackPosition,
  }: {
    fade: IFade | undefined,
    fadeOnLoops: boolean | undefined,
    loop: boolean | undefined,
    trackPosition: number | undefined,
  }) => {
    if (fade) {
      this.setFade(fade);
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

  public readonly setVolume = (value: number) => {
    super.setVolume(value);
    this.updateAudioElementVolume();
    return this;
  };

  public readonly getTrackPosition = () => {
    if (this.isPlaying()) {
      return assertValid<HTMLAudioElement>(
        this.__audioElement,
        strings.GET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
      ).currentTime * 1000;
    }

    return this.__pausedTime;
  };

  // Must be milliseconds.
  public readonly setTrackPosition = (milliseconds: number) => {
    this.__startedTime = milliseconds / 1000;
    assertValid<HTMLAudioElement>(
      this.__audioElement,
      strings.SET_TRACK_POSITION_AUDIO_ELEMENT_INVALID,
    ).currentTime = this.__startedTime;

    return this;
  };

  // Returned in milliseconds.
  public readonly getDuration = () => {
    return assertValid<HTMLAudioElement>(
      this.__audioElement,
      strings.GET_DURATION_AUDIO_ELEMENT_INVALID,
    ).duration * 1000;
  };

  public readonly isPlaying = () => Boolean(this.__playing);

  public readonly getLoop = () => typeof this.__loopOverride === 'boolean' ?
    this.__loopOverride :
    this.__loop;

  public readonly setLoop = (loop: boolean) => {
    this.__loop = Boolean(loop);
    return this;
  };

  public readonly getFade = () => this.__fadeOverride || this.__fade;

  public readonly setFade = (fade: IFade | null) => {
    this.__fade = fade === null ? fade : getFrozenObject({
      easingCurve: getFrozenObject({
        ...fade.easingCurve,
      }),

      length: getFrozenObject({
        ...fade.length,
      }),
    });

    return this;
  };

  public readonly play = ({
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

      this.__fadeStartTime = this.getTrackPosition();
      this.__updateSoundTimes();

      this.__initializeForPlay({
        fadeOnLoops,
        fadeOverride,
        loopOverride,
      });

      playAudioSource(this, this.__audioElement);

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
    fadeOnLoops,
    fadeOverride,
    loopOverride,
  }: Partial<IPlaySoundOptions> = {}) => {
    /* Sets the override properties e.g. if this sound is part of a
     * playlist, or the changes occurred through play options. */
    if (typeof fadeOnLoops === 'boolean') {
      this.__fadeOnLoops = fadeOnLoops;
    }

    if (fadeOverride) {
      this.__fadeOverride = getFrozenObject({
        easingCurve: getFrozenObject({
          ...fadeOverride.easingCurve,
        }),
  
        length: getFrozenObject({
          ...fadeOverride.length,
        }),
      });
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

    this.updateAudioElementVolume();
    
    /* If a promise is already on the Sound, it must be respected, and
     * a new one should not be constructed. */
    if (!this.__promise) {
      this.__initializePromiseForPlay();
    }

    this.__initializeEventsForPlay(audioElement);
  };

  private readonly __updateSoundTimes = () => {

    assertValid<HTMLAudioElement>(
      this.__audioElement,
    ).currentTime = this.getTrackPosition() / 1000;
  };

  private readonly __initializeFadeForPlay = (
    audioElement?: HTMLAudioElement | null,
  ) => {
    scheduleHtmlAudioFades(
      assertValid<HTMLAudioElement>(audioElement),
      this.updateAudioElementVolume,
    );
  };

  private readonly __initializeStartStopResolver = (
    resolve: (value?: void | PromiseLike<void> | undefined) => void,
  ) => (
    this.__resolveOnEnd = resolve
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
  ) => {
    const source = assertValid<HTMLAudioElement>(
      audioElement,
      'The audio element was not found in Sound.__initializeEventsForPlay.',
    );

    /* Register the ended export function to fire when the audio source emits the
     * 'ended' event. */
    const endHandler = this.__getEndEventHandler(
      source,
    );

    source.addEventListener('ended', endHandler);

    // Pass the handler back up.
    return endHandler;
  };

  private readonly __getEndEventHandler = (
    source: AudioBufferSourceNode | HTMLAudioElement,
  ) => {
    const ended = (): Promise<void> => {
      this.__isStopping = true;

      // Remove the 'ended' event listener.
      source.removeEventListener('ended', ended);
      // If the track ended, and loop is true, manually reset it to the
      // beginning and keep playing. Increment the loop counter as well.
      this.pause();

      this.__isStopping = false;

      if (this.getLoop()) {
        this.__loopIterationCount += 1;
        return this.play({
          fadeOnLoops: this.__fadeOnLoops,
          fadeOverride: this.__fadeOverride,
          loopOverride: this.__loopOverride,
        });
      }

      return this.stop();
    };

    return ended;
  };

  public readonly pause = () => {
    /* Must be executed before __playing = false. */
    this.__fadeStartTime = 0;
    this.__fadeStopTime = 0;
    this.__startedTime = 0;
    if (!this.__isStopping) {
      this.__pausedTime = this.getTrackPosition();
    }

    try {
      if (this.isPlaying()) {
        /* Must be executed after __pausedTime = ... */
        assertValid<HTMLAudioElement>(this.__audioElement).pause();
      }
 
      /* Must be executed after __pausedTime = ... and this.getPlaying(). */
      this.__playing = false;
    } catch (err) {
      if (typeof this.__rejectOnError === 'function') {
        this.__rejectOnError(err);
      } else {
        throw err;
      }
    }

    return this;
  };

  public readonly stop = (noFadeOut = false) => {
    this.__isStopping = true;
    this.__loopIterationCount = 0;
    this.__fadeStopTime = this.getTrackPosition();

    this.__initializeFadeForPlay(this.__audioElement);

    if (noFadeOut) {
      // Delete the rejector.
      delete this.__rejectOnError;

      // Delete the resolver.
      delete this.__resolveOnEnd;
    } else {
      const delay = this.getFade()?.length.out || 0;
      setTimeout(() => {
        this.pause();
        this.setTrackPosition(0);
        if (typeof this.__resolveOnEnd === 'function') {
          this.__resolveOnEnd();
        } else {
          Promise.resolve(this.__promise);
        }

        this.__isStopping = false;
    
        // Delete the rejector.
        delete this.__rejectOnError;
    
        // Delete the resolver.
        delete this.__resolveOnEnd;
      }, delay + 50);
    }

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

  public readonly updateAudioElementVolume = () => {
    /* Set the audio element volume to the product of manager, group, and
     * fade, and sound volumes. */
  
    const managerVolume = this.getManagerVolume();
    const groupVolume = this.getGroupVolume();
    const soundVolume = this.getVolume();
    const fadeVolume = this.getFadeVolume();

    const volProduct = managerVolume * groupVolume * soundVolume * fadeVolume;
    const boundedVol = Math.min(1, Math.max(0, volProduct));
    assertValid<HTMLAudioElement>(this.__audioElement).volume = boundedVol;

    return this;
  };

  // This is a ratio, so it doesn't need to know anything about the sound's
  // underlying volume(s). This ratio is computed solely from arguments.
  public readonly getFadeVolume = () => {
    const fade = this.getFade();
    if (fade) {
      return getFadeVolume({
        fade,
        duration: this.getDuration(),
        fadeOnLoops: this.__fadeOnLoops,
        loop: Boolean(this.__loopOverride),
        isStopping: this.__isStopping,
        loopIterationCount: this.__loopIterationCount,
        startingTime: this.__fadeStartTime,
        stoppingTime: this.__fadeStopTime,
        time: this.getTrackPosition(),
      });
    }

    return 1;
  };
}
