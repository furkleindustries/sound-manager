import {
 ComponentType,
} from 'react';
import {
  ISound,
} from '../../Sound/ISound';

export interface ISoundControllerViewProps {
  readonly sound: ISound;
  readonly className?: string;
}
