import classNames from 'classnames';
import {
  IManagerStateCallback,
} from '../../interfaces/IManagerStateCallback';
import {
  ISoundGroupViewProps,
} from './ISoundGroupViewProps';
import {
  SoundView,
} from '../SoundView';

import * as React from 'react';

export class SoundGroupView extends React.PureComponent<ISoundGroupViewProps> {
  public readonly render = () => {
    const {
      className,
      group: { sounds },
    } = this.props;

    return (
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
  };

  private stateCallback: IManagerStateCallback | null = null;
  public readonly componentDidMount = () => {
    this.stateCallback = () => this.forceUpdate();
    this.props.registerStateCallback(this.stateCallback);
  };

  public readonly componentWillUnmount = () => {
    this.props.unregisterStateCallback(this.stateCallback!);
    this.stateCallback = null;
  };
};
