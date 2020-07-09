import classNames from 'classnames';
import {
  ISoundManagerViewProps,
} from './ISoundManagerViewProps';
import {
  SoundGroupView,
} from '../SoundGroupView';

import * as React from 'react';

export const SoundManagerView: React.FunctionComponent<ISoundManagerViewProps> = ({
  className,
  manager: {
    collection: { groups },
    registerStateCallback,
    unregisterStateCallback,
  },
}) => (
  <div
    className={classNames(
      'sound-manager-view',
      className,
    )}
  >
    <ul>
      {Object.keys(groups).map((name) => (
        <SoundGroupView
          group={groups[name]}
          key={name}
          registerStateCallback={registerStateCallback}
          unregisterStateCallback={unregisterStateCallback}
        />
      ))}
    </ul>
  </div>
);
