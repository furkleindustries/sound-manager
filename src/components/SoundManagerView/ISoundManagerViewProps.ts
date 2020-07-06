import {
  IManager,
} from '../../Manager/IManager';
import {
  ComponentType,
} from 'react';

export interface ISoundManagerViewProps {
  readonly manager: IManager;
  readonly className?: string;
  readonly components?: Record<string, ComponentType>;
}
