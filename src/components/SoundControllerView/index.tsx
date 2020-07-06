import classNames from 'classnames';
import {
  ISoundControllerViewProps,
} from './ISoundControllerViewProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';

import * as React from 'react';

export class SoundControllerView extends React.PureComponent<ISoundControllerViewProps> {
  private changeId = '';

  public readonly render = () => {
    const {
      className,
      components = {},
      sound: {
        addVolumeChangeCallback,
        getLoop,
        getVolume,
        isPanelRegistered,
        isPlaying,
        isWebAudio,
        pause,
        play,
        rewind,
        setLoop,
        setVolume,
        stop,
      },
    } = this.props;

    this.changeId = String(Math.random() * 555555555);

    addVolumeChangeCallback(this.changeId, (name: string, volume: number) => {
      this.forceUpdate();
    });

    const volumeSetter = (e: React.FormEvent<HTMLInputElement>) => {
      setVolume(Math.max(Math.min(Number(e.currentTarget.value), 1), 0))
    };

    const playSetter = () => {
      if (isPlaying()) {
        pause();
      } else {
        play().then(
          () => this.forceUpdate(),
          () => this.forceUpdate(),
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
