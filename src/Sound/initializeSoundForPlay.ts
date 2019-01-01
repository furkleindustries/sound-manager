import {
  doWebAudioFadeIn,
} from '../functions/doWebAudioFadeIn';
import {
  doWebAudioFadeOut,
} from '../functions/doWebAudioFadeOut';
import {
  ISound,
} from './ISound';

export function initializeSoundForPlay(sound: ISound, audioElement?: HTMLAudioElement) {
  const source = sound.isWebAudio() ? sound.getSourceNode() : audioElement;
  const fade = sound.getFade();

  if (!source) {
    throw new Error();
  }

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

  Object.defineProperty(sound, '__promise', {
    value: new Promise((resolve, reject) => {  
      const ended = (e: Event) => {
        /* Remove the 'ended' event listener. */
        source.removeEventListener('ended', ended);

        /* istanbul ignore next */
        if (!sound.isWebAudio()) {
          /* Remove the 'timeupdate' event listener. */
          source.removeEventListener('timeupdate', timeUpdate);
        }

        /* Don't reject the emitted promise. */
        Object.defineProperty(source, '__rejectOnStop', { value: () => {}, });

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
    }),
  });
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
      const fadeGainNode = sound.getFadeGainNode();
      doWebAudioFadeIn({
        fade,
        fadeGainNode,
        getFadeVolume: () => sound.getFadeVolume(),
        getContextCurrentTime: () => sound.getContextCurrentTime(),
      });
  
      doWebAudioFadeOut({
        fade,
        fadeGainNode,
        duration: sound.getDuration(),
        getFadeVolume: () => sound.getFadeVolume(),
        getContextCurrentTime: () => sound.getContextCurrentTime(),
      });
    } else {
      if (!audioElement) {
        throw new Error();      
      }
  
      audioElement.addEventListener('timeupdate', htmlTimeUpdater);
    }
  }    
}

export function initializeStopRejector(sound: ISound, reject: Function) {
  Object.defineProperty(sound, '__rejectOnStop',  {
    value: (message?: string) => {
      return reject(
        message ||
        'The sound was stopped, probably by a user-created script.'
      );
    },
  });
}
