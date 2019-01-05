import {
  assert,
} from '../assertions/assert';
import {
  assertValid,
} from '../assertions/assertValid';
import {
  ISound,
} from './ISound';
import {
  scheduleHtmlAudioFades,
} from '../Fade/scheduleHtmlAudioFades';
import {
  scheduleWebAudioFades,
} from '../Fade/scheduleWebAudioFades';

export function initializeSoundForPlay(sound: ISound, audioElement?: HTMLAudioElement) {
  const fade = sound.getFade();

  let timeUpdate: () => void;
  if (fade) {
    /* Update the audio element volume on every tick, including fade
     * volume. */
    /* istanbul ignore next */
    timeUpdate = () => sound.updateAudioElementVolume();
    initializeFadeForPlay({
      audioElement,
      sound,
      htmlTimeUpdater: timeUpdate,
    });
  }

  initializePromiseForPlay(sound, audioElement, timeUpdate!);
}

export function initializeFadeForPlay({
  audioElement,
  sound,
  htmlTimeUpdater,
}: {
  audioElement?: HTMLAudioElement,
  sound: ISound,
  htmlTimeUpdater: () => void,
})
{
  if (sound.isWebAudio()) {
    scheduleWebAudioFades(sound);
  } else {
    assert(audioElement);
    scheduleHtmlAudioFades(audioElement!, htmlTimeUpdater);
  }
}

export function initializeStopRejector(sound: ISound, reject: Function) {
  sound.__rejectOnStop = (message?: string) => (
    reject(
      message ||
      'The sound was stopped, probably by a user-created script.'
    )
  );
}

export function initializePromiseForPlay(
  sound: ISound,
  audioElement?: HTMLAudioElement,
  timeUpdate?: () => void,
)
{
  sound.__promise = new Promise((resolve, reject) => {
    initializeEventsForPlay(sound, resolve, audioElement, timeUpdate);

    /* Allow the promise to be rejected if the sound is stopped. */
    initializeStopRejector(sound, reject);
  });
}

export function initializeEventsForPlay(
  sound: ISound,
  resolver: (arg: Event) => void,
  audioElement?: HTMLAudioElement,
  timeUpdate?: () => void,
)
{
  const isWebAudio = sound.isWebAudio();
  const source = assertValid<AudioBufferSourceNode | HTMLAudioElement>(
    isWebAudio ? sound.getSourceNode() : audioElement,
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
    sound.__rejectOnStop = () => {};

    /* Reset the track position of the sound after it ends. Also deletes
     * the old promise. */
    sound.stop();

    /* Resolve the promise with the ended event. */
    return resolver(e);
  };

  /* Register the ended export function to fire when the audio source emits the
   * 'ended' event. */
  source.addEventListener('ended', ended);
}
