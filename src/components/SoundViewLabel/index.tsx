import classNames from 'classnames';
import {
  ISoundViewLabelProps,
} from './ISoundViewLabelProps';
import {
  recursivelyReplaceWithArgComps,
} from '../../functions/recursivelyReplaceWithArgComps';

import * as React from 'react';

export class SoundViewLabel extends React.PureComponent<ISoundViewLabelProps> {
  public readonly render = () => {
    const {
      className,
      components = {},
      name,
      label: {
        artistName,
        contributors,
        license,
        title,
      },
    } = this.props;

    return recursivelyReplaceWithArgComps(
      components,
      <div
        className={classNames(
          'sound-view',
          className,
        )}
      >
        <h6 className="sound-view-title">{title || name}</h6>
  
        {artistName ?
          <p className="sound-view-artist-name">
            <strong className="sound-view-artist-name-text">{artistName}</strong>
          </p> :
  
          null}
  
        {contributors.length ?
          <ul className="sound-view-contributors-list">
            {contributors.map((item) => (
              <li className="sound-view-contributors-list-item">
                <p className="sound-view-contributor">
                  <em className="sound-view-contributor-text">{item}</em>
                </p>
              </li>
            ))}
          </ul> :
  
          null}
  
        {license ?
          <p className="sound-view-license">
            <label className="sound-view-license-label">License</label>: <span className="sound-view-license-text">{license}</span>
          </p> :
          null}
      </div>
    );
  };
}
