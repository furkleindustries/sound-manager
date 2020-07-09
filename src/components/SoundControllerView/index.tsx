import classNames from 'classnames';
import {
  IManagerStateCallback,
} from '../../interfaces/IManagerStateCallback';
import {
  ISoundControllerViewProps,
} from './ISoundControllerViewProps';

import * as React from 'react';

export class SoundControllerView extends React.PureComponent<
  ISoundControllerViewProps
> {
  private readonly stateCallback: IManagerStateCallback = () => {
    this.forceUpdate();
  };

  public readonly render = () => {
    const {
      className,
      sound: {
        registerStateCallback,
        getVolume,
        isPlaying,
        pause,
        play,
        setVolume,
      },
    } = this.props;

    registerStateCallback(this.stateCallback);

    const volumeSetter = (e: React.FormEvent<HTMLInputElement>) => {
      setVolume(Math.max(Math.min(Number(e.currentTarget.value), 1), 0))
    };

    const playSetter = () => {
      if (isPlaying()) {
        pause();
      } else {
        play().then(
          () => {},
          () => {},
        );
      }
    };

    const isPlayingNow = isPlaying();
    const volume = getVolume();

    return (
      <div
        className={classNames(
          'sound-controller-view',
          className,
        )}

        key="sound-controller-view"
      >
        <input
          className="sound-controller-view-volume"
          key="sound-controller-view-volume"
          max={1}
          min={0}
          step={0.01}
          onChange={volumeSetter}
          type="range"
          value={volume}
        />

        <button 
          className="sound-controller-view-play"
          key="sound-controller-view-play"
          onClick={playSetter}
          value={volume}
        >
          {isPlayingNow ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  };

  public readonly componentWillUnmount = () => {
    this.props.sound.unregisterStateCallback(this.stateCallback);
  };
}
