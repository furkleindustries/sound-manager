import classNames from 'classnames';
import {
  ISoundControllerProps,
} from './ISoundControllerProps';
import {
  ISoundControllerState,
} from './ISoundControllerState';

import * as React from 'react';

export class SoundController extends React.PureComponent<
  ISoundControllerProps,
  ISoundControllerState
> {
  public readonly state: ISoundControllerState = {
    duration: 0,
    isPlaying: false,
    loop: false,
    trackPosition: 0,
    volume: 0,
    durationId: Math.random().toString(),
    loopId: Math.random().toString(),
    volumeId: Math.random().toString(),
    timerId: null,
  };

  public readonly render = () => (
    <div
      className={classNames(
        'sound-controller',
        this.props.className,
      )}
    >
      <div>
        <label htmlFor={this.state.volumeId}>
          &#x23F6;&#xFE0E;/&#x23F7;&#xFE0E;
        </label>

        <input
          className="sound-controller-volume"
          defaultValue={this.state.volume}
          id={this.state.volumeId}
          key="sound-controller-volume"
          max={1}
          min={0}
          step={0.01}
          onChange={this.setVolume}
          type="range"
        />
      </div>

      <div>
        <label htmlFor={this.state.loopId}>
          &#x21BB;&#xFE0E;
        </label>

        <input
          className="sound-controller-loop"
          defaultChecked={this.state.loop}
          id={this.state.loopId}
          key="sound-controller-loop"
          onChange={this.setLoop}
          type="checkbox"
        />
      </div>

      <div>
        <button 
          className="sound-controller-play"
          key="sound-controller-play"
          onClick={this.setPlayState}
        >
          {this.state.isPlaying ? '⏸' : '▶'}
        </button>
      </div>

      <div>
        <label
          className="sound-controller-duration-label"
          htmlFor={this.state.durationId}
        >
          Track position
        </label>
      </div>

      <div>
        <input
          className="sound-controller-duration"
          onChange={this.setTrackPosition}
          id={this.state.durationId}
          min={0}
          max={this.state.duration}
          type="range"
          defaultValue={this.state.trackPosition}
        />
      </div>
    </div>
  );

  public readonly componentDidMount = () => {
    const {
      sound: {
        getVolume,
        getTrackPosition,
      },
    } = this.props;

    if (!this.state.timerId) {
      this.state.timerId = requestAnimationFrame(() => {
        const vol = getVolume();
        if (vol !== this.state.volume) {
          this.setVolume({
            currentTarget: {
              value: vol.toString(),
            },
          } as any);
        }

        const trackPos = getTrackPosition();
        if (trackPos !== this.state.trackPosition) {
          this.setTrackPosition({
            currentTarget: {
              value: trackPos.toString(),
            },
          } as any)
        }
      });
    }
  };

  public readonly componentWillUnmount = () => {
    cancelAnimationFrame(this.state.timerId);
  };

  public readonly setLoop = () => {
    this.props.sound.setLoop(!this.state.loop);
  };

  public readonly setPlayState = () => {
    if (this.state.isPlaying) {
      this.pause();
    } else {
      this.play().then(
        Promise.resolve,
        Promise.reject,
      );
    }
  };

  public readonly setTrackPosition = (e: React.FormEvent<HTMLInputElement>) => {
    const position = Number(e.currentTarget.value);
    this.setTrackPosition({
      currentTarget: {
        value: position.toString(),
      },
    } as any);
  };

  public readonly setVolume = (e: React.FormEvent<HTMLInputElement>) => {
    const vol = Number(e.currentTarget.value);
    this.setVolume({
      currentTarget: {
        value: Math.min(1, Math.max(0, vol)).toString(),
      },
    } as any);
  };

  public readonly pause = () => {
    this.setState({ isPlaying: false });
    return this.props.sound.pause();
  };

  public readonly play = () => {
    this.setState({ isPlaying: true });
    return this.props.sound.play();
  };
};
