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
          'sound-view-label',
          className,
        )}

        key="sound-view-label"
      >
        <h6
          className="sound-view-label-title"
          key="sound-view-label-title"
        >
          {title || name}
        </h6>
  
        {artistName ?
          <p
            className="sound-view-label-artist-name"
            key="sound-view-label-artist-name"
          >
            <strong
              className="sound-view-label-artist-name-text"
              key="sound-view-label-artist-name-text"
            >
              {artistName}
            </strong>
          </p> :
  
          null}
  
        {contributors.length ?
          <ul
            className="sound-view-label-contributors-list"
            key="sound-view-label-contributors-list"
          >
            {contributors.map((item) => (
              <li
                className="sound-view-label-contributors-list-item"
                key={item}
              >
                <p
                  className="sound-view-label-contributor"
                  key="sound-view-label-contributor"
                >
                  <em
                    className="sound-view-label-contributor-text"
                    key="sound-view-label-contributor-text"
                  >
                    {item}
                  </em>
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
