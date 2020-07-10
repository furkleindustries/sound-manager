import {
  ISoundGroupViewTitleOwnProps,
} from './ISoundGroupViewTitleOwnProps';

import * as React from 'react';

export const SoundGroupViewTitle: React.FC<ISoundGroupViewTitleOwnProps> = ({
  groupName,
  label: { title },
}) => (
  <h3>
    {title || groupName}
  </h3>
);
