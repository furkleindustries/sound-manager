import classNames from 'classnames';
import {
  ISoundManagerViewProps,
} from './ISoundManagerViewProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';
import {
  SoundGroupView,
} from '../SoundGroupView';

import * as React from 'react';

export class SoundManagerView extends React.PureComponent<ISoundManagerViewProps> {
  public readonly render = () => {
    const {
      className,
      components = {},
      manager: {
        collection: { getAllGroups },
      },
    } = this.props;

    return recursivelyReplaceWithArgComps(
      components,
      <div
        className={classNames(
          'sound-manager-view',
          className,
        )}
      >
        <ul>
          {getAllGroups().map((group) => (
            <SoundGroupView
              group={group}
            />
          ))}
        </ul>
      </div>
    );
  };
}
