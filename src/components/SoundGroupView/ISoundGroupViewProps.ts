import {
  IGroup,
} from '../../Group/IGroup';
import {
 ComponentType,
} from 'react';

export interface ISoundGroupViewProps {
  readonly group: IGroup;
  readonly className?: string;
  readonly components?: Record<string, ComponentType>;
}
