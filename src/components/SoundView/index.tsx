import classNames from 'classnames';
import {
  ISoundViewProps,
} from './ISoundViewProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';
import {
  SoundControllerView,
} from '../SoundControllerView';
import {
  SoundViewLabel,
} from '../SoundViewLabel';

import * as React from 'react';

export class SoundView extends React.PureComponent<ISoundViewProps> {
  public readonly render = () => {
    const {
      className,
      components = {},
      name,
      sound,
      sound: { getLabel },
    } = this.props;

    const label = getLabel();

    return recursivelyReplaceWithArgComps(
      components,
      <div
        className={classNames(
          'sound-view',
          className,
        )}
      >
        <SoundViewLabel
          components={components}
          label={label}
          name={name}
        />

        <SoundControllerView
          components={components}
          sound={sound}
        />
      </div>
    );
  };
}
