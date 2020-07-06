import {
  ISound,
} from '../../Sound/ISound';
import {
 ComponentType,
} from 'react';

export interface ISoundViewProps {
  readonly name: string;
  readonly sound: ISound;
  readonly className?: string;
  readonly components?: Record<string, ComponentType>;
}
