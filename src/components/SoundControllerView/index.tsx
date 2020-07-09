import classNames from 'classnames';
import {
  IManagerStateCallback,
} from '../../interfaces/IManagerStateCallback';
import {
  ISoundControllerViewProps,
} from './ISoundControllerViewProps';

import * as React from 'react';
import { makeSoundGroupIdentifier } from '../../functions/makeSoundGroupIdentifier';

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

    const loopId = Math.random().toString();
    const volumeId = Math.random().toString();

    return (
      <div
        className={classNames(
          'sound-controller-view',
          className,
        )}

        key="sound-controller-view"
      >
        <label htmlFor={volumeId}>
          ⏶/⏷
        </label>

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

        <label htmlFor={loopId}>
          ↻
        </label>

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
          {isPlayingNow ? '⏸' : '⏵︎'}
        </button>
      </div>
    );
  };

  public readonly componentWillUnmount = () => {
    this.props.sound.unregisterStateCallback(this.stateCallback);
  };
}
