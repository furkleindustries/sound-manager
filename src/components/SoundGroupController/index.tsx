import classNames from 'classnames';
import {
  ISoundGroupControllerOwnProps,
} from './ISoundGroupControllerOwnProps';

import * as React from 'react';

export const SoundGroupController: React.FC<
  ISoundGroupControllerOwnProps
> = ({
  className,
  group: {
    getVolume,
    setVolume,
  },
}) => {
  const volumeSetter = (e: React.FormEvent<HTMLInputElement>) => {
    setVolume(Math.max(Math.min(Number(e.currentTarget.value), 1), 0))
  };

  const volumeId = Math.random().toString();

  return (
    <div
      className={classNames(
        'sound-group-controller',
        className,
      )}
    >
      <label htmlFor={volumeId}>
        ⏶&#xFE0E;/⏷&#xFE0E;
      </label>

      <input
        className="sound-group-controller-volume"
        key="sound-group-controller-volume"
        max={1}
        min={0}
        step={0.01}
        onChange={volumeSetter}
        type="range"
        value={getVolume()}
      />
    </div>
  );
};
