import classNames from 'classnames';
import {
  ISoundGroupViewProps,
} from './ISoundGroupViewProps';
import {
  SoundGroupController,
} from '../SoundGroupController';
import {
  SoundGroupViewTitle,
} from '../SoundGroupViewTitle';
import {
  SoundView,
} from '../SoundView';

import * as React from 'react';

export const SoundGroupView: React.FC<ISoundGroupViewProps> = ({
  className,
  groupName,
  group,
  group: {
    sounds,
    getLabel,
    isPanelRegistered,
  },
}) => (
  <div
    className={classNames(
      'sound-group-view',
      className,
    )}
  >
    {isPanelRegistered() ?
      <div className="sound-group-content-container">
        <SoundGroupViewTitle
          groupName={groupName}
          label={getLabel()}
        />

        <SoundGroupController
          group={group}
          groupName={groupName}
        />
      </div> :
      null}

    <ul>
      {Object.keys(sounds)
        .filter((key) => sounds[key].isPanelRegistered())
        .map((key) => (
          <li key={key}>
            <SoundView
              name={key}
              sound={sounds[key]}
            />
          </li>
        ))}
    </ul>
  </div>
);
