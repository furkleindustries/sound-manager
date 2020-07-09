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
        getLabel,
        getLoop,
        getVolume,
        isPlaying,
        pause,
        play,
        registerStateCallback,
        setLoop,
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
  
    const loopSetter = () => setLoop(!getLoop());

    const isPlayingNow = isPlaying();

    const {
      artistName,
      contributors,
      license,
      title,
    } = getLabel();

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
          value={getVolume()}
        />

        <input
          className="sound-controller-view-loop"
          checked={getLoop()}
          key="sound-controller-view-loop"
          onChange={loopSetter}
          type="checkbox"
        />

        <button 
          className="sound-controller-view-play"
          key="sound-controller-view-play"
          onClick={playSetter}
        >
          {isPlayingNow ? 'Pause' : 'Play'}
        </button>

        <div>
          <p>
            <strong>{title}</strong>
          </p>

          <p>
            <em>{artistName}</em>
          </p>

          <ul>
            {contributors.map((contributor) => (
              <li key={contributor}>
                {contributor}
              </li>
            ))}
          </ul>

          <p>{license}</p>
        </div>
      </div>
    );
  };

  public readonly componentWillUnmount = () => {
    this.props.sound.unregisterStateCallback(this.stateCallback);
  };
}
