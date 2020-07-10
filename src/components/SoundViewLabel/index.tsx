import classNames from 'classnames';
import {
  ISoundViewLabelProps,
} from './ISoundViewLabelProps';

import * as React from 'react';

export const SoundViewLabel: React.FunctionComponent<ISoundViewLabelProps> = ({
  className,
  label: {
    artistName,
    contributors,
    license,
  },
}) => (
  <div
    className={classNames(
      'sound-view-label',
      className,
    )}
  >
    {artistName ?
      <>
        <h5 className="sound-view-label-artist-header">
          Artisan
        </h5>

        <p className="sound-view-label-artist-name">
          <strong className="sound-view-label-artist-name-text">
            {artistName}
          </strong>
        </p>
      </> :
      null}

    {contributors.length ?
      <>
        <h6 className="sound-view-label-contributors-heading">
          Contributors
        </h6>

        <ul className="sound-view-label-contributors-list">
          {contributors.map((item) => (
            <li
              className="sound-view-label-contributors-list-item"
              key={item}
            >
              <em className="sound-view-label-contributor-text">
                {item}
              </em>
            </li>
          ))}
        </ul>
      </> :
      null}

    {license ?
      <>
        <h6 className="sound-view-label-license-heading">
          License
        </h6>

        <p className="sound-view-label-license">
          {license}
        </p>
      </> :
      null}
  </div>
);
