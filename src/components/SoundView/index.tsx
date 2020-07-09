import classNames from 'classnames';
import {
  ISoundViewProps,
} from './ISoundViewProps';
import {
  SoundControllerView,
} from '../SoundControllerView';
import {
  SoundViewLabel,
} from '../SoundViewLabel';

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
    <SoundViewLabel
      label={sound.getLabel()}
      name={name}
    />

    <SoundControllerView sound={sound} />
  </div>
);
