import classNames from 'classnames';
import {
  ISoundControllerViewProps,
} from './ISoundControllerViewProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';

import * as React from 'react';

export class SoundControllerView extends React.PureComponent<
  ISoundControllerViewProps,
  { readonly volume: number }
> {
  private changeId = '';

  public readonly state: { readonly volume: number} = {
    volume: 1,
  };

  public readonly render = () => {
    const {
      className,
      components = {},
      sound: {
        addVolumeChangeCallback,
        getVolume,
        isPlaying,
        pause,
        play,
        setVolume,
      },
    } = this.props;

    this.changeId = String(Math.random() * 555555555);

    addVolumeChangeCallback(this.changeId, (_, volume) => {
      this.setState({ volume });
    });

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

    return recursivelyReplaceWithArgComps(
      components,
      <div
        className={classNames(
          'sound-controller-view',
          className,
        )}
      >
        <input
          className="sound-controller-view-volume"
          onInput={volumeSetter}
          value={volume}
        />

        <button 
          className="sound-controller-view-play"
          onClick={playSetter}
          value={volume}
        >
          {isPlayingNow ? 'Pause' : 'Play'}
        </button>
      </div>
    );
  };

  public readonly componentWillUnmount = () => {
    if (this.changeId) {
      this.props.sound.removeVolumeChangeCallback(this.changeId);
    }
  };
}
