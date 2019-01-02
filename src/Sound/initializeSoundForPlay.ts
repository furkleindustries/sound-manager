import {
  defineProperty,
} from '../functions/defineProperty';
import {
  scheduleWebAudioFades,
} from '../Fade/scheduleWebAudioFades';
import {
  ISound,
} from './ISound';

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

    initializePromiseForPlay(sound, audioElement, timeUpdate);
  } else {
    initializePromiseForPlay(sound);
  }
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
  const fade = sound.getFade();
  if (fade) {
    if (sound.isWebAudio()) {
      scheduleWebAudioFades(sound);
    } else {
      if (!audioElement) {
        throw new Error();      
      }

      audioElement.addEventListener('timeupdate', htmlTimeUpdater);
    }
  }
}

export function initializeStopRejector(sound: ISound, reject: Function) {
  defineProperty(sound, '__rejectOnStop',  (message?: string) => (
    reject(
      message ||
      'The sound was stopped, probably by a user-created script.'
    )
  ));
}

export function initializePromiseForPlay(
  sound: ISound,
  audioElement?: HTMLAudioElement,
  timeUpdate?: () => void,
)
{
  defineProperty(sound, '__promise', new Promise((resolve, reject) => {
    const source = sound.isWebAudio() ? sound.getSourceNode() : audioElement;

    if (!source) {
      throw new Error();
    }
  
    const ended = (e: Event) => {
      /* Remove the 'ended' event listener. */
      source.removeEventListener('ended', ended);

      /* istanbul ignore next */
      if (!sound.isWebAudio() && typeof timeUpdate === 'function') {
        /* Remove the 'timeupdate' event listener. */
        source.removeEventListener('timeupdate', timeUpdate);
      }

      /* Don't reject the emitted promise. */
      defineProperty(source, '__rejectOnStop', () => {});

      /* Reset the track position of the sound after it ends. Also deletes
        * the old promise. */
      sound.stop();

      /* Resolve the promise with the ended event. */
      return resolve(e);
    };

    /* Register the ended export function to fire when the audio source emits the
     * 'ended' event. */
    source.addEventListener('ended', ended);

    /* Allow the promise to be rejected if the sound is stopped. */
    initializeStopRejector(sound, reject);
  }));
}
