import classNames from 'classnames';
import {
  ISoundControllerProps,
} from './ISoundControllerProps';

import * as React from 'react';

export const SoundController: React.FC<
  ISoundControllerProps
> = ({
  className,
  sound: {
    getLoop,
    getVolume,
    isPlaying,
    pause,
    play,
    setLoop,
    setVolume,
  },
}) => {
  const volumeSetter = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(Math.max(Math.min(Number(e.currentTarget.value), 1), 0))
  };

  const playSetter = () => {
    if (isPlaying()) {
      pause();
    } else {
      play().then(
        Promise.resolve,
        Promise.reject,
      );
    }
  };

  const loopSetter = () => setLoop(!getLoop());

  const isPlayingNow = isPlaying();

  const loopId = Math.random().toString();
  const volumeId = Math.random().toString();

  return (
    <div
      className={classNames(
        'sound-controller',
        className,
      )}
    >
      <label htmlFor={volumeId}>
        &#x23F6;&#xFE0E;/&#x23F7;&#xFE0E;
      </label>

      <input
        className="sound-controller-volume"
        defaultValue={getVolume()}
        id={volumeId}
        key="sound-controller-volume"
        max={1}
        min={0}
        step={0.01}
        onChange={volumeSetter}
        type="range"
      />

      <label htmlFor={loopId}>
        &#x21BB;&#xFE0E;
      </label>

      <input
        className="sound-controller-loop"
        defaultChecked={getLoop()}
        id={loopId}
        key="sound-controller-loop"
        onChange={loopSetter}
        type="checkbox"
      />

      <button 
        className="sound-controller-play"
        key="sound-controller-play"
        onClick={playSetter}
      >
        {isPlayingNow ? '\uFE0F\u200D\uFE0E' : '\u23F5\u200D\uFE0E'}
      </button>
    </div>
  );
};
