import {
 ComponentType,
} from 'react';
import {
  ISoundLabel,
} from '../../Node/ISoundLabel';

export interface ISoundViewLabelProps {
  readonly label: ISoundLabel;
  readonly name: string;
  readonly className?: string;
}
