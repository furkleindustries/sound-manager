import classNames from 'classnames';
import {
  ISoundGroupViewProps,
} from './ISoundGroupViewProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';

import * as React from 'react';
import { SoundView } from '../SoundView';

export class SoundGroupView extends React.PureComponent<ISoundGroupViewProps> {
  public readonly render = () => {
    const {
      className,
      components = {},
      group: {
        sounds,
      },
    } = this.props;

    return recursivelyReplaceWithArgComps(
      components,
      <div
        className={classNames(
          'sound-group-view',
          className,
        )}
      >
        <ul>
          {Object.keys(sounds).map((key) => (
            <li>
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
  };
}
