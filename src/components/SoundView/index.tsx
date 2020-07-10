import classNames from 'classnames';
import {
  ISoundViewProps,
} from './ISoundViewProps';
import {
  SoundController,
} from '../SoundController';
import {
  SoundViewLabel,
} from '../SoundViewLabel';
import {
  SoundViewTitle,
} from '../SoundViewTitle';

import * as React from 'react';

export const SoundView: React.FunctionComponent<ISoundViewProps> = ({
  className,
  name,
  sound,
}) => (
  <div
    className={classNames(
      'sound-view',
      className,
    )}

    key="sound-view"
  >
    <SoundViewTitle title={sound.getLabel().title || name} />

    <SoundController sound={sound} />

    <SoundViewLabel
      label={sound.getLabel()}
      name={name}
    />
  </div>
);
