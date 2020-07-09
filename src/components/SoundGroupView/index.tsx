import classNames from 'classnames';
import {
  ISoundGroupViewProps,
} from './ISoundGroupViewProps';
import {
  SoundView,
} from '../SoundView';

import * as React from 'react';

export const SoundGroupView: React.FunctionComponent<ISoundGroupViewProps> = ({
  className,
  group: { sounds },
}) => (
  <div
    className={classNames(
      'sound-group-view',
      className,
    )}

    key="sound-group-view"
  >
    <ul>
      {Object.keys(sounds)
        .filter((key) => sounds[key].isPanelRegistered())
        .map((key) => (
          <li key={key}>
            <SoundView
              name={key}
              key={key}
              sound={sounds[key]}
            />
          </li>
        ))}
    </ul>
  </div>
);
